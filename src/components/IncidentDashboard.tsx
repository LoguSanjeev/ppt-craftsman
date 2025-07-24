import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  AlertTriangle, 
  Clock, 
  TrendingUp, 
  Users, 
  Filter,
  RefreshCw,
  Search,
  BarChart3,
  AlertCircle,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from 'recharts';

// Types
interface Ticket {
  id: string;
  title: string;
  priority: 'P1' | 'P2' | 'P3' | 'P4';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Escalated';
  assignee: string;
  createdAt: Date;
  resolvedAt?: Date;
  slaTarget: number; // hours
  escalated: boolean;
  category: string;
}

interface SLAMetrics {
  priority: string;
  target: number;
  average: number;
  breached: number;
  total: number;
}

// Mock data generation
const generateMockTickets = (): Ticket[] => {
  const priorities: Ticket['priority'][] = ['P1', 'P2', 'P3', 'P4'];
  const statuses: Ticket['status'][] = ['Open', 'In Progress', 'Resolved', 'Escalated'];
  const assignees = ['Alice Johnson', 'Bob Smith', 'Carol Davis', 'David Wilson', 'Emma Brown'];
  const categories = ['Network', 'Security', 'Hardware', 'Software', 'Database'];
  
  return Array.from({ length: 50 }, (_, i) => {
    const priority = priorities[Math.floor(Math.random() * priorities.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const createdAt = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000);
    const slaTargets = { P1: 2, P2: 8, P3: 24, P4: 72 };
    
    return {
      id: `INCIDENT-${(i + 1).toString().padStart(4, '0')}`,
      title: `System ${categories[Math.floor(Math.random() * categories.length)]} Issue #${i + 1}`,
      priority,
      status,
      assignee: assignees[Math.floor(Math.random() * assignees.length)],
      createdAt,
      resolvedAt: status === 'Resolved' ? new Date(createdAt.getTime() + Math.random() * slaTargets[priority] * 60 * 60 * 1000) : undefined,
      slaTarget: slaTargets[priority],
      escalated: Math.random() > 0.8,
      category: categories[Math.floor(Math.random() * categories.length)]
    };
  });
};

const IncidentDashboard = () => {
  const [tickets, setTickets] = useState<Ticket[]>(generateMockTickets());
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>(tickets);
  const [filters, setFilters] = useState({
    priority: 'all',
    status: 'all',
    assignee: 'all',
    timePeriod: '7d'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Auto-refresh simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setTickets(prev => {
        const updated = [...prev];
        // Randomly update some tickets
        for (let i = 0; i < 3; i++) {
          const randomIndex = Math.floor(Math.random() * updated.length);
          if (updated[randomIndex].status !== 'Resolved') {
            const statuses: Ticket['status'][] = ['Open', 'In Progress', 'Resolved', 'Escalated'];
            updated[randomIndex].status = statuses[Math.floor(Math.random() * statuses.length)];
          }
        }
        return updated;
      });
      setLastUpdated(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = tickets;

    if (filters.priority !== 'all') {
      filtered = filtered.filter(ticket => ticket.priority === filters.priority);
    }
    if (filters.status !== 'all') {
      filtered = filtered.filter(ticket => ticket.status === filters.status);
    }
    if (filters.assignee !== 'all') {
      filtered = filtered.filter(ticket => ticket.assignee === filters.assignee);
    }
    if (searchTerm) {
      filtered = filtered.filter(ticket => 
        ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Time period filter
    const now = new Date();
    const cutoff = new Date();
    switch (filters.timePeriod) {
      case '1d':
        cutoff.setDate(now.getDate() - 1);
        break;
      case '7d':
        cutoff.setDate(now.getDate() - 7);
        break;
      case '30d':
        cutoff.setDate(now.getDate() - 30);
        break;
    }
    filtered = filtered.filter(ticket => ticket.createdAt >= cutoff);

    setFilteredTickets(filtered);
  }, [tickets, filters, searchTerm]);

  // Calculate metrics
  const metrics = {
    total: filteredTickets.length,
    open: filteredTickets.filter(t => t.status === 'Open').length,
    inProgress: filteredTickets.filter(t => t.status === 'In Progress').length,
    resolved: filteredTickets.filter(t => t.status === 'Resolved').length,
    escalated: filteredTickets.filter(t => t.escalated).length,
    slaBreached: filteredTickets.filter(t => {
      if (!t.resolvedAt) return false;
      const resolutionTime = (t.resolvedAt.getTime() - t.createdAt.getTime()) / (1000 * 60 * 60);
      return resolutionTime > t.slaTarget;
    }).length
  };

  // Priority distribution data
  const priorityData = ['P1', 'P2', 'P3', 'P4'].map(priority => ({
    priority,
    count: filteredTickets.filter(t => t.priority === priority).length,
    resolved: filteredTickets.filter(t => t.priority === priority && t.status === 'Resolved').length
  }));

  // SLA metrics data
  const slaData: SLAMetrics[] = ['P1', 'P2', 'P3', 'P4'].map(priority => {
    const priorityTickets = filteredTickets.filter(t => t.priority === priority && t.resolvedAt);
    const target = { P1: 2, P2: 8, P3: 24, P4: 72 }[priority];
    const breached = priorityTickets.filter(t => {
      const resolutionTime = (t.resolvedAt!.getTime() - t.createdAt.getTime()) / (1000 * 60 * 60);
      return resolutionTime > target;
    }).length;
    
    return {
      priority,
      target,
      average: priorityTickets.length > 0 ? 
        priorityTickets.reduce((sum, t) => {
          const resolutionTime = (t.resolvedAt!.getTime() - t.createdAt.getTime()) / (1000 * 60 * 60);
          return sum + resolutionTime;
        }, 0) / priorityTickets.length : 0,
      breached,
      total: priorityTickets.length
    };
  });

  // Escalation trend data
  const escalationTrendData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dayTickets = tickets.filter(t => 
      t.createdAt.toDateString() === date.toDateString()
    );
    return {
      date: date.toLocaleDateString('en-US', { weekday: 'short' }),
      escalations: dayTickets.filter(t => t.escalated).length,
      total: dayTickets.length
    };
  }).reverse();

  const getPriorityColor = (priority: string) => {
    const colors = {
      P1: 'hsl(var(--destructive))',
      P2: 'hsl(var(--orange))',
      P3: 'hsl(var(--yellow))',
      P4: 'hsl(var(--success))'
    };
    return colors[priority as keyof typeof colors] || colors.P4;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Open': return <AlertCircle className="w-4 h-4 text-destructive" />;
      case 'In Progress': return <Clock className="w-4 h-4 text-yellow" />;
      case 'Resolved': return <CheckCircle2 className="w-4 h-4 text-success" />;
      case 'Escalated': return <XCircle className="w-4 h-4 text-orange" />;
      default: return null;
    }
  };

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Incident Management Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setLastUpdated(new Date())}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </header>

      <div className="flex-1 p-6 overflow-y-auto">
        {/* Filters */}
        <Card className="mb-6">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              <CardTitle>Filters</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search tickets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filters.priority} onValueChange={(value) => setFilters(prev => ({ ...prev, priority: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="P1">P1 - Critical</SelectItem>
                  <SelectItem value="P2">P2 - High</SelectItem>
                  <SelectItem value="P3">P3 - Medium</SelectItem>
                  <SelectItem value="P4">P4 - Low</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                  <SelectItem value="Escalated">Escalated</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.assignee} onValueChange={(value) => setFilters(prev => ({ ...prev, assignee: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Assignees</SelectItem>
                  {Array.from(new Set(tickets.map(t => t.assignee))).map(assignee => (
                    <SelectItem key={assignee} value={assignee}>{assignee}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.timePeriod} onValueChange={(value) => setFilters(prev => ({ ...prev, timePeriod: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Time Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1d">Last 24 hours</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
          <Card className="bg-gradient-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-foreground">{metrics.total}</div>
              <p className="text-sm text-muted-foreground">Total Tickets</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-destructive">{metrics.open}</div>
              <p className="text-sm text-muted-foreground">Open</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow">{metrics.inProgress}</div>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success">{metrics.resolved}</div>
              <p className="text-sm text-muted-foreground">Resolved</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange">{metrics.escalated}</div>
              <p className="text-sm text-muted-foreground">Escalated</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-destructive">{metrics.slaBreached}</div>
              <p className="text-sm text-muted-foreground">SLA Breached</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Tables */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sla">SLA Monitoring</TabsTrigger>
            <TabsTrigger value="escalations">Escalation Patterns</TabsTrigger>
            <TabsTrigger value="tickets">Ticket Details</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Priority Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={priorityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="priority" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }} 
                      />
                      <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="resolved" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Weekly Escalation Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={escalationTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="escalations" 
                        stroke="hsl(var(--destructive))" 
                        strokeWidth={3}
                        dot={{ fill: 'hsl(var(--destructive))' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sla" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  SLA Performance by Priority
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {slaData.map((sla) => (
                    <div key={sla.priority} className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="outline" 
                            style={{ color: getPriorityColor(sla.priority) }}
                          >
                            {sla.priority}
                          </Badge>
                          <span className="font-medium">Target: {sla.target}h</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {sla.total} tickets resolved
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-foreground font-medium">
                            {sla.average.toFixed(1)}h
                          </div>
                          <div className="text-muted-foreground">Average Resolution</div>
                        </div>
                        <div>
                          <div className={`font-medium ${sla.breached > 0 ? 'text-destructive' : 'text-success'}`}>
                            {sla.breached}
                          </div>
                          <div className="text-muted-foreground">SLA Breaches</div>
                        </div>
                        <div>
                          <div className={`font-medium ${sla.total > 0 && sla.breached / sla.total < 0.1 ? 'text-success' : 'text-destructive'}`}>
                            {sla.total > 0 ? ((1 - sla.breached / sla.total) * 100).toFixed(1) : 0}%
                          </div>
                          <div className="text-muted-foreground">SLA Compliance</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="escalations" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Escalation Reasons</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { reason: 'SLA Breach', count: 12, percentage: 35 },
                      { reason: 'Customer Request', count: 8, percentage: 24 },
                      { reason: 'Complexity', count: 7, percentage: 21 },
                      { reason: 'Resource Unavailable', count: 4, percentage: 12 },
                      { reason: 'Other', count: 3, percentage: 8 }
                    ].map((item) => (
                      <div key={item.reason} className="flex items-center justify-between">
                        <span className="text-sm">{item.reason}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-8">{item.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Escalation by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Network', value: 30, fill: 'hsl(var(--primary))' },
                          { name: 'Security', value: 25, fill: 'hsl(var(--destructive))' },
                          { name: 'Hardware', value: 20, fill: 'hsl(var(--orange))' },
                          { name: 'Software', value: 15, fill: 'hsl(var(--yellow))' },
                          { name: 'Database', value: 10, fill: 'hsl(var(--success))' }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        dataKey="value"
                      >
                        {[
                          { name: 'Network', value: 30, fill: 'hsl(var(--primary))' },
                          { name: 'Security', value: 25, fill: 'hsl(var(--destructive))' },
                          { name: 'Hardware', value: 20, fill: 'hsl(var(--orange))' },
                          { name: 'Software', value: 15, fill: 'hsl(var(--yellow))' },
                          { name: 'Database', value: 10, fill: 'hsl(var(--success))' }
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tickets" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Incident Tickets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Assignee</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>SLA Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTickets.slice(0, 10).map((ticket) => {
                        const hoursSinceCreated = (Date.now() - ticket.createdAt.getTime()) / (1000 * 60 * 60);
                        const slaBreached = hoursSinceCreated > ticket.slaTarget && ticket.status !== 'Resolved';
                        
                        return (
                          <TableRow key={ticket.id}>
                            <TableCell className="font-mono text-sm">{ticket.id}</TableCell>
                            <TableCell className="max-w-xs truncate">{ticket.title}</TableCell>
                            <TableCell>
                              <Badge 
                                variant="outline"
                                style={{ color: getPriorityColor(ticket.priority) }}
                              >
                                {ticket.priority}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {getStatusIcon(ticket.status)}
                                <span className="text-sm">{ticket.status}</span>
                                {ticket.escalated && (
                                  <Badge variant="destructive" className="text-xs">ESC</Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-sm">{ticket.assignee}</TableCell>
                            <TableCell className="text-sm">
                              {ticket.createdAt.toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant={slaBreached ? "destructive" : "secondary"}
                                className={`text-xs ${!slaBreached ? 'bg-success text-success-foreground' : ''}`}
                              >
                                {slaBreached ? 'Breached' : 'On Time'}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default IncidentDashboard;
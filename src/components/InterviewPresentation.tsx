import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronLeft, 
  ChevronRight, 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Shield, 
  Zap, 
  Target,
  Users,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Download,
  Mail,
  Calendar,
  Share2,
  FileText,
  Bell,
  Monitor,
  Presentation
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Tooltip } from 'recharts';

const InterviewPresentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const mockData = {
    priorityData: [
      { priority: 'P1', count: 8, resolved: 6 },
      { priority: 'P2', count: 15, resolved: 12 },
      { priority: 'P3', count: 22, resolved: 18 },
      { priority: 'P4', count: 12, resolved: 11 }
    ],
    escalationData: [
      { date: 'Mon', escalations: 3 },
      { date: 'Tue', escalations: 5 },
      { date: 'Wed', escalations: 2 },
      { date: 'Thu', escalations: 7 },
      { date: 'Fri', escalations: 4 },
      { date: 'Sat', escalations: 1 },
      { date: 'Sun', escalations: 2 }
    ],
    categoryData: [
      { name: 'Network', value: 30, fill: 'hsl(var(--primary))' },
      { name: 'Security', value: 25, fill: 'hsl(var(--destructive))' },
      { name: 'Hardware', value: 20, fill: 'hsl(var(--orange))' },
      { name: 'Software', value: 15, fill: 'hsl(var(--yellow))' },
      { name: 'Database', value: 10, fill: 'hsl(var(--success))' }
    ]
  };

  const slides = [
    {
      title: "Professional Portfolio",
      subtitle: "Incident Management Dashboard & Automation",
      content: (
        <div className="text-center space-y-8">
          <div className="mx-auto w-32 h-32 bg-gradient-primary rounded-full flex items-center justify-center">
            <Presentation className="w-16 h-16 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Interactive Data Visualization</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Demonstrating expertise in creating beautiful, functional dashboards with real-time automation.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 mx-auto mb-2 text-primary" />
              <p className="font-medium">Interactive Charts</p>
            </div>
            <div className="text-center">
              <Zap className="w-12 h-12 mx-auto mb-2 text-yellow" />
              <p className="font-medium">Automation</p>
            </div>
            <div className="text-center">
              <Monitor className="w-12 h-12 mx-auto mb-2 text-success" />
              <p className="font-medium">Real-time Data</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Project Overview",
      subtitle: "Incident Management Dashboard",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Project Objectives
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                  <div>
                    <p className="font-medium">Real-time Monitoring</p>
                    <p className="text-sm text-muted-foreground">Live incident tracking with auto-refresh</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                  <div>
                    <p className="font-medium">SLA Compliance</p>
                    <p className="text-sm text-muted-foreground">Automated breach detection and alerts</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                  <div>
                    <p className="font-medium">Interactive Filtering</p>
                    <p className="text-sm text-muted-foreground">Dynamic data exploration capabilities</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Key Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Badge variant="outline">Dashboard</Badge>
                  <span className="text-sm">Multi-chart visualization system</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">Automation</Badge>
                  <span className="text-sm">Export, alerts, and scheduling</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">Reports</Badge>
                  <span className="text-sm">PDF/Excel generation</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">Analytics</Badge>
                  <span className="text-sm">Trend analysis and forecasting</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Technology Stack</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="font-medium">Frontend</div>
                  <div className="text-sm text-muted-foreground">React + TypeScript</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="font-medium">Visualization</div>
                  <div className="text-sm text-muted-foreground">Recharts Library</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="font-medium">Styling</div>
                  <div className="text-sm text-muted-foreground">Tailwind CSS</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="font-medium">Components</div>
                  <div className="text-sm text-muted-foreground">shadcn/ui</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      title: "Data Visualization Excellence",
      subtitle: "Interactive Charts & Analytics",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Priority Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={mockData.priorityData}>
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
                  Escalation Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={mockData.escalationData}>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">94.2%</div>
                <p className="text-sm text-muted-foreground">SLA Compliance Rate</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-success mb-2">2.3h</div>
                <p className="text-sm text-muted-foreground">Average Resolution Time</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-destructive mb-2">8</div>
                <p className="text-sm text-muted-foreground">Active Escalations</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    {
      title: "Automation & Efficiency",
      subtitle: "Streamlined Workflows",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Automated Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gradient-card rounded-lg">
                  <FileText className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-medium">PDF Report Generation</p>
                    <p className="text-sm text-muted-foreground">One-click export with custom formatting</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gradient-card rounded-lg">
                  <Download className="w-6 h-6 text-success" />
                  <div>
                    <p className="font-medium">Excel Data Export</p>
                    <p className="text-sm text-muted-foreground">Structured data for further analysis</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gradient-card rounded-lg">
                  <Mail className="w-6 h-6 text-orange" />
                  <div>
                    <p className="font-medium">Email Alerts</p>
                    <p className="text-sm text-muted-foreground">Real-time notifications for SLA breaches</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gradient-card rounded-lg">
                  <Calendar className="w-6 h-6 text-purple" />
                  <div>
                    <p className="font-medium">Scheduled Reports</p>
                    <p className="text-sm text-muted-foreground">Daily/weekly automated delivery</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5" />
                  Real-time Updates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="text-sm">Data Refresh Rate</span>
                    <Badge variant="outline">30 seconds</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="text-sm">SLA Monitoring</span>
                    <Badge variant="outline" className="bg-success text-success-foreground">Active</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="text-sm">Alert Notifications</span>
                    <Badge variant="outline" className="bg-success text-success-foreground">Enabled</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="text-sm">Auto-escalation</span>
                    <Badge variant="outline" className="bg-success text-success-foreground">Running</Badge>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Performance Impact</h4>
                  <p className="text-sm text-muted-foreground">
                    Automation reduced manual reporting time by <span className="font-bold text-primary">85%</span> and 
                    improved incident response time by <span className="font-bold text-primary">60%</span>.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Workflow Automation Pipeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between space-x-4 overflow-x-auto">
                <div className="flex flex-col items-center text-center min-w-32">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-2">
                    <Monitor className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm font-medium">Data Collection</p>
                  <p className="text-xs text-muted-foreground">Real-time ingestion</p>
                </div>
                <div className="flex-1 h-px bg-border"></div>
                <div className="flex flex-col items-center text-center min-w-32">
                  <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center mb-2">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm font-medium">Processing</p>
                  <p className="text-xs text-muted-foreground">Analytics & KPIs</p>
                </div>
                <div className="flex-1 h-px bg-border"></div>
                <div className="flex flex-col items-center text-center min-w-32">
                  <div className="w-12 h-12 bg-orange rounded-full flex items-center justify-center mb-2">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm font-medium">Alert Generation</p>
                  <p className="text-xs text-muted-foreground">Smart notifications</p>
                </div>
                <div className="flex-1 h-px bg-border"></div>
                <div className="flex flex-col items-center text-center min-w-32">
                  <div className="w-12 h-12 bg-purple rounded-full flex items-center justify-center mb-2">
                    <Share2 className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm font-medium">Distribution</p>
                  <p className="text-xs text-muted-foreground">Auto-delivery</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      title: "Business Impact & Value",
      subtitle: "Measurable Results",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Operational Improvements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Incident Resolution Speed</span>
                    <span className="text-lg font-bold text-success">+60%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-success h-2 rounded-full w-3/5"></div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">SLA Compliance Rate</span>
                    <span className="text-lg font-bold text-primary">94.2%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full w-[94%]"></div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Reporting Efficiency</span>
                    <span className="text-lg font-bold text-orange">+85%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-orange h-2 rounded-full w-5/6"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Quality Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-primary mb-1">99.7%</div>
                    <p className="text-sm text-muted-foreground">System Uptime</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-success mb-1">2.1 min</div>
                    <p className="text-sm text-muted-foreground">Avg. Response Time</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-orange mb-1">15+</div>
                    <p className="text-sm text-muted-foreground">Stakeholders Served</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>ROI Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-destructive mb-2">-75%</div>
                  <p className="text-sm text-muted-foreground">Manual Effort Reduction</p>
                  <p className="text-xs text-muted-foreground mt-1">From 8 hours to 2 hours daily</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-success mb-2">+200%</div>
                  <p className="text-sm text-muted-foreground">Data Accessibility</p>
                  <p className="text-xs text-muted-foreground mt-1">Real-time vs daily reports</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">$50K+</div>
                  <p className="text-sm text-muted-foreground">Annual Cost Savings</p>
                  <p className="text-xs text-muted-foreground mt-1">Estimated operational efficiency</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      title: "Why This Matters",
      subtitle: "Skills & Capabilities Demonstration",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Presentation className="w-5 h-5" />
                  Attractive Presentations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                  <div>
                    <p className="font-medium">Visual Design Excellence</p>
                    <p className="text-sm text-muted-foreground">Clean, modern UI with professional color schemes</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                  <div>
                    <p className="font-medium">Interactive Elements</p>
                    <p className="text-sm text-muted-foreground">Engaging charts with hover effects and animations</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                  <div>
                    <p className="font-medium">Responsive Design</p>
                    <p className="text-sm text-muted-foreground">Optimized for all screen sizes and devices</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange">
                  <BarChart3 className="w-5 h-5" />
                  Reports & Dashboards
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                  <div>
                    <p className="font-medium">Multi-format Export</p>
                    <p className="text-sm text-muted-foreground">PDF reports and Excel data exports</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                  <div>
                    <p className="font-medium">Dynamic Filtering</p>
                    <p className="text-sm text-muted-foreground">Interactive data exploration capabilities</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                  <div>
                    <p className="font-medium">Real-time Updates</p>
                    <p className="text-sm text-muted-foreground">Live data refresh and instant insights</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-success">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-success">
                <Zap className="w-5 h-5" />
                Automation Excellence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium">Implemented Features:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-success/10">Scheduled Reporting</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-success/10">Email Alerts</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-success/10">Auto-export Functions</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-success/10">SLA Monitoring</Badge>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium">Business Impact:</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• 85% reduction in manual reporting effort</p>
                    <p>• 60% faster incident response times</p>
                    <p>• 24/7 automated monitoring capabilities</p>
                    <p>• Proactive SLA breach prevention</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      )
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Interview Presentation
            </h1>
            <p className="text-sm text-muted-foreground">
              Slide {currentSlide + 1} of {slides.length}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => window.location.href = '/incidents'}>
              <Monitor className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <Button variant="outline" size="sm" onClick={prevSlide} disabled={currentSlide === 0}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={nextSlide} disabled={currentSlide === slides.length - 1}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Slide Progress */}
      <div className="bg-card border-b border-border p-2">
        <div className="flex items-center gap-1">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 flex-1 rounded-full transition-colors ${
                index === currentSlide ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Slide Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">{slides[currentSlide].title}</h1>
            <p className="text-xl text-muted-foreground">{slides[currentSlide].subtitle}</p>
          </div>
          
          <div className="animate-in slide-in-from-right-5 duration-300">
            {slides[currentSlide].content}
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <footer className="bg-card border-t border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {slides.map((slide, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`text-xs px-3 py-1 rounded-full transition-colors ${
                  index === currentSlide 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {slide.title}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={prevSlide} disabled={currentSlide === 0}>
              Previous
            </Button>
            <Button variant="outline" size="sm" onClick={nextSlide} disabled={currentSlide === slides.length - 1}>
              Next
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InterviewPresentation;
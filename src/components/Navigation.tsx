import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Presentation, AlertTriangle } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-card/80 backdrop-blur-sm border border-border rounded-full px-4 py-2 shadow-elegant">
        <div className="flex items-center gap-2">
          <Button
            variant={isActive('/') ? "default" : "ghost"}
            size="sm"
            asChild
            className="rounded-full"
          >
            <Link to="/" className="flex items-center gap-2">
              <Presentation className="w-4 h-4" />
              <span className="hidden sm:inline">PPT Editor</span>
            </Link>
          </Button>
          
          <Button
            variant={isActive('/incidents') ? "default" : "ghost"}
            size="sm"
            asChild
            className="rounded-full"
          >
            <Link to="/incidents" className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span className="hidden sm:inline">Incidents</span>
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
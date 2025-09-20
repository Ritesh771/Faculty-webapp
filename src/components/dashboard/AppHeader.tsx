
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';

export const AppHeader: React.FC = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const handleProfileClick = () => {
    navigate('/dashboard/profile');
  };

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 bg-transparent border-b shadow-sm backdrop-blur-sm"
      style={{ 
        paddingTop: 'var(--safe-top)',
        height: 'calc(4rem + var(--safe-top))' // Base height + safe area
      }}
    >
      <div className={`flex ${isMobile ? 'h-14' : 'h-16'} items-center px-3 sm:px-4 lg:px-6`}>
        {/* Mobile menu trigger - Hamburger */}
        <SidebarTrigger className={`${isMobile ? 'h-7 w-7' : 'h-8 w-8 sm:h-9 sm:w-9'} mr-2 hover:bg-gray-100 rounded-md p-1`} />

        {/* Brand */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex flex-col">
            <span className={`font-semibold ${isMobile ? 'text-sm' : 'text-sm lg:text-base'}`}>NeuroCampus</span>
            {!isMobile && <span className="text-xs text-gray-500 hidden md:block">AMC College</span>}
          </div>
        </div>

        {/* Live Clock & Actions */}
        <div className="ml-auto flex items-center gap-2 sm:gap-4">
          {/* Live Clock - Hide on very small screens */}
          {!isMobile && (
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-md border">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-mono font-medium text-gray-700 min-w-[72px]">
                {formatTime(currentTime)}
              </span>
            </div>
          )}

          {/* Profile Icon */}
          <Button 
            variant="ghost" 
            size="icon" 
            className={`${isMobile ? 'h-7 w-7' : 'h-8 w-8 sm:h-9 sm:w-9'} hover:bg-gray-100`}
            onClick={handleProfileClick}
          >
            <User className={`${isMobile ? 'h-4 w-4' : 'h-4 w-4 sm:h-5 sm:w-5'}`} />
            <span className="sr-only">Profile</span>
          </Button>

          {/* User info - hidden on small screens */}
          {!isMobile && (
            <span className="hidden lg:block text-sm font-medium truncate max-w-[120px]">
              {user?.name || 'User'}
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

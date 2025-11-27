
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, Users, GraduationCap, BookOpen, Settings, 
  UserPlus, Upload, Building2, Bell, FileText, UserCheck,
  Calendar, BarChart3, MessageSquare, TrendingUp, ClipboardList,
  AlertCircle, Award, Camera, CalendarDays,
  FileCheck, UserCircle, Megaphone, 
  CalendarCheck, PercentIcon, BookMarked,
  FileInput, CheckSquare, UserCog, ScanFace,
  MapPin, Target, BookOpenCheck, LogOut
} from 'lucide-react';
import { 
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar
} from "@/components/ui/sidebar";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<any>;
  roles: string[];
}

const navigationItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['faculty'] },
  { label: 'Take Attendance', href: '/dashboard/take-attendance', icon: UserCheck, roles: ['faculty'] },
  
  { label: 'Apply Leave', href: '/dashboard/apply-leave', icon: FileInput, roles: ['faculty'] },
  { label: 'Attendance Records', href: '/dashboard/attendance-records', icon: BarChart3, roles: ['faculty'] },
  
  { label: 'Announcements', href: '/dashboard/announcements', icon: Megaphone, roles: ['faculty'] },
  { label: 'Proctor Students', href: '/dashboard/proctor-students', icon: Users, roles: ['faculty'] },
  { label: 'Manage Student Leave', href: '/dashboard/manage-student-leave', icon: FileCheck, roles: ['faculty'] },
  { label: 'Student Info Scanner', href: '/dashboard/student-info-scanner', icon: ScanFace, roles: ['faculty'] },
  { label: 'Timetable', href: '/dashboard/timetable', icon: Calendar, roles: ['faculty'] },
  { label: 'Profile', href: '/dashboard/profile', icon: UserCircle, roles: ['faculty'] },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings, roles: ['faculty'] },
];

export const SideNav: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const { setOpenMobile } = useSidebar();

  if (!user) return null;

  const userNavItems = navigationItems;

  const handleLinkClick = () => {
    // Close mobile sidebar when a link is clicked
    setOpenMobile(false);
  };

  const handleLogout = () => {
    logout();
    setOpenMobile(false);
  };

  return (
    <Sidebar className="border-r bg-white/80 backdrop-blur-sm">
      <SidebarHeader className="p-4 bg-white/60 backdrop-blur-sm border-b">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm text-gray-900">NeuroCampus</span>
            <span className="text-xs text-gray-600">AMC College</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 bg-white/60 backdrop-blur-sm">
        <SidebarMenu>
          {userNavItems.map((item, index) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild
                    isActive={isActive}
                    onClick={handleLinkClick}
                    className={cn(
                      "w-full justify-start gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                      isActive && "bg-primary text-primary-foreground hover:bg-primary/90"
                    )}
                  >
                    <Link to={item.href} className="flex items-center gap-3">
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </motion.div>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4 bg-white/60 backdrop-blur-sm border-t">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50">
            <UserCircle className="h-6 w-6 text-gray-600" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-600 capitalize">{user.role}</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="w-full justify-start gap-2 border-gray-200 text-gray-700 hover:bg-gray-50"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

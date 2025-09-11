
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { 
  Users, GraduationCap, BookOpen, TrendingUp, 
  AlertTriangle, CheckCircle, Clock, BarChart3,
  FileText, Calendar, UserCheck, Award,
  Target, BookOpenCheck, Bell
} from 'lucide-react';
import { AttendanceChart } from '@/components/charts/AttendanceChart';
import { PerformanceChart } from '@/components/charts/PerformanceChart';

export const HODDashboard: React.FC = () => {
  const currentUser = {
    name: 'Dr. Sarah Johnson',
    department: 'Computer Science & Engineering',
    employeeId: 'HOD001'
  };

  const statsData = [
    { title: 'Total Faculty', value: '24', change: '+2', icon: Users, color: 'bg-blue-500' },
    { title: 'Total Students', value: '480', change: '+15', icon: GraduationCap, color: 'bg-green-500' },
    { title: 'Active Courses', value: '18', change: '0', icon: BookOpen, color: 'bg-purple-500' },
    { title: 'Performance', value: '87%', change: '+5%', icon: TrendingUp, color: 'bg-orange-500' },
  ];

  const recentActivities = [
    { id: 1, title: 'New Faculty Assignment', description: 'Dr. Michael Chen assigned to Data Structures', time: '2 hours ago', type: 'assignment' },
    { id: 2, title: 'Low Attendance Alert', description: '15 students below 75% attendance', time: '4 hours ago', type: 'alert' },
    { id: 3, title: 'Performance Report', description: 'Semester performance analysis ready', time: '1 day ago', type: 'report' },
  ];

  const pendingTasks = [
    { id: 1, title: 'Review Faculty Leave Requests', count: 3, priority: 'high' },
    { id: 2, title: 'Approve Timetable Changes', count: 2, priority: 'medium' },
    { id: 3, title: 'Student Performance Review', count: 5, priority: 'low' },
  ];

  // Sample data for charts
  const attendanceData = [
    { name: 'Sem 1', present: 85, absent: 15 },
    { name: 'Sem 2', present: 88, absent: 12 },
    { name: 'Sem 3', present: 82, absent: 18 },
    { name: 'Sem 4', present: 90, absent: 10 },
    { name: 'Sem 5', present: 87, absent: 13 },
    { name: 'Sem 6', present: 89, absent: 11 },
  ];

  const performanceData = [
    { name: 'Sem 1', attendance: 85, marks: 78, average: 75 },
    { name: 'Sem 2', attendance: 88, marks: 82, average: 78 },
    { name: 'Sem 3', attendance: 82, marks: 76, average: 74 },
    { name: 'Sem 4', attendance: 90, marks: 85, average: 80 },
    { name: 'Sem 5', attendance: 87, marks: 83, average: 79 },
    { name: 'Sem 6', attendance: 89, marks: 86, average: 82 },
  ];

  return (
    <div className="w-full max-w-full overflow-hidden">
      <div className="space-y-4 sm:space-y-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4 sm:p-6 lg:p-8 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold truncate">Welcome back, {currentUser.name}</h1>
                <p className="text-blue-100 text-sm sm:text-base mt-1 truncate">{currentUser.department}</p>
                <p className="text-blue-200 text-xs sm:text-sm truncate">Employee ID: {currentUser.employeeId}</p>
              </div>
              <div className="flex-shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{stat.title}</p>
                        <p className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-xs sm:text-sm text-green-600 font-medium">
                          {stat.change !== '0' ? `${stat.change} from last month` : 'No change'}
                        </p>
                      </div>
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 ${stat.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Attendance Overview */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <AttendanceChart 
                title="Department Attendance Overview"
                description="Monthly attendance trends across all semesters"
                data={attendanceData}
              />
            </motion.div>

            {/* Performance Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <PerformanceChart 
                title="Academic Performance"
                description="Semester-wise performance analysis"
                data={performanceData}
              />
            </motion.div>
          </div>

          {/* Right Column - Activities and Tasks */}
          <div className="space-y-4 sm:space-y-6">
            {/* Pending Tasks */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                    Pending Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {pendingTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-2 sm:p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm font-medium truncate">{task.title}</p>
                        <Badge 
                          variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}
                          className="text-xs mt-1"
                        >
                          {task.priority}
                        </Badge>
                      </div>
                      <div className="text-lg sm:text-xl font-bold text-gray-600 flex-shrink-0 ml-2">
                        {task.count}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activities */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                    <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                    Recent Activities
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-2 sm:p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        activity.type === 'alert' ? 'bg-red-100' : 
                        activity.type === 'assignment' ? 'bg-blue-100' : 'bg-green-100'
                      }`}>
                        {activity.type === 'alert' ? 
                          <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" /> :
                          activity.type === 'assignment' ? 
                          <UserCheck className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" /> :
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                        }
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm font-medium truncate">{activity.title}</p>
                        <p className="text-xs text-gray-600 truncate">{activity.description}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Quick Actions</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Frequently used department management tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                {[
                  { icon: Users, label: 'Faculty', href: '/dashboard/faculty-assignments' },
                  { icon: GraduationCap, label: 'Students', href: '/dashboard/low-attendance' },
                  { icon: Calendar, label: 'Timetable', href: '/dashboard/timetable' },
                  { icon: FileText, label: 'Notices', href: '/dashboard/notices' },
                  { icon: BarChart3, label: 'Performance', href: '/dashboard/performance' },
                  { icon: Award, label: 'Proctors', href: '/dashboard/proctors' },
                ].map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={action.label}
                      variant="outline"
                      className="h-16 sm:h-20 flex-col gap-2 hover:bg-gray-50 transition-colors"
                      onClick={() => window.location.href = action.href}
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-xs truncate">{action.label}</span>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

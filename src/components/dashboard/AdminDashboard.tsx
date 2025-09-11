import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EnrollmentChart } from '../charts/EnrollmentChart';
import { PieChartCard } from '../charts/PieChartCard';
import { AttendanceChart } from '../charts/AttendanceChart';
import { motion } from 'framer-motion';
import { 
  Users, GraduationCap, Building2, BookOpen, 
  TrendingUp, Award, UserCheck, Settings,
  BarChart3, FileText
} from 'lucide-react';

// Mock data for charts
const enrollmentTrends = [
  { year: '2020', students: 2100, male: 1200, female: 900 },
  { year: '2021', students: 2250, male: 1280, female: 970 },
  { year: '2022', students: 2320, male: 1310, female: 1010 },
  { year: '2023', students: 2430, male: 1380, female: 1050 },
  { year: '2024', students: 2543, male: 1450, female: 1093 },
];

const departmentDistribution = [
  { name: 'Computer Science', value: 476 },
  { name: 'Electrical Eng.', value: 356 },
  { name: 'Mechanical Eng.', value: 412 },
  { name: 'Civil Eng.', value: 298 },
  { name: 'Information Tech.', value: 521 },
];

const attendanceData = [
  { name: 'CS', present: 92, absent: 8 },
  { name: 'EE', present: 88, absent: 12 },
  { name: 'ME', present: 85, absent: 15 },
  { name: 'CE', present: 90, absent: 10 },
  { name: 'IT', present: 91, absent: 9 },
];

export const AdminDashboard: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const statsData = [
    { 
      title: 'Total Students', 
      value: '2,543', 
      change: '+5.2%',
      trend: 'up',
      icon: Users,
      gradient: 'from-blue-500 to-blue-600',
      bg: 'from-blue-50 to-blue-100',
      iconBg: 'bg-blue-500/20',
      iconColor: 'text-blue-600'
    },
    { 
      title: 'Faculty Members', 
      value: '176', 
      change: '+3.1%',
      trend: 'up',
      icon: GraduationCap,
      gradient: 'from-emerald-500 to-emerald-600',
      bg: 'from-emerald-50 to-emerald-100',
      iconBg: 'bg-emerald-500/20',
      iconColor: 'text-emerald-600'
    },
    { 
      title: 'Departments', 
      value: '12', 
      change: '0%',
      trend: 'stable',
      icon: Building2,
      gradient: 'from-purple-500 to-purple-600',
      bg: 'from-purple-50 to-purple-100',
      iconBg: 'bg-purple-500/20',
      iconColor: 'text-purple-600'
    },
    { 
      title: 'Active Courses', 
      value: '324', 
      change: '+7.8%',
      trend: 'up',
      icon: BookOpen,
      gradient: 'from-amber-500 to-amber-600',
      bg: 'from-amber-50 to-amber-100',
      iconBg: 'bg-amber-500/20',
      iconColor: 'text-amber-600'
    }
  ];

  const quickActions = [
    { title: 'Enroll User', icon: UserCheck, href: '/dashboard/users', color: 'from-blue-500 to-blue-600' },
    { title: 'View Reports', icon: BarChart3, href: '/dashboard/attendance', color: 'from-green-500 to-green-600' },
    { title: 'Manage Departments', icon: Building2, href: '/dashboard/departments', color: 'from-purple-500 to-purple-600' },
    { title: 'Settings', icon: Settings, href: '/dashboard/settings', color: 'from-gray-500 to-gray-600' },
  ];

  return (
    <div className="w-full max-w-full overflow-hidden min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      <motion.div 
        className="space-y-6 sm:space-y-8 p-4 sm:p-6 lg:p-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div 
          className="flex flex-col gap-3"
          variants={itemVariants}
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-gradient-primary rounded-full" />
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Administrator Dashboard
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm sm:text-base text-muted-foreground">
            <span className="font-medium">Academic Year 2025-2026</span>
            <span className="hidden sm:inline mx-2 text-border">•</span>
            <span className="font-medium">Spring Semester</span>
            <span className="hidden sm:inline mx-2 text-border">•</span>
            <span className="text-primary font-semibold">Premium Access</span>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div 
          className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          variants={itemVariants}
        >
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <Card className={`premium-card hover:shadow-glow transition-all duration-500 bg-gradient-to-br ${stat.bg} border-0 overflow-hidden relative`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent" />
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
                    <CardTitle className="text-sm sm:text-base font-semibold text-foreground">
                      {stat.title}
                    </CardTitle>
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${stat.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.iconColor}`} />
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                      {stat.value}
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className={`w-4 h-4 mr-1 ${
                        stat.trend === 'up' ? 'text-success' : 
                        stat.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'
                      }`} />
                      <span className={`text-xs sm:text-sm font-medium ${
                        stat.trend === 'up' ? 'text-success' : 
                        stat.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'
                      }`}>
                        {stat.change} from last semester
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Charts Grid */}
        <motion.div 
          className="grid gap-6 lg:gap-8 grid-cols-1 lg:grid-cols-2" 
          variants={itemVariants}
        >
          <motion.div 
            className="w-full overflow-hidden"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <EnrollmentChart 
              title="Institution Enrollment Trends" 
              description="5-year enrollment analytics with growth insights"
              data={enrollmentTrends} 
            />
          </motion.div>
          
          <motion.div 
            className="w-full overflow-hidden"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <AttendanceChart
              title="Department Attendance Overview"
              description="Real-time attendance analytics by department"
              data={attendanceData}
            />
          </motion.div>
        </motion.div>

        <motion.div 
          className="grid gap-6 lg:gap-8 grid-cols-1 lg:grid-cols-2" 
          variants={itemVariants}
        >
          <motion.div 
            className="w-full overflow-hidden"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <PieChartCard
              title="Student Distribution by Department"
              description="Current semester enrollment breakdown with analytics"
              data={departmentDistribution}
            />
          </motion.div>

          <Card className="premium-card border-0 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-surface" />
            <CardHeader className="relative z-10">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg sm:text-xl font-bold">Quick Actions</CardTitle>
              </div>
              <CardDescription className="text-sm sm:text-base">
                Frequently used administrative tools for efficient management
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <motion.button 
                      key={index}
                      className={`flex flex-col items-center justify-center p-4 sm:p-6 rounded-xl bg-gradient-to-r ${action.color} text-white hover:shadow-xl transition-all duration-300 group relative overflow-hidden`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-3 relative z-10" />
                      <span className="text-sm sm:text-base font-semibold text-center relative z-10">
                        {action.title}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div variants={itemVariants}>
          <Card className="premium-card border-0 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-surface" />
            <CardHeader className="relative z-10">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg sm:text-xl font-bold">Performance Metrics</CardTitle>
              </div>
              <CardDescription className="text-sm sm:text-base">
                Key performance indicators for the current academic period
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                {[
                  { metric: 'Overall Performance', value: '87.5%', trend: '+2.3%', color: 'text-success' },
                  { metric: 'Student Satisfaction', value: '94.2%', trend: '+1.8%', color: 'text-success' },
                  { metric: 'Faculty Efficiency', value: '91.7%', trend: '+0.9%', color: 'text-success' }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="text-center p-4 rounded-lg bg-white/50 backdrop-blur-sm border border-border/20"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  >
                    <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                      {item.value}
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      {item.metric}
                    </div>
                    <div className={`text-xs font-medium ${item.color}`}>
                      {item.trend} vs last period
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};
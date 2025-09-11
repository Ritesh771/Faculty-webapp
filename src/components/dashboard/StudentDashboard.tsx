import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/context/AuthContext';
import { PerformanceChart } from '../charts/PerformanceChart';
import { SkillRadarChart } from '../charts/SkillRadarChart';
import { motion } from 'framer-motion';
import { 
  Calendar, Clock, BookOpen, Award, 
  TrendingUp, Bell, CheckCircle, AlertCircle,
  GraduationCap, BarChart3, Target, Star
} from 'lucide-react';

// Mock data for charts
const performanceData = [
  { name: 'Jan', attendance: 94, marks: 88, average: 82 },
  { name: 'Feb', attendance: 96, marks: 92, average: 84 },
  { name: 'Mar', attendance: 93, marks: 89, average: 83 },
  { name: 'Apr', attendance: 92, marks: 85, average: 80 },
  { name: 'May', attendance: 90, marks: 88, average: 82 },
];

const skillsData = [
  { subject: 'Algorithm', student: 85, average: 70, fullMark: 100 },
  { subject: 'Database', student: 90, average: 75, fullMark: 100 },
  { subject: 'Web Dev', student: 82, average: 78, fullMark: 100 },
  { subject: 'UI/UX', student: 75, average: 72, fullMark: 100 },
  { subject: 'Networks', student: 80, average: 68, fullMark: 100 },
  { subject: 'Testing', student: 88, average: 74, fullMark: 100 },
];

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();

  const statsData = [
    { 
      title: 'Attendance', 
      value: '92.3%', 
      change: 'Above minimum',
      trend: 'up',
      icon: CheckCircle,
      gradient: 'from-emerald-500 to-emerald-600',
      bg: 'from-emerald-50 to-emerald-100'
    },
    { 
      title: 'Current CGPA', 
      value: '9.0', 
      change: '+0.3 improvement',
      trend: 'up',
      icon: Award,
      gradient: 'from-blue-500 to-blue-600',
      bg: 'from-blue-50 to-blue-100'
    },
    { 
      title: 'Coding Rank', 
      value: '3rd', 
      change: 'Down from 2nd',
      trend: 'down',
      icon: Target,
      gradient: 'from-amber-500 to-amber-600',
      bg: 'from-amber-50 to-amber-100'
    },
    { 
      title: 'Upcoming Tests', 
      value: '3', 
      change: 'Next in 2 days',
      trend: 'alert',
      icon: AlertCircle,
      gradient: 'from-red-500 to-red-600',
      bg: 'from-red-50 to-red-100'
    }
  ];

  const todaysSchedule = [
    { time: '09:00 - 10:30', course: 'CS301: Operating Systems', location: 'Room 301', type: 'lecture', current: true },
    { time: '11:00 - 12:30', course: 'CS302: Computer Networks', location: 'Room 405', type: 'lecture', current: false },
    { time: '13:30 - 15:00', course: 'CS304: Artificial Intelligence Lab', location: 'Lab 204', type: 'lab', current: false },
    { time: '15:30 - 17:00', course: 'CS303: Web Development', location: 'Lab 202', type: 'lab', current: false },
  ];

  const assignments = [
    { course: 'CS301', title: 'Process Scheduling Implementation', dueDate: 'Today, 11:59 PM', progress: 80, urgent: true },
    { course: 'CS302', title: 'Network Protocols Analysis', dueDate: 'May 5, 11:59 PM', progress: 45, urgent: false },
    { course: 'CS304', title: 'Neural Network Implementation', dueDate: 'May 7, 11:59 PM', progress: 20, urgent: false },
    { course: 'CS303', title: 'Responsive Web Application Project', dueDate: 'May 10, 11:59 PM', progress: 0, urgent: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      <motion.div 
        className="space-y-6 sm:space-y-8 p-4 sm:p-6 lg:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <motion.div 
          className="flex flex-col gap-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-gradient-primary rounded-full" />
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Student Dashboard
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm sm:text-base text-muted-foreground">
            <span className="font-medium">Computer Science & Engineering</span>
            <span className="hidden sm:inline mx-2 text-border">•</span>
            <span className="font-medium">Spring Semester 2025</span>
            <span className="hidden sm:inline mx-2 text-border">•</span>
            <span className="text-primary font-semibold">Premium Student Access</span>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div 
          className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <Card className={`premium-card hover:shadow-glow transition-all duration-500 bg-gradient-to-br ${stat.bg} border-0 overflow-hidden relative`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent" />
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
                    <CardTitle className="text-sm sm:text-base font-semibold">
                      {stat.title}
                    </CardTitle>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                      {stat.value}
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className={`w-4 h-4 mr-1 ${
                        stat.trend === 'up' ? 'text-success' : 
                        stat.trend === 'down' ? 'text-warning' : 'text-destructive'
                      }`} />
                      <span className={`text-xs sm:text-sm font-medium ${
                        stat.trend === 'up' ? 'text-success' : 
                        stat.trend === 'down' ? 'text-warning' : 'text-destructive'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Performance Charts */}
        <motion.div 
          className="grid gap-6 lg:gap-8 grid-cols-1 lg:grid-cols-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.3 }}>
            <PerformanceChart 
              title="Academic Performance Analytics" 
              description="Monthly performance tracking with intelligent insights"
              data={performanceData}
            />
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.3 }}>
            <SkillRadarChart
              title="Skills Assessment Radar"
              description="Comprehensive skill evaluation across domains"
              data={skillsData}
            />
          </motion.div>
        </motion.div>

        {/* Today's Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="premium-card border-0 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-surface" />
            <CardHeader className="relative z-10">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg sm:text-xl font-bold">Today's Schedule</CardTitle>
              </div>
              <CardDescription className="text-sm sm:text-base">
                Your personalized academic schedule for today
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute top-0 bottom-0 left-7 border-l-2 border-border/30"></div>
                  <div className="space-y-6">
                    {todaysSchedule.map((schedule, i) => (
                      <motion.div 
                        key={i} 
                        className="flex group"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                        whileHover={{ x: 5 }}
                      >
                        <div className="flex flex-col items-center">
                          <div className="flex items-center justify-center w-14">
                            <span className="text-sm font-medium">{schedule.time.split(' - ')[0]}</span>
                          </div>
                          <div className="h-full">
                            <div className={`w-4 h-4 rounded-full mx-auto my-2 border-2 border-white shadow-lg ${
                              schedule.current ? 'bg-gradient-primary animate-pulse-glow' :
                              schedule.type === 'lecture' ? 'bg-gradient-to-r from-blue-400 to-blue-500' : 
                              'bg-gradient-to-r from-green-400 to-green-500'
                            }`}></div>
                          </div>
                        </div>
                        <div className="flex-1 ml-4">
                          <div className={`p-4 rounded-xl transition-all duration-300 ${
                            schedule.current ? 'bg-gradient-primary text-white shadow-glow' : 
                            'bg-white/50 backdrop-blur-sm border border-border/20 hover:shadow-lg'
                          }`}>
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                              <div>
                                <h3 className="font-semibold text-sm sm:text-base">{schedule.course}</h3>
                                <div className="flex items-center gap-4 mt-1">
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    <span className="text-xs">{schedule.time}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <BookOpen className="w-3 h-3" />
                                    <span className="text-xs">{schedule.location}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-2 sm:mt-0 flex items-center gap-2">
                                <Badge 
                                  variant={schedule.type === 'lecture' ? 'secondary' : 'outline'} 
                                  className="text-xs capitalize"
                                >
                                  {schedule.type}
                                </Badge>
                                {schedule.current && (
                                  <Badge className="text-xs bg-white/20 text-white">
                                    Current
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Assignments and Updates */}
        <motion.div 
          className="grid gap-6 lg:gap-8 grid-cols-1 lg:grid-cols-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card className="premium-card border-0 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-surface" />
            <CardHeader className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <CardTitle className="text-lg font-bold">Pending Assignments</CardTitle>
                </div>
                <Badge className="bg-destructive/10 text-destructive border-destructive/20">
                  {assignments.filter(a => a.urgent).length} Urgent
                </Badge>
              </div>
              <CardDescription>
                Track your assignment progress and deadlines
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="space-y-4">
                {assignments.map((assignment, i) => (
                  <motion.div 
                    key={i} 
                    className={`p-4 rounded-xl border transition-all duration-300 ${
                      assignment.urgent ? 'bg-red-50 border-red-200 shadow-accent-glow' : 'bg-white/50 border-border/20'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {assignment.course}
                          </Badge>
                          {assignment.urgent && (
                            <Badge className="text-xs bg-destructive text-destructive-foreground">
                              Urgent
                            </Badge>
                          )}
                        </div>
                        <h3 className="font-semibold text-sm mt-1">{assignment.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          Due: {assignment.dueDate}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        View
                      </Button>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-muted-foreground">Progress</span>
                        <span className="text-xs font-semibold">{assignment.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <motion.div 
                          className={`h-2 rounded-full ${
                            assignment.progress >= 80 ? 'bg-gradient-to-r from-green-400 to-green-500' :
                            assignment.progress >= 40 ? 'bg-gradient-to-r from-amber-400 to-amber-500' : 
                            'bg-gradient-to-r from-red-400 to-red-500'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${assignment.progress}%` }}
                          transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t border-border/20 pt-4 relative z-10">
              <Button className="w-full bg-gradient-primary text-white hover:opacity-90">
                View All Assignments
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="premium-card border-0 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-surface" />
            <CardHeader className="relative z-10">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg font-bold">Course Updates</CardTitle>
              </div>
              <CardDescription>
                Latest announcements and notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="space-y-4">
                {[
                  { course: 'CS302: Computer Networks', time: '2 hours ago', message: 'Assignment 4 has been posted, due May 10th.', type: 'assignment' },
                  { course: 'CS304: Artificial Intelligence', time: '5 hours ago', message: 'Class will be held online tomorrow due to faculty meeting.', type: 'update' },
                  { course: 'CS301: Operating Systems', time: 'Yesterday', message: 'Mid-term exam syllabus has been updated.', type: 'exam' },
                  { course: 'CS303: Web Development', time: '2 days ago', message: 'Project groups finalized and posted.', type: 'project' },
                ].map((update, i) => (
                  <motion.div 
                    key={i} 
                    className="flex items-start p-3 rounded-lg bg-white/50 border border-border/20 hover:shadow-md transition-all duration-300"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className={`rounded-full p-2 mr-3 ${
                      update.type === 'assignment' ? 'bg-blue-100 text-blue-600' :
                      update.type === 'exam' ? 'bg-red-100 text-red-600' :
                      update.type === 'project' ? 'bg-green-100 text-green-600' :
                      'bg-amber-100 text-amber-600'
                    }`}>
                      <Bell className="w-3 h-3" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-sm">{update.course}</h3>
                        <span className="text-xs text-muted-foreground">{update.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{update.message}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t border-border/20 pt-4 relative z-10">
              <Button variant="outline" className="w-full">
                View All Announcements
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};
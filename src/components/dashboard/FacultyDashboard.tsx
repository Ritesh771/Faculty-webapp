
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { AttendanceChart } from '../charts/AttendanceChart';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { getDashboardOverview, getProctorStudents, getFacultyNotifications } from '@/utils/faculty_api';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, Legend } from 'recharts';

interface AttendanceStatRaw {
  subject?: string;
  student__name?: string;
  percentage?: number;
}

interface TodayClassRaw {
  subject?: string;
  subject_name?: string;
  course?: string;
  start_time?: string;
  start?: string;
  time_start?: string;
  end_time?: string;
  end?: string;
  time_end?: string;
  room?: string;
  room_no?: string;
  location?: string;
  section?: string;
  section_name?: string;
  semester?: number | null;
  semester_id?: number | null;
}

interface DashboardOverviewRaw {
  total_students?: number;
  students_total?: number;
  student_count?: number;
  pending_tasks?: number;
  pending_grading?: number;
  pending?: number;
  new_notifications?: number;
  notifications_new?: number;
  notifications_count?: number;
  today_classes?: TodayClassRaw[];
  todays_classes?: TodayClassRaw[];
  classes?: TodayClassRaw[];
  stats?: AttendanceStatRaw[];
  attendance_stats?: AttendanceStatRaw[];
}

interface AttendanceChartPoint {
  name: string;
  present: number;
  absent: number;
}

const transformChartData = (stats: AttendanceStatRaw[] = []): AttendanceChartPoint[] =>
  stats.map(s => {
    const pct = typeof s.percentage === 'number' ? s.percentage : 0;
    return { name: s.subject || s.student__name || 'Course', present: pct, absent: Math.max(0, 100 - pct) };
  });

export const FacultyDashboard: React.FC = () => {
  const { user } = useAuth();
  const [overview, setOverview] = useState<DashboardOverviewRaw | null>(null);
  const [attendanceData, setAttendanceData] = useState<AttendanceChartPoint[]>([]);
  const navigate = useNavigate();
  const [proctorCount, setProctorCount] = useState<number | null>(null);
  const [notificationCount, setNotificationCount] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const res = await getDashboardOverview();
      if (res?.success) {
        const data: DashboardOverviewRaw = res.data || {};
        setOverview(data);
        setAttendanceData(transformChartData(data?.stats || data?.attendance_stats || []));
      }
      // Fetch live counts
      try {
        const [proctors, notifs] = await Promise.all([
          getProctorStudents(),
          getFacultyNotifications(),
        ]);
        if (proctors?.success && Array.isArray(proctors.data)) {
          setProctorCount(proctors.data.length);
        }
        if (notifs?.success && Array.isArray(notifs.data)) {
          setNotificationCount(notifs.data.length);
        }
      } catch (e) {
        // ignore background count errors
      }
    })();
  }, []);
  
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
        duration: 0.5
      }
    }
  };

  const normalizedOverview = {
    total_students: proctorCount ?? overview?.total_students ?? overview?.students_total ?? overview?.student_count ?? 0,
    pending_tasks: overview?.pending_tasks ?? overview?.pending_grading ?? overview?.pending ?? 0,
    new_notifications: notificationCount ?? overview?.new_notifications ?? overview?.notifications_new ?? overview?.notifications_count ?? 0,
    today_classes: (overview?.today_classes ?? overview?.todays_classes ?? overview?.classes ?? []).map((c: TodayClassRaw) => ({
      subject: c.subject ?? c.subject_name ?? c.course ?? 'Class',
      start_time: c.start_time ?? c.start ?? c.time_start ?? '',
      end_time: c.end_time ?? c.end ?? c.time_end ?? '',
      room: c.room ?? c.room_no ?? c.location ?? '',
      section: c.section ?? c.section_name ?? '',
      semester: c.semester ?? c.semester_id ?? null,
    })),
  } as const;

  return (
    <motion.div 
      className="space-y-4 sm:space-y-6 p-2 sm:p-4 lg:p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
        variants={itemVariants}
      >
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Faculty Dashboard</h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs sm:text-sm text-gray-500">
          
          <span className="hidden sm:inline mx-2 text-gray-300">|</span>
          <span>Spring Semester 2025</span>
        </div>
      </motion.div>

      

      {/* Quick Stats */}
      <motion.div 
        className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4"
        variants={itemVariants}
      >
        <Card className="relative overflow-hidden bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-emerald-600/10"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-xs sm:text-sm font-medium text-emerald-900">Today's Classes</CardTitle>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-lg sm:text-2xl font-bold text-emerald-900">{normalizedOverview.today_classes.length}</div>
            <p className="text-xs text-emerald-600 mt-1">Classes scheduled</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-blue-600/10"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-xs sm:text-sm font-medium text-blue-900">Total Students</CardTitle>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-lg sm:text-2xl font-bold text-blue-900">{normalizedOverview.total_students}</div>
            <p className="text-xs text-blue-600 mt-1">Across all courses</p>
          </CardContent>
        </Card>

       

        <Card className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-purple-600/10"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-xs sm:text-sm font-medium text-purple-900">Announcements</CardTitle>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-lg sm:text-2xl font-bold text-purple-900">{normalizedOverview.new_notifications}</div>
            <p className="text-xs text-purple-600 mt-1">New notifications</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Quick Actions</CardTitle>
            <CardDescription>Common tasks for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  className="w-full h-auto flex flex-col items-center p-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                  onClick={() => navigate('/dashboard/take-attendance')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Take Attendance
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  variant="outline"
                  className="w-full h-auto flex flex-col items-center p-4 border-2 hover:bg-blue-50 hover:border-blue-300"
                  onClick={() => navigate('/dashboard/upload-marks')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Upload Marks
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  variant="outline"
                  className="w-full h-auto flex flex-col items-center p-4 border-2 hover:bg-orange-50 hover:border-orange-300"
                  onClick={() => navigate('/dashboard/apply-leave')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Apply Leave
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Today's Schedule */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Today's Schedule</CardTitle>
            <CardDescription>Your classes for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {normalizedOverview.today_classes.map((classInfo: { subject: string; start_time: string; end_time: string; room: string; section: string; semester: number | null }, index: number) => (
                <motion.div 
                  key={index} 
                  className="border rounded-lg p-3 sm:p-4 hover:shadow-md transition-all duration-300"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm sm:text-base">{classInfo.subject}</h4>
                      <div className="flex flex-wrap items-center mt-1 text-xs sm:text-sm text-gray-500 gap-2">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{classInfo.start_time} - {classInfo.end_time}</span>
                        </div>
                        <span className="hidden sm:inline">•</span>
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <span>{classInfo.room}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">{classInfo.section}</Badge>
                      <Button 
                        size="sm" 
                        className="text-xs" 
                        onClick={() => {
                          const params = new URLSearchParams({ subject: classInfo.subject });
                          if (classInfo.section) params.append('section', classInfo.section);
                          if (classInfo.semester != null) params.append('semester', String(classInfo.semester));
                          navigate(`/dashboard/take-attendance?${params.toString()}`);
                        }}
                      >
                        Take Attendance
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>


      {/* Attendance Trend */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Attendance Trend</CardTitle>
            <CardDescription>Monthly attendance percentage trend</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[
                  { month: 'Jan', attendance: 85 },
                  { month: 'Feb', attendance: 88 },
                  { month: 'Mar', attendance: 92 },
                  { month: 'Apr', attendance: 87 },
                  { month: 'May', attendance: 90 },
                  { month: 'Jun', attendance: 89 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[80, 95]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="attendance" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      
    </motion.div>
  );
};

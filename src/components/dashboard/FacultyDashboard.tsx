
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { AttendanceChart } from '../charts/AttendanceChart';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { getDashboardOverview, getProctorStudents, getFacultyNotifications, getFacultyDashboardBootstrap, getTimetable, TimetableEntry } from '@/utils/faculty_api';
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
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    (async () => {
      // Use the optimized bootstrap API that includes all necessary data
      const bootstrapRes = await getFacultyDashboardBootstrap();
      if (bootstrapRes?.success && bootstrapRes.data) {
        const { assignments, proctor_students } = bootstrapRes.data;
        setProctorCount(proctor_students.length);
        
        // Get today's classes from timetable data
        const timetableRes = await getTimetable();
        if (timetableRes?.success && timetableRes.data) {
          // Filter classes for today
          const today = new Date();
          const todayDay = today.getDay(); // 0=Sun,1=Mon,...
          const dayMap: Record<number, string> = { 0: 'SUN', 1: 'MON', 2: 'TUE', 3: 'WED', 4: 'THU', 5: 'FRI', 6: 'SAT' };
          const todayCode = dayMap[todayDay];
          
          const todayClasses = timetableRes.data
            .filter(entry => entry.day === todayCode)
            .map(entry => ({
              subject: entry.subject,
              start_time: entry.start_time,
              end_time: entry.end_time,
              room: entry.room,
              section: entry.section,
              semester: entry.semester,
            }));
          
          setOverview({
            today_classes: todayClasses,
            total_students: proctor_students.length,
            pending_tasks: 0,
            new_notifications: 0,
          });
        }
        
        // Get notifications count
        const notifs = await getFacultyNotifications();
        if (notifs?.success && Array.isArray(notifs.data)) {
          setNotificationCount(notifs.data.length);
        }
      } else {
        // Fallback to old method if bootstrap fails
        const res = await getDashboardOverview();
        if (res?.success) {
          const data: DashboardOverviewRaw = res.data || {};
          setOverview(data);
          setAttendanceData(transformChartData(data?.stats || data?.attendance_stats || []));
        }
        
        // Fetch live counts
        try {
          const [proctorRes, notifs] = await Promise.all([
            getProctorStudents(),
            getFacultyNotifications(),
          ]);
          if (proctorRes?.success && proctorRes.data) {
            setProctorCount(proctorRes.data.length);
          }
          if (notifs?.success && Array.isArray(notifs.data)) {
            setNotificationCount(notifs.data.length);
          }
        } catch (e) {
          // ignore background count errors
        }
      }
    })();
  }, []);

  // Update time every second for live time display
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
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
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs sm:text-sm text-muted-foreground">
          
          <span className="hidden sm:inline mx-2 text-gray-300">|</span>
          <span>Spring Semester 2025</span>
        </div>
      </motion.div>

      

      {/* Quick Stats */}
      <motion.div 
        className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4"
        variants={itemVariants}
      >
        <Card className="relative overflow-hidden bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer" onClick={() => navigate('/dashboard/timetable')}>
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

        

       

        <Card className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer" onClick={() => navigate('/dashboard/announcements')}>
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

      {/* Ongoing Class Card */}
      <motion.div variants={itemVariants}>
        <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-blue-600/10"></div>
          <CardHeader className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base sm:text-lg text-blue-900 flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  Ongoing Class
                </CardTitle>
                <CardDescription className="text-blue-700">
                  Currently in session
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-2xl sm:text-3xl font-bold text-blue-900" id="live-time">
                  {currentTime.toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit', 
                    second: '2-digit',
                    hour12: true 
                  })}
                </div>
                <div className="text-xs text-blue-600">Live Time</div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            {normalizedOverview.today_classes.length > 0 ? (
              <div className="space-y-3">
                {normalizedOverview.today_classes.map((classInfo, index) => {
                  const now = currentTime;
                  const currentTimeMinutes = now.getHours() * 60 + now.getMinutes();
                  
                  // Parse class times (assuming format like "09:00" or "9:00 AM")
                  const parseTime = (timeStr: string) => {
                    if (!timeStr) return null;
                    const time = timeStr.replace(/[^\d:]/g, '');
                    const [hours, minutes] = time.split(':').map(Number);
                    return hours * 60 + (minutes || 0);
                  };
                  
                  const startTime = parseTime(classInfo.start_time);
                  const endTime = parseTime(classInfo.end_time);
                  
                  const isOngoing = startTime && endTime && 
                    currentTimeMinutes >= startTime && currentTimeMinutes <= endTime;
                  
                  if (!isOngoing) return null;
                  
                  return (
                    <motion.div 
                      key={index}
                      className="bg-white/50 rounded-lg p-4 border border-blue-200"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg text-blue-900">{classInfo.subject}</h4>
                          <div className="flex flex-wrap items-center mt-2 text-sm text-blue-700 gap-4">
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>{classInfo.start_time} - {classInfo.end_time}</span>
                            </div>
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                              <span>{classInfo.room}</span>
                            </div>
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span>{classInfo.section}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-2">
                          <div className="text-center">
                            <div className="text-sm font-medium text-blue-900">Duration</div>
                            <div className="text-xs text-blue-600">
                              {startTime && endTime ? 
                                `${Math.floor((endTime - currentTimeMinutes) / 60)}h ${(endTime - currentTimeMinutes) % 60}m left` : 
                                'Time unknown'
                              }
                            </div>
                          </div>
                          <Button 
                            size="sm" 
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={() => {
                              const params = new URLSearchParams({ subject: classInfo.subject });
                              if (classInfo.section) params.append('section', classInfo.section);
                              if (classInfo.semester != null) params.append('semester', String(classInfo.semester));
                              navigate(`/dashboard/take-attendance?${params.toString()}`);
                            }}
                          >
                            Join Class
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
                {normalizedOverview.today_classes.every((classInfo) => {
                  const now = currentTime;
                  const currentTimeMinutes = now.getHours() * 60 + now.getMinutes();
                  const parseTime = (timeStr: string) => {
                    if (!timeStr) return null;
                    const time = timeStr.replace(/[^\d:]/g, '');
                    const [hours, minutes] = time.split(':').map(Number);
                    return hours * 60 + (minutes || 0);
                  };
                  const startTime = parseTime(classInfo.start_time);
                  const endTime = parseTime(classInfo.end_time);
                  return !(startTime && endTime && currentTimeMinutes >= startTime && currentTimeMinutes <= endTime);
                }) && (
                  <div className="text-center py-8 text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm">No ongoing classes at the moment</p>
                    <p className="text-xs mt-1">Check your schedule for upcoming classes</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm">No classes scheduled for today</p>
                <p className="text-xs mt-1">Enjoy your free time!</p>
              </div>
            )}
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
                      <div className="flex flex-wrap items-center mt-1 text-xs sm:text-sm text-muted-foreground gap-2">
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
                  variant="outline"
                  className="w-full h-auto flex flex-col items-center p-4 border-2 hover:bg-green-50 hover:border-green-300"
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
                  onClick={() => navigate('/dashboard/timetable')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Time Table
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

      


      

      
    </motion.div>
  );
};

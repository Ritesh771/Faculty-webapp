
import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, Edit, Plus } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { getTimetable, TimetableEntry } from '@/utils/faculty_api';

const TimetablePage: React.FC = () => {
  const { toast } = useToast();
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [selectedSection, setSelectedSection] = useState('all');
  const [entries, setEntries] = useState<TimetableEntry[]>([]);
  const [nowMinutes, setNowMinutes] = useState<number>(() => {
    const d = new Date();
    return d.getHours() * 60 + d.getMinutes();
  });

  useEffect(() => {
    (async () => {
      const res = await getTimetable();
      if (res?.success && res?.data) setEntries(res.data);
    })();
  }, []);

  const timetableData = useMemo(() => {
    return entries.map((e, idx) => ({
      id: idx + 1,
      day: e.day,
      time: `${e.start_time}-${e.end_time}`,
      subject: e.subject,
      faculty: e.faculty_name,
      room: e.room,
      semester: e.semester,
      section: e.section,
    }));
  }, [entries]);

  const filteredTimetable = timetableData.filter(entry => {
    if (selectedSemester !== 'all' && entry.semester.toString() !== selectedSemester) return false;
    if (selectedSection !== 'all' && entry.section !== selectedSection) return false;
    return true;
  });

  const handleScheduleClass = () => {
    toast({
      title: "Schedule Class",
      description: "New class scheduling form would open here.",
    });
  };

  const dayCodes = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const dayLabel: Record<string, string> = { MON: 'Monday', TUE: 'Tuesday', WED: 'Wednesday', THU: 'Thursday', FRI: 'Friday', SAT: 'Saturday' };

  const filtered = useMemo(() => {
    return timetableData.filter(e => {
      if (selectedSemester !== 'all' && String(e.semester) !== selectedSemester) return false;
      if (selectedSection !== 'all' && e.section !== selectedSection) return false;
      return true;
    });
  }, [timetableData, selectedSemester, selectedSection]);

  const todayCode = useMemo(() => {
    const jsDay = new Date().getDay(); // 0=Sun,1=Mon,...
    const map: Record<number, string | null> = { 0: null, 1: 'MON', 2: 'TUE', 3: 'WED', 4: 'THU', 5: 'FRI', 6: 'SAT' };
    return map[jsDay];
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const d = new Date();
      setNowMinutes(d.getHours() * 60 + d.getMinutes());
    }, 1800000);
    return () => clearInterval(interval);
  }, []);

  const parseTimeToMinutes = (t: string): number => {
    // Expect formats like "HH:MM"; fallback gracefully
    const [h, m] = t.split(':').map((x) => parseInt(x || '0', 10));
    if (Number.isNaN(h) || Number.isNaN(m)) return -1;
    return h * 60 + m;
  };

  const currentClass = useMemo(() => {
    if (!todayCode) return null;
    const todayEntries = filtered.filter(e => e.day === todayCode);
    for (const e of todayEntries) {
      const [start, end] = e.time.split('-');
      const startMin = parseTimeToMinutes(start);
      const endMin = parseTimeToMinutes(end);
      if (startMin <= nowMinutes && nowMinutes < endMin) return e;
    }
    return null;
  }, [filtered, nowMinutes, todayCode]);

  // filtered defined above for reuse

  const timeSlots = useMemo(() => {
    const set = new Set<string>();
    filtered.forEach(e => set.add(e.time));
    return Array.from(set).sort();
  }, [filtered]);

  return (
    <div className="w-full max-w-full overflow-hidden">
      <div className="space-y-4 sm:space-y-6 p-2 sm:p-4 lg:p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col gap-4">
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold tracking-tight text-gray-900 truncate">
                Timetable Management
              </h1>
              <p className="text-xs sm:text-sm lg:text-base text-gray-600 mt-1">
                Manage class schedules with clash detection
              </p>
            </div>
            {currentClass && (
              <Card className="border-primary/30 bg-primary/5">
                <CardContent className="py-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="outline" className="border-primary text-primary">Now</Badge>
                    <span className="font-medium text-gray-900">{currentClass.subject}</span>
                    <span className="text-gray-500">• {currentClass.time}</span>
                    <span className="text-gray-500">• {currentClass.room}</span>
                    <span className="ml-auto text-gray-600">Sem {currentClass.semester}-{currentClass.section}</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </motion.div>

      

        {/* Timetable Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
                Weekly Timetable
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                View and manage class schedules across the week
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="w-full overflow-auto max-h-[70vh]">
                <div className="min-w-[760px] sm:min-w-[900px] p-4">
                  {/* Header Row */}
                  <div className="grid grid-cols-7 gap-2 mb-4 sticky top-0 bg-white z-10">
                    <div className="font-semibold text-center p-3 text-sm bg-gray-100 rounded border min-w-[90px]">
                      Time
                    </div>
                    {dayCodes.map(code => (
                      <div 
                        key={code} 
                        className={[
                          "font-semibold text-center p-3 rounded border text-sm min-w-[120px]",
                          code === todayCode ? "bg-blue-100 border-blue-300 text-blue-800" : "bg-blue-50"
                        ].join(' ')}
                      >
                        {dayLabel[code]}
                      </div>
                    ))}
                  </div>
                  
                  {/* Time Slots */}
                  <div className="space-y-2">
                    {timeSlots.map(timeSlot => (
                      <div key={timeSlot} className="grid grid-cols-7 gap-2">
                        <div className="font-medium text-sm p-3 bg-gray-50 rounded border text-center flex items-center justify-center min-h-[72px] sm:min-h-[100px] min-w-[90px]">
                          <span className="transform -rotate-90 sm:rotate-0 whitespace-nowrap">
                            {timeSlot}
                          </span>
                        </div>
                        {dayCodes.map(code => {
                          const classForSlot = filtered.find(
                            entry => entry.day === code && entry.time === timeSlot
                          );
                          return (
                            <div key={`${code}-${timeSlot}`} className={[
                              "min-h-[72px] sm:min-h-[100px] border rounded p-3 bg-white hover:bg-gray-50 transition-colors min-w-[120px]",
                              code === todayCode ? "border-blue-300" : ""
                            ].join(' ')}>
                              {classForSlot ? (
                                <div className="space-y-2 h-full flex flex-col">
                                  <div className="font-medium text-sm text-blue-600 line-clamp-2">
                                    {classForSlot.subject}
                                  </div>
                                  <div className="text-xs text-gray-600 line-clamp-1">
                                    {classForSlot.faculty}
                                  </div>
                                  <div className="text-xs text-gray-500 line-clamp-1">
                                    {classForSlot.room}
                                  </div>
                                  <div className="mt-auto">
                                    <Badge variant="outline" className={currentClass && currentClass.day === code && currentClass.time === timeSlot ? "text-xs border-green-400 text-green-700" : "text-xs"}>
                                      Sem {classForSlot.semester}-{classForSlot.section}
                                    </Badge>
                                  </div>
                                </div>
                              ) : (
                                <div className="h-full flex items-center justify-center">
                                  <Button variant="ghost" size="sm" className="text-xs h-8 w-8 p-0 hover:bg-blue-50">
                                    <Plus className="h-4 w-4 text-gray-400" />
                                  </Button>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Changes */}
        
      </div>
    </div>
  );
};

export default TimetablePage;

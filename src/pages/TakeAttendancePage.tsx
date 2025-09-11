
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Users, Check, X, Clock } from 'lucide-react';
import { getFacultyAssignments, getStudentsForClass, takeAttendance, ClassStudent } from '@/utils/faculty_api';

const TakeAttendancePage: React.FC = () => {
  const { toast } = useToast();
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [assignments, setAssignments] = useState<any[]>([]);
  const [classMeta, setClassMeta] = useState<{ branch_id?: number; semester_id?: number; section_id?: number; subject_id?: number } | null>(null);
  
  const [students, setStudents] = useState<Array<ClassStudent & { status: 'present' | 'absent' | 'late' }>>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getFacultyAssignments();
      if ((res as any).success && (res as any).data) {
        setAssignments((res as any).data);
      }
    })();
  }, []);

  const preselect = useMemo(() => {
    const qs = new URLSearchParams(location.search);
    return {
      subject: qs.get('subject') || '',
      section: qs.get('section') || '',
      semester: qs.get('semester') || '',
    };
  }, [location.search]);

  useEffect(() => {
    if (!assignments.length) return;
    if (!preselect.subject) return;
    const match = assignments.find(a => {
      const subjectMatch = a.subject_name === preselect.subject;
      const sectionMatch = preselect.section ? a.section === preselect.section : true;
      const semesterMatch = preselect.semester ? String(a.semester_id) === String(preselect.semester) || String(a.semester) === String(preselect.semester) : true;
      return subjectMatch && sectionMatch && semesterMatch;
    });
    if (match) {
      // Trigger same flow as manual selection
      (async () => {
        setSelectedSubject(match.subject_name);
        const meta = { branch_id: match.branch_id, semester_id: match.semester_id, section_id: match.section_id, subject_id: match.subject_id };
        setClassMeta(meta);
        const list = await getStudentsForClass(match.branch_id, match.semester_id, match.section_id, match.subject_id);
        const withStatus = list.map(s => ({ ...s, status: 'present' as const }));
        setStudents(withStatus);
        setAttendance(withStatus.reduce((acc, s) => ({ ...acc, [s.id]: 'present' }), {}));
      })();
    }
  }, [assignments, preselect]);

  const [attendance, setAttendance] = useState<Record<number, 'present' | 'absent' | 'late'>>({});

  const toggleAttendance = (studentId: number, status: string) => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const handleSubmit = async () => {
    if (!selectedSubject || !classMeta) {
      toast({
        title: "Error",
        description: "Please select a subject first.",
        variant: "destructive"
      });
      return;
    }
    setLoading(true);
    const payload = {
      branch_id: String(classMeta.branch_id),
      subject_id: String(classMeta.subject_id),
      section_id: String(classMeta.section_id),
      semester_id: String(classMeta.semester_id),
      method: 'manual' as const,
      attendance: students.map(s => ({ 
        student_id: String(s.id), 
        status: attendance[s.id] === 'present' || attendance[s.id] === 'late'
      })),
    };
    const res = await takeAttendance(payload);
    setLoading(false);
    if (res.success) {
      toast({ title: "Attendance Submitted", description: `Attendance for ${selectedSubject} on ${selectedDate} has been recorded.` });
    } else {
      toast({ title: "Error", description: res.message || 'Failed to submit attendance', variant: 'destructive' });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-500';
      case 'absent': return 'bg-red-500';
      case 'late': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present': return <Check className="h-4 w-4" />;
      case 'absent': return <X className="h-4 w-4" />;
      case 'late': return <Clock className="h-4 w-4" />;
      default: return null;
    }
  };

  const presentCount = Object.values(attendance).filter(status => status === 'present').length;
  const absentCount = Object.values(attendance).filter(status => status === 'absent').length;
  const lateCount = Object.values(attendance).filter(status => status === 'late').length;

  return (
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-4 lg:p-6 max-w-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-gray-900">
              Take Attendance
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Mark student attendance for today's classes
            </p>
          </div>
          <Badge variant="outline" className="flex items-center gap-2 w-fit">
            <Calendar className="h-4 w-4" />
            {new Date().toLocaleDateString()}
          </Badge>
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Class Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Subject</label>
                <Select value={selectedSubject} onValueChange={async (val) => {
                  setSelectedSubject(val);
                  const a = assignments.find(x => x.subject_name === val);
                  if (a) {
                    const meta = { branch_id: a.branch_id, semester_id: a.semester_id, section_id: a.section_id, subject_id: a.subject_id };
                    setClassMeta(meta);
                    const list = await getStudentsForClass(a.branch_id, a.semester_id, a.section_id, a.subject_id);
                    const withStatus = list.map(s => ({ ...s, status: 'present' as const }));
                    setStudents(withStatus);
                    setAttendance(withStatus.reduce((acc, s) => ({ ...acc, [s.id]: 'present' }), {}));
                  }
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {assignments.map((a) => (
                      <SelectItem key={`${a.subject_id}-${a.section_id}`} value={a.subject_name}>
                        {a.subject_name} • {a.section}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Summary */}
      {selectedSubject && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Present</p>
                  <p className="text-2xl font-bold text-green-600">{presentCount}</p>
                </div>
                <Check className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Absent</p>
                  <p className="text-2xl font-bold text-red-600">{absentCount}</p>
                </div>
                <X className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Late</p>
                  <p className="text-2xl font-bold text-yellow-600">{lateCount}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Student List */}
      {selectedSubject && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5" />
                Student Attendance - {selectedSubject}
              </CardTitle>
              <CardDescription>
                Tap on a student to mark their attendance status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {students.map((student, index) => (
                  <motion.div
                    key={student.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="border rounded-lg p-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{student.name}</h4>
                        <p className="text-sm text-gray-600">{student.usn}</p>
                      </div>
                      <div className="flex gap-2">
                        {['present', 'absent', 'late'].map((status) => (
                          <Button
                            key={status}
                            variant={attendance[student.id] === status ? "default" : "outline"}
                            size="sm"
                            className={`flex items-center gap-1 ${
                              attendance[student.id] === status 
                                ? getStatusColor(status) + ' text-white hover:' + getStatusColor(status)
                                : ''
                            }`}
                            onClick={() => toggleAttendance(student.id, status)}
                          >
                            {getStatusIcon(status)}
                            <span className="capitalize">{status}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={handleSubmit}
                  className="flex-1 sm:flex-none"
                  disabled={!selectedSubject || loading}
                >
                  {loading ? 'Submitting...' : 'Submit Attendance'}
                </Button>
                <Button variant="outline" className="flex-1 sm:flex-none">
                  Save as Draft
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default TakeAttendancePage;

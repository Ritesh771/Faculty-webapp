
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, BarChart3, Calendar, Users } from 'lucide-react';
import { viewAttendanceRecords, getFacultyAssignments } from '@/utils/faculty_api';

const AttendanceRecordsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [assignments, setAssignments] = useState<any[]>([]);
  const [selected, setSelected] = useState<{ branch_id?: number; semester_id?: number; section_id?: number; subject_id?: number } | null>(null);
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Sort students by USN (last 3 digits numerically)
  const sortStudentsByUSN = (studentList: any[]) => {
    return [...studentList].sort((a, b) => {
      const aLastThree = a.usn.slice(-3);
      const bLastThree = b.usn.slice(-3);
      return parseInt(aLastThree, 10) - parseInt(bLastThree, 10);
    });
  };

  useEffect(() => {
    (async () => {
      const res = await getFacultyAssignments();
      if ((res as any).success && (res as any).data) setAssignments((res as any).data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!selected?.branch_id || !selected?.semester_id || !selected?.section_id || !selected?.subject_id) return;
      setLoading(true);
      const params = {
        branch_id: String(selected.branch_id),
        semester_id: String(selected.semester_id),
        section_id: String(selected.section_id),
        subject_id: String(selected.subject_id),
      };
      const res = await viewAttendanceRecords(params);
      setLoading(false);
      if (res?.success) {
        // Sort students by USN and store individual student records
        const sortedRecords = sortStudentsByUSN(res.data || []);
        setRecords(sortedRecords);
      } else {
        setRecords([]);
      }
    })();
  }, [selected]);

  const filteredData = records
    .filter(record => {
      const matchesSearch = (record.student || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (record.usn || '').toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });

  const getPercentageColor = (percentage: number) => {
    if (percentage >= 85) return 'text-green-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 85) return 'bg-green-500';
    if (percentage >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

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
              Attendance Records
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              View detailed attendance records for individual students
            </p>
          </div>
          <Badge variant="outline" className="flex items-center gap-2 w-fit">
            <Calendar className="h-4 w-4" />
            Academic Year 2024-25
          </Badge>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              

              <Select
                value={selected?.branch_id?.toString() || ''}
                onValueChange={(v) => setSelected(prev => ({ ...(prev || {}), branch_id: Number(v) }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Branch" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from(new Map(assignments.map(a => [a.branch_id, { id: a.branch_id, name: a.branch }])).values()).map((b: any) => (
                    <SelectItem key={b.id} value={b.id.toString()}>{b.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selected?.semester_id?.toString() || ''}
                onValueChange={(v) => { setSelected(prev => ({ ...(prev || {}), semester_id: Number(v) })); setSelectedSemester(v); }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Semester" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from(new Map(assignments
                    .filter(a => !selected?.branch_id || a.branch_id === selected?.branch_id)
                    .map(a => [a.semester_id, { id: a.semester_id, name: a.semester }])).values()).map((s: any) => (
                    <SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selected?.section_id?.toString() || ''}
                onValueChange={(v) => setSelected(prev => ({ ...(prev || {}), section_id: Number(v) }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Section" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from(new Map(assignments
                    .filter(a => (!selected?.branch_id || a.branch_id === selected?.branch_id) && (!selected?.semester_id || a.semester_id === selected?.semester_id))
                    .map(a => [a.section_id, { id: a.section_id, name: a.section }])).values()).map((s: any) => (
                    <SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selected?.subject_id?.toString() || ''}
                onValueChange={(v) => setSelected(prev => ({ ...(prev || {}), subject_id: Number(v) }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from(new Map(assignments
                    .filter(a => (!selected?.branch_id || a.branch_id === selected?.branch_id)
                      && (!selected?.semester_id || a.semester_id === selected?.semester_id)
                      && (!selected?.section_id || a.section_id === selected?.section_id))
                    .map(a => [a.subject_id, { id: a.subject_id, name: a.subject_name }])).values()).map((s: any) => (
                    <SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Attendance Records */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Subject-wise Attendance
            </CardTitle>
            <CardDescription>
              Detailed attendance breakdown for each student
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loading && (
                <div className="text-center text-gray-500 py-6">Loading records...</div>
              )}
              {filteredData.map((record, index) => (
                <motion.div
                  key={`${record.usn}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <h4 className="font-medium text-gray-900">{record.student}</h4>
                        <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                          {record.usn}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-3">
                        <div>
                          <p className="text-sm text-gray-600">Total Classes</p>
                          <p className="font-semibold text-gray-900">{record.total_sessions}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Attended</p>
                          <p className="font-semibold text-gray-900">{record.present}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Percentage</p>
                          <p className={`font-bold text-lg ${getPercentageColor(record.percentage)}`}>
                            {record.percentage}%
                          </p>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredData.length === 0 && (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">No student attendance records found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AttendanceRecordsPage;

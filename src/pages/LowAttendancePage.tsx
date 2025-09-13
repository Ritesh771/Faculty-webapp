
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, Bell, Search } from 'lucide-react';

const LowAttendancePage: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for low attendance students
  const lowAttendanceStudents = [
    { id: 1, name: 'John Doe', usn: '1MS21CS001', subject: 'Data Structures', attendance: 45, semester: 3 },
    { id: 2, name: 'Jane Smith', usn: '1MS21CS002', subject: 'Computer Networks', attendance: 60, semester: 5 },
    { id: 3, name: 'Mike Johnson', usn: '1MS21CS003', subject: 'Database Systems', attendance: 50, semester: 3 },
    { id: 4, name: 'Sarah Wilson', usn: '1MS21CS004', subject: 'Operating Systems', attendance: 55, semester: 4 },
    { id: 5, name: 'David Brown', usn: '1MS21CS005', subject: 'Software Engineering', attendance: 62, semester: 6 },
  ];

  const filteredStudents = lowAttendanceStudents.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.usn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNotifyStudent = (studentName: string, usn: string) => {
    toast({
      title: "Notification Sent",
      description: `Low attendance alert sent to ${studentName} (${usn})`,
    });
  };

  const getAttendanceBadgeColor = (percentage: number) => {
    if (percentage < 50) return 'destructive';
    if (percentage < 65) return 'secondary';
    return 'default';
  };

  return (
    <div className="w-full max-w-full overflow-hidden">
      <div className="space-y-4 sm:space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col gap-4">
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold tracking-tight text-gray-900 truncate">
                Low Attendance Monitoring
              </h1>
              <p className="text-xs sm:text-sm lg:text-base text-gray-600 mt-1">
                Students with attendance below 75%
              </p>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-amber-600 font-medium">
                {filteredStudents.length} students need attention
              </span>
            </div>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative w-full"
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
          <Input
            placeholder="Search by name, USN, or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 sm:pl-10 w-full max-w-md text-sm"
          />
        </motion.div>

        {/* Low Attendance Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg xl:text-xl">Students with Low Attendance</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Monitor and take action for students with attendance below required threshold
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="w-full overflow-hidden">
                {/* Desktop Table Header */}
                <div className="hidden sm:grid grid-cols-6 gap-2 sm:gap-4 p-3 sm:p-4 bg-gray-50 border-b font-medium text-xs sm:text-sm text-gray-700">
                  <div className="truncate">Student Name</div>
                  <div className="truncate">USN</div>
                  <div className="truncate">Subject</div>
                  <div className="truncate">Semester</div>
                  <div className="truncate">Attendance %</div>
                  <div className="truncate">Actions</div>
                </div>

                {/* Table Body */}
                <div className="max-h-96 overflow-y-auto">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student, index) => (
                      <motion.div
                        key={student.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="border-b hover:bg-gray-50 transition-colors"
                      >
                        {/* Desktop View */}
                        <div className="hidden sm:grid grid-cols-6 gap-2 sm:gap-4 p-3 sm:p-4 items-center">
                          <div className="font-medium text-gray-900 text-xs sm:text-sm truncate">{student.name}</div>
                          <div className="text-gray-600 text-xs sm:text-sm truncate">{student.usn}</div>
                          <div className="text-gray-700 text-xs sm:text-sm truncate">{student.subject}</div>
                          <div className="text-gray-600 text-xs sm:text-sm">Sem {student.semester}</div>
                          <div>
                            <Badge variant={getAttendanceBadgeColor(student.attendance)} className="text-xs">
                              {student.attendance}%
                            </Badge>
                          </div>
                          <div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleNotifyStudent(student.name, student.usn)}
                              className="flex items-center gap-1 text-xs w-full"
                            >
                              <Bell className="h-3 w-3" />
                              Notify
                            </Button>
                          </div>
                        </div>

                        {/* Mobile View */}
                        <div className="sm:hidden p-3 sm:p-4 space-y-2">
                          <div className="flex justify-between items-start">
                            <div className="min-w-0 flex-1">
                              <div className="font-medium text-gray-900 text-sm truncate">{student.name}</div>
                              <div className="text-xs text-gray-600 truncate">{student.usn}</div>
                            </div>
                            <Badge variant={getAttendanceBadgeColor(student.attendance)} className="text-xs flex-shrink-0">
                              {student.attendance}%
                            </Badge>
                          </div>
                          <div className="text-xs text-gray-700 truncate">{student.subject}</div>
                          <div className="text-xs text-gray-600">Semester {student.semester}</div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleNotifyStudent(student.name, student.usn)}
                            className="flex items-center gap-1 text-xs w-full"
                          >
                            <Bell className="h-3 w-3" />
                            Notify Student
                          </Button>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="p-6 sm:p-8 text-center text-gray-500">
                      <AlertTriangle className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-4 text-gray-300" />
                      <p className="text-sm">No students found matching your search criteria</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Summary Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4"
        >
          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-gray-600 truncate">Critical (&lt;50%)</p>
                  <p className="text-lg sm:text-2xl font-bold text-red-600">
                    {filteredStudents.filter(s => s.attendance < 50).length}
                  </p>
                </div>
                <div className="h-8 w-8 sm:h-12 sm:w-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="h-4 w-4 sm:h-6 sm:w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-gray-600 truncate">Warning (50-65%)</p>
                  <p className="text-lg sm:text-2xl font-bold text-amber-600">
                    {filteredStudents.filter(s => s.attendance >= 50 && s.attendance < 65).length}
                  </p>
                </div>
                <div className="h-8 w-8 sm:h-12 sm:w-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="h-4 w-4 sm:h-6 sm:w-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-gray-600 truncate">At Risk (65-75%)</p>
                  <p className="text-lg sm:text-2xl font-bold text-blue-600">
                    {filteredStudents.filter(s => s.attendance >= 65 && s.attendance < 75).length}
                  </p>
                </div>
                <div className="h-8 w-8 sm:h-12 sm:w-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default LowAttendancePage;


import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, Download, Filter, BarChart3 } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";

const PerformancePage: React.FC = () => {
  const { toast } = useToast();
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedSemester, setSelectedSemester] = useState('all');

  // Mock performance data
  const performanceData = [
    { class: 'CS-3A', attendance: 85, marks: 78, students: 60 },
    { class: 'CS-3B', attendance: 88, marks: 82, students: 58 },
    { class: 'CS-4A', attendance: 92, marks: 85, students: 62 },
    { class: 'CS-4B', attendance: 87, marks: 80, students: 59 },
    { class: 'CS-5A', attendance: 90, marks: 88, students: 55 },
    { class: 'CS-5B', attendance: 83, marks: 75, students: 57 },
  ];

  const trendData = [
    { month: 'Jan', attendance: 85, marks: 75 },
    { month: 'Feb', attendance: 87, marks: 78 },
    { month: 'Mar', attendance: 89, marks: 80 },
    { month: 'Apr', attendance: 91, marks: 82 },
    { month: 'May', attendance: 88, marks: 84 },
  ];

  const subjectPerformance = [
    { subject: 'Data Structures', avgMarks: 82, attendance: 88 },
    { subject: 'Database Systems', avgMarks: 78, attendance: 85 },
    { subject: 'Computer Networks', avgMarks: 85, attendance: 90 },
    { subject: 'Operating Systems', avgMarks: 80, attendance: 87 },
    { subject: 'Software Engineering', avgMarks: 88, attendance: 92 },
  ];

  const handleExportPDF = () => {
    toast({
      title: "Export Started",
      description: "Performance report is being generated as PDF...",
    });
  };

  const handleExportCSV = () => {
    toast({
      title: "Export Started",
      description: "Performance data is being exported as CSV...",
    });
  };

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
                Performance Analytics
              </h1>
              <p className="text-xs sm:text-sm lg:text-base text-gray-600 mt-1">
                Attendance vs marks analysis across classes and subjects
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button onClick={handleExportPDF} variant="outline" size="sm" className="flex items-center gap-2 text-xs sm:text-sm">
                <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                Export PDF
              </Button>
              <Button onClick={handleExportCSV} variant="outline" size="sm" className="flex items-center gap-2 text-xs sm:text-sm">
                <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                Export CSV
              </Button>
            </div>
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
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <Filter className="h-4 w-4 sm:h-5 sm:w-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    {subjectPerformance.map(subject => (
                      <SelectItem key={subject.subject} value={subject.subject}>
                        {subject.subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Select Semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Semesters</SelectItem>
                    {[3, 4, 5, 6, 7, 8].map(sem => (
                      <SelectItem key={sem} value={sem.toString()}>Semester {sem}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Performance Overview Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5" />
                Class-wise Performance Overview
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Attendance percentage vs average marks comparison
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-48 sm:h-64 lg:h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="class" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="attendance" fill="#3b82f6" name="Attendance %" />
                    <Bar dataKey="marks" fill="#10b981" name="Average Marks %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Trend Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
                Performance Trends
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Monthly attendance and marks trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-48 sm:h-64 lg:h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Line type="monotone" dataKey="attendance" stroke="#3b82f6" strokeWidth={2} name="Attendance %" />
                    <Line type="monotone" dataKey="marks" stroke="#10b981" strokeWidth={2} name="Average Marks %" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Subject Performance Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Subject-wise Performance</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Detailed performance metrics by subject
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="w-full">
                <div className="min-w-[600px]">
                  {/* Table Header */}
                  <div className="grid grid-cols-4 gap-4 p-3 sm:p-4 bg-gray-50 border-b font-medium text-xs sm:text-sm text-gray-700">
                    <div>Subject</div>
                    <div className="text-center">Average Marks (%)</div>
                    <div className="text-center">Attendance (%)</div>
                    <div className="text-center">Performance Index</div>
                  </div>

                  {/* Table Body */}
                  <div className="max-h-64 overflow-y-auto">
                    {subjectPerformance.map((subject, index) => {
                      const performanceIndex = ((subject.avgMarks + subject.attendance) / 2).toFixed(1);
                      return (
                        <motion.div
                          key={subject.subject}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="grid grid-cols-4 gap-4 p-3 sm:p-4 border-b hover:bg-gray-50 transition-colors"
                        >
                          <div className="font-medium text-gray-900 text-xs sm:text-sm truncate">{subject.subject}</div>
                          <div className="text-center">
                            <span className={`font-medium text-xs sm:text-sm ${
                              subject.avgMarks >= 85 ? 'text-green-600' : 
                              subject.avgMarks >= 75 ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                              {subject.avgMarks}%
                            </span>
                          </div>
                          <div className="text-center">
                            <span className={`font-medium text-xs sm:text-sm ${
                              subject.attendance >= 90 ? 'text-green-600' : 
                              subject.attendance >= 80 ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                              {subject.attendance}%
                            </span>
                          </div>
                          <div className="text-center">
                            <span className={`font-bold text-xs sm:text-sm ${
                              parseFloat(performanceIndex) >= 87 ? 'text-green-600' : 
                              parseFloat(performanceIndex) >= 80 ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                              {performanceIndex}
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="text-center">
                <p className="text-xs sm:text-sm text-gray-600">Department Average</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600">87.2%</p>
                <p className="text-xs text-gray-500 mt-1">Overall Performance</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="text-center">
                <p className="text-xs sm:text-sm text-gray-600">Best Performing</p>
                <p className="text-sm sm:text-lg font-bold text-green-600">CS-4A</p>
                <p className="text-xs text-gray-500 mt-1">92% attendance, 85% marks</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="text-center">
                <p className="text-xs sm:text-sm text-gray-600">Needs Attention</p>
                <p className="text-sm sm:text-lg font-bold text-red-600">CS-5B</p>
                <p className="text-xs text-gray-500 mt-1">83% attendance, 75% marks</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="text-center">
                <p className="text-xs sm:text-sm text-gray-600">Monthly Trend</p>
                <p className="text-xl sm:text-2xl font-bold text-green-600">+2.3%</p>
                <p className="text-xs text-gray-500 mt-1">Improvement this month</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PerformancePage;

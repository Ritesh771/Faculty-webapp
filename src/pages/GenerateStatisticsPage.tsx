
import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Download, BarChart3, TrendingUp, FileText, Filter } from 'lucide-react';
import { getFacultyAssignments, generateStatistics, downloadPDF } from '@/utils/faculty_api';

const GenerateStatisticsPage: React.FC = () => {
  const { toast } = useToast();
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [assignments, setAssignments] = useState<any[]>([]);
  const [stats, setStats] = useState<any[]>([]);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const res = await getFacultyAssignments();
      if (res?.success && res?.data) setAssignments(res.data);
      const gen = await generateStatistics();
      if (gen?.success) {
        setStats(gen.data?.stats || []);
        if (gen.data?.pdf_url) setPdfUrl(gen.data.pdf_url);
      }
    })();
  }, []);

  const subjects = useMemo(() => {
    // Prefer backend-provided labels from stats (student__name or subject); fallback to assignment subjects
    const statLabels = (stats || []).map((s: any) => s.subject || s.student__name).filter(Boolean);
    if (statLabels.length > 0) {
      return Array.from(new Set(statLabels)) as string[];
    }
    return Array.from(new Map(assignments.map(a => [a.subject_name, a.subject_name])).values()) as string[];
  }, [stats, assignments]);

  const subjectPerformanceData = useMemo(() => {
    return (stats || []).map((s: any) => ({
      subject: s.subject || s.student__name || 'Subject',
      attendance: typeof s.percentage === 'number' ? s.percentage : Number(s.percentage) || 0,
      marks: typeof s.percentage === 'number' ? s.percentage : Number(s.percentage) || 0,
      students: s.count || 1,
      total: s.total ?? s.total_sessions ?? 0,
      present: s.present ?? s.attended ?? 0,
    }));
  }, [stats]);

  const attendanceTrendData = [
    { month: 'Jan', attendance: 85 },
    { month: 'Feb', attendance: 88 },
    { month: 'Mar', attendance: 92 },
    { month: 'Apr', attendance: 87 },
    { month: 'May', attendance: 90 },
    { month: 'Jun', attendance: 89 },
  ];

  const gradeDistributionData = [
    { grade: 'A+', count: 12, color: '#22c55e' },
    { grade: 'A', count: 18, color: '#3b82f6' },
    { grade: 'B+', count: 15, color: '#f59e0b' },
    { grade: 'B', count: 8, color: '#ef4444' },
    { grade: 'C', count: 3, color: '#6b7280' },
  ];

  const handleExport = async (format: 'pdf' | 'excel') => {
    if (format === 'pdf' && pdfUrl) {
      const a = document.createElement('a');
      a.href = pdfUrl;
      a.download = 'statistics.pdf';
      a.click();
      return;
    }
    // Fallback: regenerate and download
    const gen = await generateStatistics();
    if (gen?.success && gen.data?.pdf_url) {
      const { success, file_url } = await downloadPDF(gen.data.pdf_url.split('/').pop());
      if (success && file_url) {
        const a = document.createElement('a');
        a.href = file_url;
        a.download = 'statistics.pdf';
        a.click();
      } else {
        toast({ title: 'Download failed', description: 'Could not download PDF', variant: 'destructive' });
      }
    } else {
      toast({ title: 'Generate failed', description: 'Could not generate statistics', variant: 'destructive' });
    }
  };

  const handleGenerateReport = async () => {
    const gen = await generateStatistics();
    if (gen?.success) {
      setStats(gen.data?.stats || []);
      setPdfUrl(gen.data?.pdf_url || null);
      toast({ title: 'Report generated', description: 'Statistics updated from backend.' });
    } else {
      toast({ title: 'Failed', description: gen?.message || 'Could not generate statistics', variant: 'destructive' });
    }
  };

  const filteredData = selectedSubject && selectedSubject !== 'all'
    ? subjectPerformanceData.filter(item => item.subject === selectedSubject)
    : subjectPerformanceData;

  const averageAttendance = useMemo(() => {
    if (!subjectPerformanceData.length) return 0;
    const sum = subjectPerformanceData.reduce((acc, item) => acc + (Number(item.attendance) || 0), 0);
    return Math.round((sum / subjectPerformanceData.length) * 10) / 10;
  }, [subjectPerformanceData]);

  const totalStudents = useMemo(() => {
    return (stats || []).length;
  }, [stats]);

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
              Generate Statistics
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              View and export detailed performance statistics
            </p>
          </div>
          <Badge variant="outline" className="flex items-center gap-2 w-fit">
            <BarChart3 className="h-4 w-4" />
            Academic Analytics
          </Badge>
        </div>
      </motion.div>

      

      {/* Subject Performance Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Subject Performance Overview</CardTitle>
            <CardDescription>
              Comparison of attendance and marks across subjects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="subject" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    fontSize={12}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="attendance" fill="#3b82f6" name="Attendance %" />
                  <Bar dataKey="marks" fill="#10b981" name="Average Marks %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Attendance Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Attendance Trend
              </CardTitle>
              <CardDescription>
                Monthly attendance percentage trend
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={attendanceTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[80, 95]} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="attendance" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Grade Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Grade Distribution</CardTitle>
              <CardDescription>
                Overall grade distribution across all subjects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={gradeDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ grade, count }) => `${grade}: ${count}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {gradeDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {gradeDistributionData.map((item) => (
                  <div key={item.grade} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-600">
                      {item.grade}: {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Summary Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Average Attendance</p>
              <p className="text-3xl font-bold text-blue-600">{averageAttendance}%</p>
              <p className="text-xs text-green-600 mt-1">Updated from backend</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Average Marks</p>
              <p className="text-3xl font-bold text-green-600">83.2%</p>
              <p className="text-xs text-green-600 mt-1">↑ 1.8% from last month</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Total Students</p>
              <p className="text-3xl font-bold text-purple-600">{totalStudents}</p>
              <p className="text-xs text-gray-600 mt-1">In this report</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default GenerateStatisticsPage;

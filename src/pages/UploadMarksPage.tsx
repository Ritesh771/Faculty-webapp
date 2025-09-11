
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Upload, Download, Save, FileSpreadsheet } from 'lucide-react';
import { getFacultyAssignments, getStudentsForClass, uploadInternalMarks, InternalMarkStudent, getInternalMarksForClass } from '@/utils/faculty_api';

const UploadMarksPage: React.FC = () => {
  const { toast } = useToast();
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTestType, setSelectedTestType] = useState('');
  const [assignments, setAssignments] = useState<any[]>([]);
  const [classMeta, setClassMeta] = useState<{ branch_id?: number; semester_id?: number; section_id?: number; subject_id?: number } | null>(null);
  
  const testTypes = ['1', '2', '3'];
  
  const [students, setStudents] = useState<InternalMarkStudent[]>([]);

  const [marks, setMarks] = useState<Record<number, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const loadExistingMarks = async (meta: { branch_id: number; semester_id: number; section_id: number; subject_id: number }, testNumber: number) => {
    try {
      const existing = await getInternalMarksForClass(meta.branch_id, meta.semester_id, meta.section_id, meta.subject_id, testNumber);
      if (Array.isArray(existing) && existing.length) {
        // Prefill marks map for matching students by id
        setMarks(prev => {
          const next = { ...prev };
          existing.forEach((s) => {
            next[s.id] = s.mark === '' || s.mark == null ? '' : String(s.mark);
          });
          return next;
        });
        // Ensure students list has max_mark when available
        setStudents(curr => curr.map(s => {
          const match = existing.find(e => e.id === s.id);
          return match ? { ...s, max_mark: match.max_mark } : s;
        }));
      }
    } catch (e) {
      // Silent fail; keep UI unchanged
    }
  };

  useEffect(() => {
    (async () => {
      const res = await getFacultyAssignments();
      if ((res as any).success && (res as any).data) setAssignments((res as any).data);
    })();
  }, []);

  const handleMarksChange = (studentId: number, value: string) => {
    if (value === '' || (Number(value) >= 0 && Number(value) <= 100)) {
      setMarks(prev => ({ ...prev, [studentId]: value }));
    }
  };

  const handleSubmit = async () => {
    if (!selectedSubject || !selectedTestType || !classMeta) {
      toast({
        title: "Error",
        description: "Please fill all required fields.",
        variant: "destructive"
      });
      return;
    }
    const payload = {
      branch_id: String(classMeta.branch_id),
      semester_id: String(classMeta.semester_id),
      section_id: String(classMeta.section_id),
      subject_id: String(classMeta.subject_id),
      test_number: Number(selectedTestType),
      marks: students
        .filter(s => marks[s.id] !== '' && !isNaN(Number(marks[s.id])))
        .map(s => ({ student_id: String(s.id), mark: Number(marks[s.id]) })),
    };
    const res = await uploadInternalMarks(payload);
    if (res.success) {
      toast({ title: 'Success', description: 'Marks uploaded successfully!' });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1800);
    } else {
      toast({ title: 'Error', description: res.message || 'Failed to upload marks', variant: 'destructive' });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "File Upload",
        description: `Processing ${file.name}...`,
      });
    }
  };

  const downloadTemplate = () => {
    toast({
      title: "Download Started",
      description: "CSV template is being downloaded.",
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-4 lg:p-6 max-w-full overflow-hidden">
      {/* Success Animation Overlay */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
        >
          <div className="absolute inset-0 bg-black/30" />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="relative z-10 w-full max-w-sm sm:max-w-md"
          >
            <Card className="shadow-xl">
              <CardContent className="p-6 sm:p-8 flex flex-col items-center text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 0.4 }}
                  className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Marks Submitted</h3>
                <p className="mt-1 text-sm text-gray-600">Your marks have been saved successfully.</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-gray-900">
              Upload Marks
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Enter or upload student marks for assessments
            </p>
          </div>
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
            <CardTitle className="text-lg">Assessment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Semester</label>
                <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Semester" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                      <SelectItem key={sem} value={sem.toString()}>
                        Semester {sem}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Subject</label>
                <Select value={selectedSubject} onValueChange={async (val) => {
                  setSelectedSubject(val);
                  const a = assignments.find(x => x.subject_name === val && String(x.semester) === selectedSemester);
                  if (a) {
                    setClassMeta({ branch_id: a.branch_id, semester_id: a.semester_id, section_id: a.section_id, subject_id: a.subject_id });
                    const list = await getStudentsForClass(a.branch_id, a.semester_id, a.section_id, a.subject_id);
                    setStudents(list.map(s => ({ ...s, mark: '', max_mark: 100 })));
                    setMarks(list.reduce((acc, s) => ({ ...acc, [s.id]: '' }), {}));
                    if (selectedTestType) {
                      await loadExistingMarks({ branch_id: a.branch_id, semester_id: a.semester_id, section_id: a.section_id, subject_id: a.subject_id }, Number(selectedTestType));
                    }
                  }
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {assignments
                      .filter((a) => String(a.semester) === selectedSemester)
                      .map((a) => (
                        <SelectItem key={`${a.subject_id}-${a.section_id}`} value={a.subject_name}>
                          {a.subject_name} • {a.section}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Test Type</label>
                <Select value={selectedTestType} onValueChange={async (val) => {
                  setSelectedTestType(val);
                  if (classMeta) {
                    await loadExistingMarks(classMeta as Required<typeof classMeta>, Number(val));
                  }
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Test Number" />
                  </SelectTrigger>
                  <SelectContent>
                    {testTypes.map(type => (
                      <SelectItem key={type} value={type}>
                        Test {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* CSV Upload Option */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5" />
              CSV Upload
            </CardTitle>
            <CardDescription>
              Upload marks using a CSV file or enter manually below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="csv-upload"
                />
                <label htmlFor="csv-upload">
                  <Button variant="outline" className="w-full sm:w-auto cursor-pointer" asChild>
                    <span className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Upload CSV
                    </span>
                  </Button>
                </label>
              </div>
              <Button variant="outline" onClick={downloadTemplate} className="w-full sm:w-auto">
                <Download className="h-4 w-4 mr-2" />
                Download Template
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Manual Entry Table */}
      {selectedSemester && selectedSubject && selectedTestType && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Enter Marks Manually</CardTitle>
              <CardDescription>
                {selectedTestType} - {selectedSubject} (Semester {selectedSemester})
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px]">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Student Name</th>
                      <th className="text-left p-3 font-medium">USN</th>
                      <th className="text-left p-3 font-medium">Marks (0-100)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, index) => (
                      <motion.tr
                        key={student.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="p-3">{student.name}</td>
                        <td className="p-3 text-gray-600">{student.usn}</td>
                        <td className="p-3">
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            placeholder="Enter marks"
                            value={marks[student.id]}
                            onChange={(e) => handleMarksChange(student.id, e.target.value)}
                            className="w-24"
                          />
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button onClick={handleSubmit} className="flex-1 sm:flex-none">
                  <Save className="h-4 w-4 mr-2" />
                  Submit Marks
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

export default UploadMarksPage;

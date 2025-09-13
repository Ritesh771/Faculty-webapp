
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Save, Filter, Users, BookOpen } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";

const FacultyAssignmentsPage: React.FC = () => {
  const { toast } = useToast();
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [selectedSection, setSelectedSection] = useState('all');

  // Mock data for faculty assignments
  const facultyAssignments = [
    { id: 1, faculty: 'Dr. John Smith', subject: 'Data Structures', semester: 3, section: 'A', room: 'CS-101' },
    { id: 2, faculty: 'Prof. Sarah Johnson', subject: 'Computer Networks', semester: 5, section: 'A', room: 'CS-102' },
    { id: 3, faculty: 'Dr. Mike Wilson', subject: 'Database Systems', semester: 4, section: 'B', room: 'CS-103' },
    { id: 4, faculty: 'Prof. Emily Davis', subject: 'Operating Systems', semester: 4, section: 'A', room: 'CS-104' },
    { id: 5, faculty: 'Dr. Robert Brown', subject: 'Software Engineering', semester: 6, section: 'A', room: 'CS-105' },
  ];

  const facultyList = [
    'Dr. John Smith', 'Prof. Sarah Johnson', 'Dr. Mike Wilson', 
    'Prof. Emily Davis', 'Dr. Robert Brown', 'Dr. Lisa Anderson'
  ];

  const subjectsList = [
    'Data Structures', 'Computer Networks', 'Database Systems', 
    'Operating Systems', 'Software Engineering', 'Algorithms'
  ];

  const handleSaveAssignments = () => {
    toast({
      title: "Assignments Saved",
      description: "Faculty assignments have been successfully updated.",
    });
  };

  const filteredAssignments = facultyAssignments.filter(assignment => {
    if (selectedSemester !== 'all' && assignment.semester.toString() !== selectedSemester) return false;
    if (selectedSection !== 'all' && assignment.section !== selectedSection) return false;
    return true;
  });

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
                Faculty Assignments
              </h1>
              <p className="text-xs sm:text-sm lg:text-base text-gray-600 mt-1">
                Manage faculty-subject mappings and assignments
              </p>
            </div>
            <Button onClick={handleSaveAssignments} className="flex items-center gap-2 w-fit text-xs sm:text-sm">
              <Save className="h-3 w-3 sm:h-4 sm:w-4" />
              Save Changes
            </Button>
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
              <CardDescription className="text-xs sm:text-sm">Filter assignments by semester and section</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Select Semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Semesters</SelectItem>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                      <SelectItem key={sem} value={sem.toString()}>Semester {sem}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedSection} onValueChange={setSelectedSection}>
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Select Section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sections</SelectItem>
                    <SelectItem value="A">Section A</SelectItem>
                    <SelectItem value="B">Section B</SelectItem>
                    <SelectItem value="C">Section C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Faculty Assignments Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                Faculty-Subject Mapping
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Assign faculty members to subjects for different semesters and sections
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="w-full">
                <div className="min-w-[700px]">
                  {/* Table Header */}
                  <div className="grid grid-cols-6 gap-4 p-3 sm:p-4 bg-gray-50 border-b font-medium text-xs sm:text-sm text-gray-700">
                    <div>Faculty</div>
                    <div>Subject</div>
                    <div>Semester</div>
                    <div>Section</div>
                    <div>Room</div>
                    <div>Actions</div>
                  </div>

                  {/* Table Body */}
                  <div className="max-h-96 overflow-y-auto">
                    {filteredAssignments.map((assignment, index) => (
                      <motion.div
                        key={assignment.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="grid grid-cols-6 gap-4 p-3 sm:p-4 border-b hover:bg-gray-50 transition-colors"
                      >
                        <div>
                          <Select defaultValue={assignment.faculty}>
                            <SelectTrigger className="w-full text-xs sm:text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {facultyList.map(faculty => (
                                <SelectItem key={faculty} value={faculty} className="text-xs sm:text-sm">
                                  {faculty}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Select defaultValue={assignment.subject}>
                            <SelectTrigger className="w-full text-xs sm:text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {subjectsList.map(subject => (
                                <SelectItem key={subject} value={subject} className="text-xs sm:text-sm">
                                  {subject}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center font-medium text-xs sm:text-sm">
                          Sem {assignment.semester}
                        </div>
                        <div>
                          <Select defaultValue={assignment.section}>
                            <SelectTrigger className="w-full text-xs sm:text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="A">Section A</SelectItem>
                              <SelectItem value="B">Section B</SelectItem>
                              <SelectItem value="C">Section C</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center text-gray-600 text-xs sm:text-sm">
                          {assignment.room}
                        </div>
                        <div>
                          <Button size="sm" variant="outline" className="text-xs">
                            Update
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </ScrollArea>
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
                  <p className="text-xs sm:text-sm text-gray-600 truncate">Total Assignments</p>
                  <p className="text-lg sm:text-2xl font-bold text-blue-600">
                    {filteredAssignments.length}
                  </p>
                </div>
                <div className="h-8 w-8 sm:h-12 sm:w-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-gray-600 truncate">Faculty Members</p>
                  <p className="text-lg sm:text-2xl font-bold text-green-600">
                    {new Set(filteredAssignments.map(a => a.faculty)).size}
                  </p>
                </div>
                <div className="h-8 w-8 sm:h-12 sm:w-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-gray-600 truncate">Active Subjects</p>
                  <p className="text-lg sm:text-2xl font-bold text-purple-600">
                    {new Set(filteredAssignments.map(a => a.subject)).size}
                  </p>
                </div>
                <div className="h-8 w-8 sm:h-12 sm:w-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="h-4 w-4 sm:h-6 sm:w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default FacultyAssignmentsPage;

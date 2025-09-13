
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Building, GraduationCap, BookOpen, Users } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";

const AcademicStructurePage: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for academic structure
  const departments = [
    {
      id: 1,
      name: 'Computer Science & Engineering',
      code: 'CSE',
      hod: 'Dr. John Smith',
      faculty: 15,
      students: 240,
      semesters: 8,
      sections: ['A', 'B', 'C']
    },
    {
      id: 2,
      name: 'Electronics & Communication',
      code: 'ECE',
      hod: 'Prof. Sarah Johnson',
      faculty: 12,
      students: 180,
      semesters: 8,
      sections: ['A', 'B']
    },
    {
      id: 3,
      name: 'Mechanical Engineering',
      code: 'ME',
      hod: 'Dr. Mike Wilson',
      faculty: 10,
      students: 160,
      semesters: 8,
      sections: ['A', 'B']
    },
    {
      id: 4,
      name: 'Civil Engineering',
      code: 'CE',
      hod: 'Prof. Emily Davis',
      faculty: 8,
      students: 120,
      semesters: 8,
      sections: ['A']
    }
  ];

  const subjects = [
    { id: 1, name: 'Data Structures', code: 'CS301', department: 'CSE', semester: 3, credits: 4 },
    { id: 2, name: 'Computer Networks', code: 'CS501', department: 'CSE', semester: 5, credits: 3 },
    { id: 3, name: 'Digital Electronics', code: 'EC201', department: 'ECE', semester: 2, credits: 4 },
    { id: 4, name: 'Thermodynamics', code: 'ME301', department: 'ME', semester: 3, credits: 3 },
  ];

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDepartment = () => {
    toast({
      title: "Add Department",
      description: "Department creation form would open here.",
    });
  };

  const handleEditDepartment = (deptName: string) => {
    toast({
      title: "Edit Department",
      description: `Editing ${deptName} department.`,
    });
  };

  const handleDeleteDepartment = (deptName: string) => {
    toast({
      title: "Delete Department",
      description: `${deptName} department deleted.`,
      variant: "destructive"
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
                Academic Structure
              </h1>
              <p className="text-xs sm:text-sm lg:text-base text-gray-600 mt-1">
                Manage departments, subjects, and academic hierarchy
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <Input
                placeholder="Search departments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-xs text-sm"
              />
              <Button onClick={handleAddDepartment} className="flex items-center gap-2 w-fit text-xs sm:text-sm">
                <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                Add Department
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Summary Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-gray-600 truncate">Total Departments</p>
                  <p className="text-lg sm:text-2xl font-bold text-blue-600">{departments.length}</p>
                </div>
                <div className="h-8 w-8 sm:h-12 sm:w-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Building className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-gray-600 truncate">Total Faculty</p>
                  <p className="text-lg sm:text-2xl font-bold text-green-600">
                    {departments.reduce((sum, dept) => sum + dept.faculty, 0)}
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
                  <p className="text-xs sm:text-sm text-gray-600 truncate">Total Students</p>
                  <p className="text-lg sm:text-2xl font-bold text-purple-600">
                    {departments.reduce((sum, dept) => sum + dept.students, 0)}
                  </p>
                </div>
                <div className="h-8 w-8 sm:h-12 sm:w-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="h-4 w-4 sm:h-6 sm:w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-gray-600 truncate">Active Subjects</p>
                  <p className="text-lg sm:text-2xl font-bold text-orange-600">{subjects.length}</p>
                </div>
                <div className="h-8 w-8 sm:h-12 sm:w-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="h-4 w-4 sm:h-6 sm:w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Departments Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6"
        >
          {filteredDepartments.map((department, index) => (
            <motion.div
              key={department.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-base sm:text-lg truncate">{department.name}</CardTitle>
                      <CardDescription className="text-xs sm:text-sm">
                        Department Code: {department.code}
                      </CardDescription>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEditDepartment(department.name)}
                        className="text-xs"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDeleteDepartment(department.name)}
                        className="text-xs"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {/* HOD Info */}
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">Head of Department</p>
                      <p className="font-medium text-sm truncate">{department.hod}</p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs sm:text-sm text-gray-600">Faculty</p>
                        <p className="text-lg sm:text-xl font-bold text-blue-600">{department.faculty}</p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-600">Students</p>
                        <p className="text-lg sm:text-xl font-bold text-green-600">{department.students}</p>
                      </div>
                    </div>

                    {/* Sections */}
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-2">Sections</p>
                      <div className="flex flex-wrap gap-1">
                        {department.sections.map(section => (
                          <Badge key={section} variant="outline" className="text-xs">
                            Section {section}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Semesters */}
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">Semesters</p>
                      <p className="font-medium text-sm">{department.semesters} Semesters</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Subjects Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Subjects Overview</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                All subjects across departments
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="w-full">
                <div className="min-w-[600px]">
                  {/* Table Header */}
                  <div className="grid grid-cols-6 gap-4 p-3 sm:p-4 bg-gray-50 border-b font-medium text-xs sm:text-sm text-gray-700">
                    <div>Subject Name</div>
                    <div>Subject Code</div>
                    <div>Department</div>
                    <div>Semester</div>
                    <div>Credits</div>
                    <div>Actions</div>
                  </div>

                  {/* Table Body */}
                  <div className="max-h-64 overflow-y-auto">
                    {subjects.map((subject, index) => (
                      <motion.div
                        key={subject.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="grid grid-cols-6 gap-4 p-3 sm:p-4 border-b hover:bg-gray-50 transition-colors"
                      >
                        <div className="font-medium text-gray-900 text-xs sm:text-sm truncate">{subject.name}</div>
                        <div className="text-gray-600 text-xs sm:text-sm">{subject.code}</div>
                        <div className="text-gray-700 text-xs sm:text-sm">{subject.department}</div>
                        <div className="text-gray-600 text-xs sm:text-sm">Sem {subject.semester}</div>
                        <div className="text-gray-600 text-xs sm:text-sm">{subject.credits}</div>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" className="text-xs">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs">
                            <Trash2 className="h-3 w-3" />
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
      </div>
    </div>
  );
};

export default AcademicStructurePage;

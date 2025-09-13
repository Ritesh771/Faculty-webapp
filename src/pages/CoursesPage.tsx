
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/context/AuthContext';

// Mock data for courses
const mockCourses = [
  { 
    id: "CS101", 
    name: "Introduction to Computer Science", 
    department: "Computer Science",
    credits: 4,
    instructor: "Dr. Sarah Johnson",
    enrolled: 45,
    capacity: 60,
    status: "active"
  },
  { 
    id: "CS301", 
    name: "Database Systems", 
    department: "Computer Science",
    credits: 3,
    instructor: "Dr. Michael Chen",
    enrolled: 38,
    capacity: 40,
    status: "active"
  },
  { 
    id: "CS401", 
    name: "Artificial Intelligence", 
    department: "Computer Science",
    credits: 4,
    instructor: "Dr. Emily Rodriguez",
    enrolled: 32,
    capacity: 35,
    status: "active"
  },
  { 
    id: "MATH201", 
    name: "Calculus II", 
    department: "Mathematics",
    credits: 4,
    instructor: "Prof. James Wilson",
    enrolled: 56,
    capacity: 60,
    status: "active"
  },
  { 
    id: "PHYS101", 
    name: "Physics for Scientists and Engineers", 
    department: "Physics",
    credits: 4,
    instructor: "Dr. Robert Lee",
    enrolled: 42,
    capacity: 50,
    status: "active"
  },
  { 
    id: "BIO240", 
    name: "Genetics", 
    department: "Biology",
    credits: 3,
    instructor: "Dr. Amanda White",
    enrolled: 28,
    capacity: 30,
    status: "active"
  },
  { 
    id: "CHEM110", 
    name: "General Chemistry", 
    department: "Chemistry",
    credits: 4,
    instructor: "Prof. Daniel Brown",
    enrolled: 38,
    capacity: 45,
    status: "active"
  },
  { 
    id: "ENG205", 
    name: "Creative Writing", 
    department: "English",
    credits: 3,
    instructor: "Prof. Lisa Taylor",
    enrolled: 22,
    capacity: 25,
    status: "active"
  },
  { 
    id: "HIST150", 
    name: "World History", 
    department: "History",
    credits: 3,
    instructor: "Dr. Thomas Garcia",
    enrolled: 34,
    capacity: 40,
    status: "active"
  },
  { 
    id: "PSYC101", 
    name: "Introduction to Psychology", 
    department: "Psychology",
    credits: 3,
    instructor: "Dr. Sarah Miller",
    enrolled: 58,
    capacity: 60,
    status: "active"
  }
];

const CoursesPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const isAdmin = user?.role === 'admin';
  const isHOD = user?.role === 'hod';
  const isFaculty = user?.role === 'faculty';

  const filteredCourses = mockCourses.filter(course =>
    course.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Courses</h1>
          <p className="text-muted-foreground">
            Browse and manage course offerings at NeuroCampus.
          </p>
        </div>
        {(isAdmin || isHOD) && (
          <Button className="mt-2 md:mt-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Course
          </Button>
        )}
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <CardTitle>Course Catalog</CardTitle>
            <div className="relative w-full md:w-64 mt-2 md:mt-0">
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-8"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Course Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Instructor</TableHead>
                  <TableHead>Credits</TableHead>
                  <TableHead>Enrollment</TableHead>
                  <TableHead>Status</TableHead>
                  {(isAdmin || isHOD || isFaculty) && <TableHead>Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.id}</TableCell>
                      <TableCell>{course.name}</TableCell>
                      <TableCell>{course.department}</TableCell>
                      <TableCell>{course.instructor}</TableCell>
                      <TableCell>{course.credits}</TableCell>
                      <TableCell>
                        {course.enrolled}/{course.capacity}
                        <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                          <div 
                            className={`h-full rounded-full ${
                              (course.enrolled / course.capacity) > 0.9 
                                ? 'bg-red-500'
                                : (course.enrolled / course.capacity) > 0.7 
                                ? 'bg-yellow-500' 
                                : 'bg-green-500'
                            }`} 
                            style={{width: `${(course.enrolled / course.capacity) * 100}%`}}
                          ></div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {course.status === 'active' ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      {(isAdmin || isHOD || isFaculty) && (
                        <TableCell className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </Button>
                          {(isAdmin || isHOD) && (
                            <Button variant="ghost" size="sm" className="text-red-500">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </Button>
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={(isAdmin || isHOD || isFaculty) ? 8 : 7} className="text-center py-10 text-muted-foreground">
                      No courses found matching your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row items-center justify-between py-4">
          <p className="text-sm text-muted-foreground mb-2 sm:mb-0">Showing {filteredCourses.length} of {mockCourses.length} courses</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CoursesPage;

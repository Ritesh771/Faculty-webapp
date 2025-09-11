
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/context/AuthContext';

// Mock data for grades
const studentGrades = [
  {
    semester: "Fall 2024",
    courses: [
      { id: 1, code: "CS101", name: "Introduction to Programming", credits: 4, internalMarks: 38, externalMarks: 75, totalMarks: 113, grade: "A", gradePoint: 9 },
      { id: 2, code: "CS102", name: "Data Structures", credits: 4, internalMarks: 42, externalMarks: 80, totalMarks: 122, grade: "A+", gradePoint: 10 },
      { id: 3, code: "MATH201", name: "Discrete Mathematics", credits: 3, internalMarks: 35, externalMarks: 68, totalMarks: 103, grade: "B+", gradePoint: 8 },
      { id: 4, code: "PHY101", name: "Engineering Physics", credits: 3, internalMarks: 30, externalMarks: 60, totalMarks: 90, grade: "B", gradePoint: 7 },
      { id: 5, code: "ENG101", name: "Technical Communication", credits: 2, internalMarks: 40, externalMarks: 78, totalMarks: 118, grade: "A", gradePoint: 9 },
    ],
    sgpa: 8.69,
    cgpa: 8.69
  },
  {
    semester: "Spring 2025",
    courses: [
      { id: 6, code: "CS201", name: "Object-Oriented Programming", credits: 4, internalMarks: 43, externalMarks: 82, totalMarks: 125, grade: "A+", gradePoint: 10 },
      { id: 7, code: "CS202", name: "Algorithms", credits: 4, internalMarks: 40, externalMarks: 78, totalMarks: 118, grade: "A", gradePoint: 9 },
      { id: 8, code: "MATH202", name: "Probability & Statistics", credits: 3, internalMarks: 36, externalMarks: 72, totalMarks: 108, grade: "A-", gradePoint: 8.5 },
      { id: 9, code: "CS203", name: "Database Management Systems", credits: 3, internalMarks: 38, externalMarks: 75, totalMarks: 113, grade: "A", gradePoint: 9 },
      { id: 10, code: "SOFT201", name: "Software Engineering", credits: 2, internalMarks: 41, externalMarks: 80, totalMarks: 121, grade: "A+", gradePoint: 10 },
    ],
    sgpa: 9.31,
    cgpa: 9.00
  },
  {
    semester: "Fall 2025",
    current: true,
    courses: [
      { id: 11, code: "CS301", name: "Operating Systems", credits: 4, internalMarks: 40, externalMarks: null, totalMarks: null, grade: "-", gradePoint: null },
      { id: 12, code: "CS302", name: "Computer Networks", credits: 4, internalMarks: 38, externalMarks: null, totalMarks: null, grade: "-", gradePoint: null },
      { id: 13, code: "CS303", name: "Web Development", credits: 3, internalMarks: 43, externalMarks: null, totalMarks: null, grade: "-", gradePoint: null },
      { id: 14, code: "CS304", name: "Artificial Intelligence", credits: 3, internalMarks: 37, externalMarks: null, totalMarks: null, grade: "-", gradePoint: null },
      { id: 15, code: "MGMT301", name: "Engineering Economics", credits: 2, internalMarks: 35, externalMarks: null, totalMarks: null, grade: "-", gradePoint: null },
    ],
    sgpa: null,
    cgpa: 9.00
  }
];

// For faculty view
const classGrades = {
  courseCode: "CS101",
  courseName: "Introduction to Programming",
  semester: "Fall 2025",
  students: [
    { id: 1, regNo: "CS2023001", name: "Arun Kumar", internalMarks: 38, midtermMarks: 24, assignmentMarks: 18, attendanceMarks: 8, totalInternal: 88, grade: "A" },
    { id: 2, regNo: "CS2023002", name: "Priya Sharma", internalMarks: 42, midtermMarks: 27, assignmentMarks: 19, attendanceMarks: 10, totalInternal: 98, grade: "A+" },
    { id: 3, regNo: "CS2023003", name: "Rajesh Singh", internalMarks: 35, midtermMarks: 22, assignmentMarks: 16, attendanceMarks: 7, totalInternal: 80, grade: "B+" },
    { id: 4, regNo: "CS2023004", name: "Nisha Patel", internalMarks: 40, midtermMarks: 25, assignmentMarks: 18, attendanceMarks: 9, totalInternal: 92, grade: "A" },
    { id: 5, regNo: "CS2023005", name: "Vikram Desai", internalMarks: 30, midtermMarks: 19, assignmentMarks: 14, attendanceMarks: 6, totalInternal: 69, grade: "C+" },
    { id: 6, regNo: "CS2023006", name: "Anjali Gupta", internalMarks: 37, midtermMarks: 23, assignmentMarks: 17, attendanceMarks: 8, totalInternal: 85, grade: "B+" },
    { id: 7, regNo: "CS2023007", name: "Rahul Mishra", internalMarks: 41, midtermMarks: 26, assignmentMarks: 18, attendanceMarks: 9, totalInternal: 94, grade: "A" },
    { id: 8, regNo: "CS2023008", name: "Sneha Verma", internalMarks: 36, midtermMarks: 23, assignmentMarks: 17, attendanceMarks: 8, totalInternal: 84, grade: "B+" },
    { id: 9, regNo: "CS2023009", name: "Karthik Nair", internalMarks: 39, midtermMarks: 24, assignmentMarks: 18, attendanceMarks: 9, totalInternal: 90, grade: "A-" },
    { id: 10, regNo: "CS2023010", name: "Divya Reddy", internalMarks: 33, midtermMarks: 21, assignmentMarks: 15, attendanceMarks: 7, totalInternal: 76, grade: "B" },
  ],
  distribution: {
    'A+': 1,
    'A': 3,
    'A-': 1,
    'B+': 3,
    'B': 1,
    'C+': 1,
    'C': 0,
    'D': 0,
    'F': 0
  }
};

// Mock courses for faculty
const facultyCourses = [
  { id: 1, code: "CS101", name: "Introduction to Programming", section: "A", students: 42, semester: "Fall 2025" },
  { id: 2, code: "CS201", name: "Object-Oriented Programming", section: "B", students: 38, semester: "Fall 2025" },
  { id: 3, code: "CS303", name: "Web Development", section: "A", students: 45, semester: "Fall 2025" }
];

const GradesPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState(facultyCourses[0]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter students based on search (for faculty view)
  const filteredStudents = classGrades.students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.regNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isStudent = user?.role === 'student';
  const isFaculty = user?.role === 'faculty' || user?.role === 'hod' || user?.role === 'admin';

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          {isStudent ? "My Grades & Performance" : "Student Grades Management"}
        </h1>
        {isFaculty && (
          <div className="mt-2 md:mt-0">
            <div className="relative">
              <select 
                className="w-full md:w-64 rounded-md border border-gray-300 py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-primary"
                value={selectedCourse.id}
                onChange={(e) => {
                  const selected = facultyCourses.find(c => c.id === parseInt(e.target.value));
                  if (selected) setSelectedCourse(selected);
                }}
              >
                {facultyCourses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.code}: {course.name} ({course.section})
                  </option>
                ))}
              </select>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {isStudent && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Current CGPA</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">9.00</div>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  <span>+0.31 from last semester</span>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Last Semester SGPA</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">9.31</div>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  <span>+0.62 from previous semester</span>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Credits Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">36</div>
                <p className="text-xs text-muted-foreground mt-1">Out of 160 required credits</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="semesters" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="semesters">Semester Grades</TabsTrigger>
              <TabsTrigger value="transcript">Transcript</TabsTrigger>
              <TabsTrigger value="progress">Progress Report</TabsTrigger>
            </TabsList>

            <TabsContent value="semesters" className="space-y-6">
              {studentGrades.map((semester, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>{semester.semester}</CardTitle>
                        <CardDescription>
                          {semester.current ? 'Current Semester' : `SGPA: ${semester.sgpa} | CGPA: ${semester.cgpa}`}
                        </CardDescription>
                      </div>
                      {semester.current && (
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                          In Progress
                        </span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Course Code</TableHead>
                            <TableHead>Course Name</TableHead>
                            <TableHead className="text-center">Credits</TableHead>
                            <TableHead className="text-center">Internal</TableHead>
                            <TableHead className="text-center">External</TableHead>
                            <TableHead className="text-center">Total</TableHead>
                            <TableHead className="text-center">Grade</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {semester.courses.map((course) => (
                            <TableRow key={course.id}>
                              <TableCell className="font-medium">{course.code}</TableCell>
                              <TableCell>{course.name}</TableCell>
                              <TableCell className="text-center">{course.credits}</TableCell>
                              <TableCell className="text-center">{course.internalMarks !== null ? course.internalMarks : '-'}</TableCell>
                              <TableCell className="text-center">{course.externalMarks !== null ? course.externalMarks : '-'}</TableCell>
                              <TableCell className="text-center">{course.totalMarks !== null ? course.totalMarks : '-'}</TableCell>
                              <TableCell className="text-center">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  course.grade === 'A+' || course.grade === 'A' ? 'bg-green-100 text-green-700' :
                                  course.grade === 'A-' || course.grade === 'B+' ? 'bg-blue-100 text-blue-700' :
                                  course.grade === 'B' || course.grade === 'B-' ? 'bg-blue-50 text-blue-600' :
                                  course.grade === 'C+' || course.grade === 'C' ? 'bg-yellow-100 text-yellow-700' :
                                  course.grade === 'D' ? 'bg-orange-100 text-orange-700' :
                                  course.grade === 'F' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                                }`}>
                                  {course.grade}
                                </span>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4 flex justify-between">
                    {!semester.current && (
                      <Button variant="outline" size="sm">Download Grade Sheet</Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="transcript" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Official Transcript</CardTitle>
                  <CardDescription>
                    Your complete academic record at NeuroCampus
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-200">
                    <div className="text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="mt-4 text-sm text-gray-600">Your transcript preview will appear here</p>
                      <p className="mt-2 text-xs text-gray-500">Request an official transcript to view</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <div className="w-full flex flex-col sm:flex-row gap-4 justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Official transcripts are available for all completed semesters.</p>
                      <p className="text-xs text-muted-foreground mt-1">Processing time: 2-3 business days</p>
                    </div>
                    <Button>Request Official Transcript</Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="progress" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Academic Progress</CardTitle>
                  <CardDescription>
                    Track your progress toward graduation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Credit Completion</span>
                        <span className="text-sm">36/160</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-primary rounded-full h-2" style={{ width: '22.5%' }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">22.5% completed - on track for graduation in Spring 2029</p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Core Courses</span>
                        <span className="text-sm">6/24</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-primary rounded-full h-2" style={{ width: '25%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Electives</span>
                        <span className="text-sm">2/12</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-primary rounded-full h-2" style={{ width: '16.7%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Academic Standing</CardTitle>
                  <CardDescription>
                    Your current academic status and achievements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="text-sm font-medium mb-2">Academic Status</h3>
                      <div className="flex items-center">
                        <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                        <span>Good Standing</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">Maintaining required GPA threshold of 7.0</p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="text-sm font-medium mb-2">Honors Status</h3>
                      <div className="flex items-center">
                        <div className="w-4 h-4 rounded-full bg-amber-500 mr-2"></div>
                        <span>Dean's List</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">Achieved Dean's List for 2 consecutive semesters</p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="text-sm font-medium mb-2">Scholarship Status</h3>
                      <div className="flex items-center">
                        <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                        <span>Active</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">Merit Scholarship - 25% Tuition Waiver</p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="text-sm font-medium mb-2">Graduation Projection</h3>
                      <div className="flex items-center">
                        <span className="font-medium">Spring 2029</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">On track for graduation with current course load</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}

      {isFaculty && (
        <>
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>{classGrades.courseCode}: {classGrades.courseName}</CardTitle>
                  <CardDescription>
                    {classGrades.semester} • Section {selectedCourse.section} • {selectedCourse.students} Students
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search students..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full md:w-64 rounded-md border border-gray-300 py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <Button>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Grades
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Reg Number</TableHead>
                      <TableHead>Student Name</TableHead>
                      <TableHead className="text-center">Internal (50)</TableHead>
                      <TableHead className="text-center">Midterm (30)</TableHead>
                      <TableHead className="text-center">Assignment (20)</TableHead>
                      <TableHead className="text-center">Attendance (10)</TableHead>
                      <TableHead className="text-center">Total (100)</TableHead>
                      <TableHead className="text-center">Grade</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.regNo}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell className="text-center">{student.internalMarks}</TableCell>
                        <TableCell className="text-center">{student.midtermMarks}</TableCell>
                        <TableCell className="text-center">{student.assignmentMarks}</TableCell>
                        <TableCell className="text-center">{student.attendanceMarks}</TableCell>
                        <TableCell className="text-center font-medium">{student.totalInternal}</TableCell>
                        <TableCell className="text-center">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            student.grade === 'A+' || student.grade === 'A' ? 'bg-green-100 text-green-700' :
                            student.grade === 'A-' || student.grade === 'B+' ? 'bg-blue-100 text-blue-700' :
                            student.grade === 'B' || student.grade === 'B-' ? 'bg-blue-50 text-blue-600' :
                            student.grade === 'C+' || student.grade === 'C' ? 'bg-yellow-100 text-yellow-700' :
                            student.grade === 'D' ? 'bg-orange-100 text-orange-700' :
                            student.grade === 'F' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {student.grade}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <p className="text-sm text-muted-foreground">Last updated: May 2, 2025, 3:45 PM</p>
              <div className="flex gap-2">
                <Button variant="outline">Import Grades</Button>
                <Button variant="outline">Export Grades</Button>
                <Button>Publish Grades</Button>
              </div>
            </CardFooter>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
                <CardDescription>
                  Distribution of grades for {classGrades.courseCode}: {classGrades.courseName}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-200">
                  <div className="text-center">
                    <p className="text-gray-500">Grade distribution chart will appear here</p>
                    <p className="text-xs text-gray-400 mt-1">Visualization shows the number of students in each grade range</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Grade Summary</CardTitle>
                <CardDescription>
                  Class performance overview
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Class Average</span>
                      <span className="font-medium">85.6%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary rounded-full h-2" style={{ width: '85.6%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Highest Score</span>
                      <span className="font-medium">98%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 rounded-full h-2" style={{ width: '98%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Lowest Score</span>
                      <span className="font-medium">69%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-amber-500 rounded-full h-2" style={{ width: '69%' }}></div>
                    </div>
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <h4 className="text-sm font-medium mb-2">Grade Count</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(classGrades.distribution).map(([grade, count]) => (
                        <div key={grade} className="flex justify-between items-center text-sm">
                          <span className={`px-2 py-0.5 rounded-full text-xs ${
                            grade === 'A+' || grade === 'A' ? 'bg-green-100 text-green-700' :
                            grade === 'A-' || grade === 'B+' ? 'bg-blue-100 text-blue-700' :
                            grade === 'B' || grade === 'B-' ? 'bg-blue-50 text-blue-600' :
                            grade === 'C+' || grade === 'C' ? 'bg-yellow-100 text-yellow-700' :
                            grade === 'D' ? 'bg-orange-100 text-orange-700' :
                            grade === 'F' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {grade}
                          </span>
                          <span>{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default GradesPage;

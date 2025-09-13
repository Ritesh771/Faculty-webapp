import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from 'framer-motion';

interface Student {
  id: string;
  name: string;
  email: string;
  image: string;
  department: string;
  semester: string;
  status: "active" | "inactive" | "pending";
  progress: number;
}

const studentsData: Student[] = [
  {
    id: "ST2023001",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    image: "/placeholder.svg",
    department: "Computer Science",
    semester: "Fall 2023",
    status: "active",
    progress: 75,
  },
  {
    id: "ST2023015",
    name: "Maya Patel",
    email: "maya.patel@example.com",
    image: "/placeholder.svg",
    department: "Electrical Eng.",
    semester: "Spring 2024",
    status: "active",
    progress: 92,
  },
  {
    id: "ST2023042",
    name: "Ryan Chen",
    email: "ryan.chen@example.com",
    image: "/placeholder.svg",
    department: "Mechanical Eng.",
    semester: "Fall 2023",
    status: "inactive",
    progress: 34,
  },
  {
    id: "ST2023021",
    name: "Sarah Kim",
    email: "sarah.kim@example.com",
    image: "/placeholder.svg",
    department: "Civil Eng.",
    semester: "Spring 2024",
    status: "pending",
    progress: 50,
  },
  {
    id: "ST2023033",
    name: "David Lee",
    email: "david.lee@example.com",
    image: "/placeholder.svg",
    department: "Information Tech.",
    semester: "Fall 2023",
    status: "active",
    progress: 88,
  },
  {
    id: "ST2023008",
    name: "Emily Wilson",
    email: "emily.wilson@example.com",
    image: "/placeholder.svg",
    department: "Computer Science",
    semester: "Spring 2024",
    status: "active",
    progress: 60,
  },
  {
    id: "ST2023019",
    name: "Kevin Brown",
    email: "kevin.brown@example.com",
    image: "/placeholder.svg",
    department: "Electrical Eng.",
    semester: "Fall 2023",
    status: "inactive",
    progress: 20,
  },
  {
    id: "ST2023051",
    name: "Linda Nguyen",
    email: "linda.nguyen@example.com",
    image: "/placeholder.svg",
    department: "Mechanical Eng.",
    semester: "Spring 2024",
    status: "pending",
    progress: 40,
  },
];

const departments = ["All Departments", "Computer Science", "Electrical Eng.", "Mechanical Eng.", "Civil Eng.", "Information Tech."];
const semesters = ["All Semesters", "Fall 2023", "Spring 2024"];
const statuses = ["All", "active", "inactive", "pending"];

const StudentsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [selectedSemester, setSelectedSemester] = useState("All Semesters");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const filteredStudents = studentsData.filter((student) => {
    const searchMatch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        student.id.toLowerCase().includes(searchQuery.toLowerCase());
    const departmentMatch = selectedDepartment === "All Departments" || student.department === selectedDepartment;
    const semesterMatch = selectedSemester === "All Semesters" || student.semester === selectedSemester;
    const statusMatch = selectedStatus === "All" || student.status === selectedStatus;

    return searchMatch && departmentMatch && semesterMatch && statusMatch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Student Management</h1>
        <Button>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add New Student
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student Directory</CardTitle>
          <CardDescription>
            View and manage all students enrolled in your institution
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative w-full sm:max-w-xs">
                  <Input
                    type="search"
                    placeholder="Search students..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-8"
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute top-3 right-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Select
                    value={selectedDepartment}
                    onValueChange={setSelectedDepartment}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Departments" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  
                  <Select
                    value={selectedSemester}
                    onValueChange={setSelectedSemester}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Semesters" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {semesters.map((semester) => (
                          <SelectItem key={semester} value={semester}>{semester}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  
                  <Select
                    value={selectedStatus}
                    onValueChange={setSelectedStatus}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {statuses.map((status) => (
                          <SelectItem key={status} value={status}>{status}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    className="h-9 w-9"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    className="h-9 w-9"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>

            {viewMode === "grid" ? (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredStudents.map((student) => (
                  <motion.div key={student.id} className="edu-card" variants={itemVariants}>
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={student.image} alt={student.name} />
                      <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="mt-3 space-y-1">
                      <p className="font-semibold">{student.name}</p>
                      <p className="text-sm text-gray-500">{student.department}</p>
                    </div>
                    <Badge variant="secondary" className="mt-2">{student.status}</Badge>
                    <div className="mt-3">
                      <Progress value={student.progress} />
                      <p className="text-xs text-gray-500 mt-1">Progress: {student.progress}%</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                className="space-y-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredStudents.map((student) => (
                  <motion.div key={student.id} className="flex items-center justify-between p-4 border rounded-lg" variants={itemVariants}>
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={student.image} alt={student.name} />
                        <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{student.name}</p>
                        <p className="text-sm text-gray-500">{student.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">{student.status}</Badge>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t px-6 py-4">
          <div className="text-sm text-gray-500">
            Showing {filteredStudents.length} of {studentsData.length} students
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StudentsPage;

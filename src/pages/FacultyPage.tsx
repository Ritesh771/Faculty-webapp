
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { motion } from 'framer-motion';

interface Faculty {
  id: string;
  name: string;
  title: string;
  department: string;
  email: string;
  avatar: string;
  courses: number;
  students: number;
}

const facultyData: Faculty[] = [
  {
    id: "FAC001",
    name: "Dr. Sarah Johnson",
    title: "Professor of Computer Science",
    department: "Computer Science",
    email: "sarah.johnson@example.com",
    avatar: "/placeholder.svg",
    courses: 4,
    students: 120,
  },
  {
    id: "FAC002",
    name: "Prof. Michael Chen",
    title: "Associate Professor of Engineering",
    department: "Electrical Engineering",
    email: "michael.chen@example.com",
    avatar: "/placeholder.svg",
    courses: 3,
    students: 95,
  },
  {
    id: "FAC003",
    name: "Dr. Emily Rodriguez",
    title: "Assistant Professor of Biology",
    department: "Biology",
    email: "emily.rodriguez@example.com",
    avatar: "/placeholder.svg",
    courses: 5,
    students: 150,
  },
  {
    id: "FAC004",
    name: "Prof. David Kim",
    title: "Lecturer in Mathematics",
    department: "Mathematics",
    email: "david.kim@example.com",
    avatar: "/placeholder.svg",
    courses: 3,
    students: 80,
  },
  {
    id: "FAC005",
    name: "Dr. Aisha Khan",
    title: "Professor of Physics",
    department: "Physics",
    email: "aisha.khan@example.com",
    avatar: "/placeholder.svg",
    courses: 4,
    students: 110,
  },
  {
    id: "FAC006",
    name: "Prof. James Wilson",
    title: "Associate Professor of Chemistry",
    department: "Chemistry",
    email: "james.wilson@example.com",
    avatar: "/placeholder.svg",
    courses: 3,
    students: 100,
  },
  {
    id: "FAC007",
    name: "Dr. Maria Garcia",
    title: "Assistant Professor of History",
    department: "History",
    email: "maria.garcia@example.com",
    avatar: "/placeholder.svg",
    courses: 5,
    students: 130,
  },
  {
    id: "FAC008",
    name: "Prof. Robert Brown",
    title: "Lecturer in English",
    department: "English",
    email: "robert.brown@example.com",
    avatar: "/placeholder.svg",
    courses: 3,
    students: 90,
  },
];

const departments = [
  "All Departments",
  "Computer Science",
  "Electrical Engineering",
  "Biology",
  "Mathematics",
  "Physics",
  "Chemistry",
  "History",
  "English",
];

const FacultyPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredFaculty = facultyData.filter((faculty) => {
    const searchMatch =
      faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faculty.email.toLowerCase().includes(searchQuery.toLowerCase());
    const departmentMatch =
      selectedDepartment === "All Departments" ||
      faculty.department === selectedDepartment;
    return searchMatch && departmentMatch;
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
        <h1 className="text-2xl font-bold tracking-tight">Faculty Management</h1>
        <Button>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add New Faculty
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Faculty Directory</CardTitle>
          <CardDescription>
            View and manage all faculty members across departments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex flex-1 flex-col sm:flex-row gap-4">
                <div className="relative w-full sm:max-w-xs">
                  <Input
                    type="search"
                    placeholder="Search faculty..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-8"
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute top-3 right-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                
                <div className="w-full sm:max-w-xs">
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
                </div>
              </div>

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

            {viewMode === "grid" ? (
              <motion.div
                className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredFaculty.map((faculty) => (
                  <motion.div
                    key={faculty.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-300"
                    variants={itemVariants}
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={faculty.avatar} alt={faculty.name} />
                        <AvatarFallback>{faculty.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-medium">{faculty.name}</h3>
                        <p className="text-sm text-gray-500">{faculty.title}</p>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <p className="text-sm">
                        <span className="font-medium">Department:</span> {faculty.department}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Email:</span> {faculty.email}
                      </p>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">Courses: {faculty.courses}</Badge>
                        <Badge variant="outline">Students: {faculty.students}</Badge>
                      </div>
                    </div>
                    <Button variant="ghost" className="w-full mt-4">
                      View Details
                    </Button>
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
                {filteredFaculty.map((faculty) => (
                  <motion.div
                    key={faculty.id}
                    className="flex items-center justify-between border rounded-lg p-4 hover:shadow-sm transition-shadow duration-300"
                    variants={itemVariants}
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={faculty.avatar} alt={faculty.name} />
                        <AvatarFallback>{faculty.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-medium">{faculty.name}</h3>
                        <p className="text-sm text-gray-500">{faculty.title}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">Courses: {faculty.courses}</Badge>
                      <Badge variant="outline">Students: {faculty.students}</Badge>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t px-6 py-4">
          <div className="text-sm text-gray-500">
            Showing {filteredFaculty.length} of {facultyData.length} faculty members
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

export default FacultyPage;

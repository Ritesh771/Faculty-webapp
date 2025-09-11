
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/AuthContext';

// Mock data for departments
const mockDepartments = [
  {
    id: 1,
    name: "Computer Science",
    hod: "Dr. Alan Turing",
    hodEmail: "a.turing@neurocampus.edu",
    facultyCount: 15,
    studentCount: 320,
    coursesOffered: 24,
    establishedYear: 1985,
    description: "The Department of Computer Science offers comprehensive programs in various computing disciplines including artificial intelligence, software engineering, and data science."
  },
  {
    id: 2,
    name: "Mathematics",
    hod: "Prof. James Wilson",
    hodEmail: "j.wilson@neurocampus.edu",
    facultyCount: 12,
    studentCount: 280,
    coursesOffered: 18,
    establishedYear: 1972,
    description: "The Mathematics Department provides strong foundations in pure and applied mathematics with specializations in algebra, analysis, and computational mathematics."
  },
  {
    id: 3,
    name: "Physics",
    hod: "Dr. Robert Lee",
    hodEmail: "r.lee@neurocampus.edu",
    facultyCount: 10,
    studentCount: 220,
    coursesOffered: 16,
    establishedYear: 1975,
    description: "The Physics Department focuses on theoretical and experimental physics with research areas in quantum mechanics, relativity, and astrophysics."
  },
  {
    id: 4,
    name: "Biology",
    hod: "Dr. Rachel Green",
    hodEmail: "r.green@neurocampus.edu",
    facultyCount: 14,
    studentCount: 300,
    coursesOffered: 22,
    establishedYear: 1980,
    description: "The Biology Department offers studies in molecular biology, genetics, ecology, and evolutionary biology with state-of-the-art laboratory facilities."
  },
  {
    id: 5,
    name: "Chemistry",
    hod: "Prof. Walter White",
    hodEmail: "w.white@neurocampus.edu",
    facultyCount: 11,
    studentCount: 240,
    coursesOffered: 19,
    establishedYear: 1976,
    description: "The Chemistry Department provides education in organic, inorganic, physical, and analytical chemistry with emphasis on laboratory skills and research."
  },
  {
    id: 6,
    name: "English",
    hod: "Prof. Lisa Taylor",
    hodEmail: "l.taylor@neurocampus.edu",
    facultyCount: 9,
    studentCount: 180,
    coursesOffered: 14,
    establishedYear: 1970,
    description: "The English Department offers programs in literature, creative writing, and linguistics with emphasis on critical thinking and effective communication."
  },
  {
    id: 7,
    name: "History",
    hod: "Dr. Thomas Garcia",
    hodEmail: "t.garcia@neurocampus.edu",
    facultyCount: 8,
    studentCount: 160,
    coursesOffered: 12,
    establishedYear: 1974,
    description: "The History Department explores world history, American history, and specialized historical periods with emphasis on research methodologies."
  },
  {
    id: 8,
    name: "Psychology",
    hod: "Dr. Sigmund Jung",
    hodEmail: "s.jung@neurocampus.edu",
    facultyCount: 13,
    studentCount: 290,
    coursesOffered: 20,
    establishedYear: 1982,
    description: "The Psychology Department covers clinical, cognitive, developmental, and social psychology with opportunities for practical experience and research."
  }
];

const DepartmentsPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const isAdmin = user?.role === 'admin';

  // Filter departments based on search term
  const filteredDepartments = mockDepartments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.hod.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Departments</h1>
          <p className="text-muted-foreground">
            Browse and manage academic departments at NeuroCampus.
          </p>
        </div>
        {isAdmin && (
          <Button className="mt-2 md:mt-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Department
          </Button>
        )}
      </div>

      <div className="relative w-full md:w-96">
        <Input
          placeholder="Search departments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pr-8"
        />
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredDepartments.map((dept) => (
          <Card key={dept.id} className="overflow-hidden">
            <CardHeader className="bg-primary/5 border-b pb-3">
              <CardTitle>{dept.name}</CardTitle>
              <CardDescription>Established {dept.establishedYear}</CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div>
                <p className="text-sm font-medium">Department Head</p>
                <div className="flex items-center mt-1">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    {dept.hod.split(' ')[0][0]}{dept.hod.split(' ')[1][0]}
                  </div>
                  <div className="ml-2">
                    <p className="text-sm font-medium">{dept.hod}</p>
                    <p className="text-xs text-muted-foreground">{dept.hodEmail}</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="text-center p-2 bg-sky-50 rounded-lg">
                  <p className="text-lg font-bold text-sky-600">{dept.facultyCount}</p>
                  <p className="text-xs text-muted-foreground">Faculty</p>
                </div>
                <div className="text-center p-2 bg-amber-50 rounded-lg">
                  <p className="text-lg font-bold text-amber-600">{dept.studentCount}</p>
                  <p className="text-xs text-muted-foreground">Students</p>
                </div>
                <div className="text-center p-2 bg-emerald-50 rounded-lg">
                  <p className="text-lg font-bold text-emerald-600">{dept.coursesOffered}</p>
                  <p className="text-xs text-muted-foreground">Courses</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 line-clamp-3">{dept.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button variant="outline" size="sm">View Details</Button>
              {isAdmin && (
                <Button variant="ghost" size="sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Edit
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
        {filteredDepartments.length === 0 && (
          <div className="col-span-full flex justify-center py-10">
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium">No departments found</h3>
              <p className="mt-1 text-gray-500">Try adjusting your search term.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentsPage;


import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// Mock data for study materials
const coursesMaterials = [
  {
    id: 1,
    courseCode: "CS101",
    courseName: "Introduction to Programming",
    semester: "1",
    materials: [
      { id: 1, title: "Introduction to Programming - Lecture Notes", type: "PDF", size: "2.4 MB", uploadDate: "May 3, 2025" },
      { id: 2, title: "Basic Programming Concepts - Slides", type: "PPTX", size: "3.7 MB", uploadDate: "May 2, 2025" },
      { id: 3, title: "C++ Tutorial for Beginners", type: "PDF", size: "4.1 MB", uploadDate: "Apr 29, 2025" },
      { id: 4, title: "Programming Assignment 1", type: "DOC", size: "1.2 MB", uploadDate: "Apr 28, 2025" },
    ]
  },
  {
    id: 2,
    courseCode: "CS202",
    courseName: "Data Structures",
    semester: "2",
    materials: [
      { id: 1, title: "Introduction to Data Structures", type: "PDF", size: "3.5 MB", uploadDate: "May 4, 2025" },
      { id: 2, title: "Arrays and Linked Lists", type: "PDF", size: "2.8 MB", uploadDate: "May 3, 2025" },
      { id: 3, title: "Stacks and Queues Implementation", type: "ZIP", size: "1.5 MB", uploadDate: "Apr 30, 2025" },
      { id: 4, title: "Trees and Graphs", type: "PPTX", size: "4.2 MB", uploadDate: "Apr 27, 2025" },
    ]
  },
  {
    id: 3,
    courseCode: "CS303",
    courseName: "Database Management Systems",
    semester: "3",
    materials: [
      { id: 1, title: "Introduction to DBMS", type: "PDF", size: "2.6 MB", uploadDate: "May 5, 2025" },
      { id: 2, title: "SQL Fundamentals", type: "PDF", size: "3.2 MB", uploadDate: "May 2, 2025" },
      { id: 3, title: "Database Normalization", type: "PDF", size: "1.8 MB", uploadDate: "Apr 28, 2025" },
      { id: 4, title: "DBMS Lab Assignment", type: "ZIP", size: "5.1 MB", uploadDate: "Apr 25, 2025" },
    ]
  },
  {
    id: 4,
    courseCode: "CS404",
    courseName: "Operating Systems",
    semester: "4",
    materials: [
      { id: 1, title: "Introduction to OS", type: "PDF", size: "3.1 MB", uploadDate: "May 4, 2025" },
      { id: 2, title: "Process Management", type: "PPTX", size: "4.3 MB", uploadDate: "May 1, 2025" },
      { id: 3, title: "Memory Management", type: "PDF", size: "2.7 MB", uploadDate: "Apr 27, 2025" },
      { id: 4, title: "File Systems", type: "PDF", size: "2.3 MB", uploadDate: "Apr 24, 2025" },
    ]
  },
];

const referenceMaterials = [
  { id: 1, title: "Algorithm Design Manual", author: "Steven S. Skiena", type: "Book", format: "PDF", size: "12.5 MB", category: "Algorithms" },
  { id: 2, title: "Cracking the Coding Interview", author: "Gayle Laakmann McDowell", type: "Book", format: "PDF", size: "8.3 MB", category: "Programming" },
  { id: 3, title: "Machine Learning: A Probabilistic Perspective", author: "Kevin P. Murphy", type: "Book", format: "PDF", size: "15.7 MB", category: "AI & ML" },
  { id: 4, title: "Design Patterns: Elements of Reusable OO Software", author: "Gang of Four", type: "Book", format: "PDF", size: "6.4 MB", category: "Software Design" },
  { id: 5, title: "Introduction to Algorithms", author: "Cormen, Leiserson, Rivest, Stein", type: "Book", format: "PDF", size: "14.2 MB", category: "Algorithms" },
  { id: 6, title: "Database System Concepts", author: "Silberschatz, Korth, Sudarshan", type: "Book", format: "PDF", size: "10.8 MB", category: "Databases" },
];

const videoLectures = [
  { id: 1, title: "Introduction to Neural Networks", instructor: "Dr. Aditya Sharma", duration: "45 min", course: "AI Fundamentals", uploadDate: "May 5, 2025" },
  { id: 2, title: "Advanced SQL Queries", instructor: "Prof. Nisha Mehta", duration: "52 min", course: "Database Systems", uploadDate: "May 3, 2025" },
  { id: 3, title: "Object-Oriented Programming Concepts", instructor: "Dr. Rajiv Kumar", duration: "48 min", course: "Java Programming", uploadDate: "May 1, 2025" },
  { id: 4, title: "Web Security Fundamentals", instructor: "Prof. Sunita Patel", duration: "56 min", course: "Cybersecurity", uploadDate: "Apr 28, 2025" },
  { id: 5, title: "Cloud Computing Architecture", instructor: "Dr. Vikram Singh", duration: "63 min", course: "Cloud Computing", uploadDate: "Apr 25, 2025" },
  { id: 6, title: "Mobile App Development with React Native", instructor: "Prof. Ananya Das", duration: "59 min", course: "Mobile Development", uploadDate: "Apr 22, 2025" },
];

const MaterialsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [expandedCourse, setExpandedCourse] = useState<number | null>(null);

  // Filter materials based on search term and filter
  const filteredCourses = coursesMaterials.filter(course => 
    (course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     course.courseCode.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filter === "all" || course.semester === filter)
  );

  const filteredReferences = referenceMaterials.filter(material =>
    material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredVideos = videoLectures.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleCourse = (courseId: number) => {
    if (expandedCourse === courseId) {
      setExpandedCourse(null);
    } else {
      setExpandedCourse(courseId);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Study Materials</h1>
        <div className="mt-2 md:mt-0 flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search materials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Semesters</option>
            <option value="1">Semester 1</option>
            <option value="2">Semester 2</option>
            <option value="3">Semester 3</option>
            <option value="4">Semester 4</option>
            <option value="5">Semester 5</option>
            <option value="6">Semester 6</option>
            <option value="7">Semester 7</option>
            <option value="8">Semester 8</option>
          </select>
        </div>
      </div>

      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="courses">Course Materials</TabsTrigger>
          <TabsTrigger value="reference">Reference Books</TabsTrigger>
          <TabsTrigger value="videos">Video Lectures</TabsTrigger>
        </TabsList>
        
        <TabsContent value="courses" className="space-y-4">
          {filteredCourses.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-muted-foreground">No course materials found. Try changing your search or filter.</p>
              </CardContent>
            </Card>
          ) : (
            filteredCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <Collapsible
                  open={expandedCourse === course.id}
                  onOpenChange={() => toggleCourse(course.id)}
                >
                  <CollapsibleTrigger className="w-full text-left">
                    <CardHeader className="flex flex-row items-center justify-between py-4">
                      <div>
                        <CardTitle>{course.courseCode}: {course.courseName}</CardTitle>
                        <CardDescription>Semester {course.semester} • {course.materials.length} materials</CardDescription>
                      </div>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-5 w-5 transition-transform ${expandedCourse === course.id ? 'transform rotate-180' : ''}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent>
                      <div className="space-y-3">
                        {course.materials.map((material) => (
                          <div key={material.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium">{material.title}</p>
                                <div className="flex items-center gap-x-2 mt-0.5">
                                  <span className="text-xs text-gray-500">{material.type}</span>
                                  <span className="text-xs text-gray-400">•</span>
                                  <span className="text-xs text-gray-500">{material.size}</span>
                                  <span className="text-xs text-gray-400">•</span>
                                  <span className="text-xs text-gray-500">{material.uploadDate}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4 flex justify-end">
                      <Button variant="outline" size="sm">Download All</Button>
                    </CardFooter>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            ))
          )}
          <div className="flex justify-center mt-4">
            <Button variant="outline">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Request Additional Materials
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="reference" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reference Books</CardTitle>
              <CardDescription>
                Comprehensive books and resources for in-depth learning
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredReferences.map((book) => (
                  <div key={book.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-12 bg-primary/10 rounded flex items-center justify-center text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium line-clamp-1">{book.title}</p>
                        <p className="text-xs text-gray-500">{book.author}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{book.format} • {book.size}</span>
                      <span className="px-2 py-1 bg-secondary rounded-full text-xs">{book.category}</span>
                    </div>
                    <div className="mt-3 flex space-x-2">
                      <Button variant="outline" size="sm" className="w-full text-xs">View</Button>
                      <Button variant="ghost" size="sm" className="text-xs">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              {filteredReferences.length === 0 && (
                <div className="py-10 text-center">
                  <p className="text-muted-foreground">No reference books found. Try changing your search.</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <p className="text-sm text-muted-foreground">Need a specific book? Contact the library.</p>
              <Button variant="outline" size="sm">Browse Library</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="videos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Video Lectures</CardTitle>
              <CardDescription>
                Recorded lectures and tutorials from faculty members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredVideos.map((video) => (
                  <div key={video.id} className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-100 h-36 flex items-center justify-center relative">
                      <div className="w-16 h-16 bg-white/80 backdrop-blur rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">{video.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{video.instructor}</p>
                      <div className="flex justify-between items-center mt-2 text-xs">
                        <span className="text-gray-500">{video.course}</span>
                        <span className="text-gray-500">{video.uploadDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {filteredVideos.length === 0 && (
                <div className="py-10 text-center">
                  <p className="text-muted-foreground">No videos found. Try changing your search.</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <p className="text-sm text-muted-foreground">All videos can be streamed or downloaded for offline viewing.</p>
              <Button variant="outline" size="sm">Request Video Tutorial</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MaterialsPage;

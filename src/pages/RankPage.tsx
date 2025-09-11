
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

// Mock data for rankings
const codingPlatformRankings = [
  { id: 1, name: "Arun Kumar", studentId: "ST2023001", leetcodeRank: 512, leetcodeScore: 2340, hackerRankScore: 875, codechefRating: 1842, collegeRank: 1 },
  { id: 2, name: "Priya Sharma", studentId: "ST2023015", leetcodeRank: 843, leetcodeScore: 1985, hackerRankScore: 820, codechefRating: 1756, collegeRank: 2 },
  { id: 3, name: "Rajesh Singh", studentId: "ST2023042", leetcodeRank: 967, leetcodeScore: 1876, hackerRankScore: 805, codechefRating: 1689, collegeRank: 3 },
  { id: 4, name: "Nisha Patel", studentId: "ST2023008", leetcodeRank: 1024, leetcodeScore: 1754, hackerRankScore: 790, codechefRating: 1645, collegeRank: 4 },
  { id: 5, name: "Sameer Khan", studentId: "ST2023037", leetcodeRank: 1245, leetcodeScore: 1680, hackerRankScore: 765, codechefRating: 1598, collegeRank: 5 },
  { id: 6, name: "Anjali Gupta", studentId: "ST2023023", leetcodeRank: 1356, leetcodeScore: 1623, hackerRankScore: 750, codechefRating: 1575, collegeRank: 6 },
  { id: 7, name: "Vikram Desai", studentId: "ST2023014", leetcodeRank: 1467, leetcodeScore: 1589, hackerRankScore: 735, codechefRating: 1540, collegeRank: 7 },
  { id: 8, name: "Sneha Verma", studentId: "ST2023029", leetcodeRank: 1523, leetcodeScore: 1543, hackerRankScore: 720, codechefRating: 1512, collegeRank: 8 },
  { id: 9, name: "Rahul Mishra", studentId: "ST2023005", leetcodeRank: 1645, leetcodeScore: 1502, hackerRankScore: 705, codechefRating: 1487, collegeRank: 9 },
  { id: 10, name: "Divya Reddy", studentId: "ST2023032", leetcodeRank: 1730, leetcodeScore: 1467, hackerRankScore: 690, codechefRating: 1455, collegeRank: 10 },
];

const academicRankings = [
  { id: 1, name: "Arun Kumar", studentId: "ST2023001", cgpa: 9.8, attendance: 98, projects: 5, collegeRank: 1 },
  { id: 2, name: "Priya Sharma", studentId: "ST2023015", cgpa: 9.7, attendance: 96, projects: 4, collegeRank: 2 },
  { id: 3, name: "Nisha Patel", studentId: "ST2023008", cgpa: 9.6, attendance: 97, projects: 4, collegeRank: 3 },
  { id: 4, name: "Rajesh Singh", studentId: "ST2023042", cgpa: 9.5, attendance: 95, projects: 5, collegeRank: 4 },
  { id: 5, name: "Anjali Gupta", studentId: "ST2023023", cgpa: 9.4, attendance: 94, projects: 3, collegeRank: 5 },
  { id: 6, name: "Sameer Khan", studentId: "ST2023037", cgpa: 9.3, attendance: 93, projects: 4, collegeRank: 6 },
  { id: 7, name: "Sneha Verma", studentId: "ST2023029", cgpa: 9.2, attendance: 92, projects: 3, collegeRank: 7 },
  { id: 8, name: "Vikram Desai", studentId: "ST2023014", cgpa: 9.1, attendance: 91, projects: 4, collegeRank: 8 },
  { id: 9, name: "Divya Reddy", studentId: "ST2023032", cgpa: 9.0, attendance: 90, projects: 3, collegeRank: 9 },
  { id: 10, name: "Rahul Mishra", studentId: "ST2023005", cgpa: 8.9, attendance: 89, projects: 4, collegeRank: 10 },
];

const RankPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter rankings based on search term
  const filteredCodingRankings = codingPlatformRankings.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAcademicRankings = academicRankings.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Student Ranking System</h1>
        <div className="mt-2 md:mt-0">
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
        </div>
      </div>

      <Tabs defaultValue="coding" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="coding">Coding Platforms</TabsTrigger>
          <TabsTrigger value="academic">Academic Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="coding" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Coding Platform Rankings</CardTitle>
              <CardDescription>
                Students ranked by their performance on LeetCode, HackerRank, and CodeChef
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rank</TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead>ID</TableHead>
                      <TableHead className="hidden md:table-cell">LeetCode Rank</TableHead>
                      <TableHead className="hidden md:table-cell">LeetCode Score</TableHead>
                      <TableHead className="hidden md:table-cell">HackerRank Score</TableHead>
                      <TableHead className="hidden md:table-cell">CodeChef Rating</TableHead>
                      <TableHead className="text-right">Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCodingRankings.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div className="flex justify-center items-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium">
                            {student.collegeRank}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.studentId}</TableCell>
                        <TableCell className="hidden md:table-cell">{student.leetcodeRank}</TableCell>
                        <TableCell className="hidden md:table-cell">{student.leetcodeScore}</TableCell>
                        <TableCell className="hidden md:table-cell">{student.hackerRankScore}</TableCell>
                        <TableCell className="hidden md:table-cell">{student.codechefRating}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="border-t flex justify-between items-center pt-4">
              <p className="text-sm text-muted-foreground">Showing top {filteredCodingRankings.length} of {codingPlatformRankings.length} students</p>
              <Button variant="outline" size="sm">Export Data</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Rank Predictor</CardTitle>
              <CardDescription>
                Connect your LeetCode account to predict your college ranking
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="text-sm font-medium mb-1 block">LeetCode Username</label>
                  <input type="text" className="w-full rounded-md border border-gray-300 p-2" placeholder="Enter your LeetCode username" />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium mb-1 block">Student ID</label>
                  <input type="text" className="w-full rounded-md border border-gray-300 p-2" placeholder="Enter your Student ID" />
                </div>
              </div>
              <Button className="w-full md:w-auto">Predict My Rank</Button>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <div className="text-sm">
                <p className="text-muted-foreground">Your predicted rank will be calculated based on your LeetCode performance, course grades, and attendance.</p>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="academic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Academic Rankings</CardTitle>
              <CardDescription>
                Students ranked by CGPA, attendance, and project completion
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rank</TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead>ID</TableHead>
                      <TableHead>CGPA</TableHead>
                      <TableHead className="hidden md:table-cell">Attendance %</TableHead>
                      <TableHead className="hidden md:table-cell">Projects</TableHead>
                      <TableHead className="text-right">Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAcademicRankings.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div className="flex justify-center items-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium">
                            {student.collegeRank}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.studentId}</TableCell>
                        <TableCell>{student.cgpa}</TableCell>
                        <TableCell className="hidden md:table-cell">{student.attendance}%</TableCell>
                        <TableCell className="hidden md:table-cell">{student.projects}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="border-t flex justify-between items-center pt-4">
              <p className="text-sm text-muted-foreground">Showing top {filteredAcademicRankings.length} of {academicRankings.length} students</p>
              <Button variant="outline" size="sm">Export Data</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Rank Improvement Suggestions</CardTitle>
              <CardDescription>
                Personalized recommendations to improve your academic ranking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start p-3 border rounded-md">
                  <div className="rounded-full p-2 bg-blue-100 text-blue-600 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Improve Attendance</p>
                    <p className="text-sm text-muted-foreground mt-1">Increasing your attendance from 90% to 95% could improve your rank by 2 positions.</p>
                  </div>
                </div>
                
                <div className="flex items-start p-3 border rounded-md">
                  <div className="rounded-full p-2 bg-green-100 text-green-600 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Complete Additional Project</p>
                    <p className="text-sm text-muted-foreground mt-1">Taking on one more project this semester could improve your rank by 3 positions.</p>
                  </div>
                </div>
                
                <div className="flex items-start p-3 border rounded-md">
                  <div className="rounded-full p-2 bg-purple-100 text-purple-600 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Improve Core Subject Grades</p>
                    <p className="text-sm text-muted-foreground mt-1">Increasing your grades in Data Structures and Algorithms could significantly impact your overall ranking.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RankPage;


import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookMarked, TrendingUp, Award, BarChart3 } from 'lucide-react';

const InternalMarksPage: React.FC = () => {
  const [selectedSemester, setSelectedSemester] = useState('current');

  // Mock data for internal marks
  const subjects = [
    {
      id: 1,
      name: 'Operating Systems',
      code: 'CS301',
      test1: 18,
      test2: 16,
      assignment: 8,
      attendance: 9,
      total: 51,
      maxMarks: 60,
      grade: 'A',
      gpa: 9.0
    },
    {
      id: 2,
      name: 'Computer Networks',
      code: 'CS302',
      test1: 16,
      test2: 17,
      assignment: 7,
      attendance: 8,
      total: 48,
      maxMarks: 60,
      grade: 'A-',
      gpa: 8.5
    },
    {
      id: 3,
      name: 'Database Systems',
      code: 'CS303',
      test1: 19,
      test2: 18,
      assignment: 9,
      attendance: 10,
      total: 56,
      maxMarks: 60,
      grade: 'A+',
      gpa: 10.0
    },
    {
      id: 4,
      name: 'Software Engineering',
      code: 'CS304',
      test1: 15,
      test2: 14,
      assignment: 6,
      attendance: 7,
      total: 42,
      maxMarks: 60,
      grade: 'B+',
      gpa: 7.5
    },
    {
      id: 5,
      name: 'Artificial Intelligence',
      code: 'CS305',
      test1: 17,
      test2: 16,
      assignment: 8,
      attendance: 9,
      total: 50,
      maxMarks: 60,
      grade: 'A',
      gpa: 9.0
    },
  ];

  const overallStats = {
    totalMarks: subjects.reduce((sum, subject) => sum + subject.total, 0),
    maxMarks: subjects.reduce((sum, subject) => sum + subject.maxMarks, 0),
    averageGPA: subjects.reduce((sum, subject) => sum + subject.gpa, 0) / subjects.length,
    overallGrade: 'A'
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+': return 'bg-green-100 text-green-800 border-green-200';
      case 'A': return 'bg-green-50 text-green-700 border-green-100';
      case 'A-': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'B+': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'B': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-4 lg:p-6 max-w-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-gray-900">
              Internal Marks
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Your test scores, assignments, and overall performance
            </p>
          </div>
          <Badge variant="outline" className="flex items-center gap-2 w-fit">
            <BookMarked className="h-4 w-4" />
            Semester 6
          </Badge>
        </div>
      </motion.div>

      {/* Overall Performance Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Marks</p>
                <p className="text-2xl font-bold">{overallStats.totalMarks}/{overallStats.maxMarks}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average GPA</p>
                <p className="text-2xl font-bold text-green-600">{overallStats.averageGPA.toFixed(1)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Overall Grade</p>
                <p className="text-2xl font-bold text-blue-600">{overallStats.overallGrade}</p>
              </div>
              <Award className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Percentage</p>
                <p className="text-2xl font-bold text-purple-600">
                  {((overallStats.totalMarks / overallStats.maxMarks) * 100).toFixed(1)}%
                </p>
              </div>
              <BookMarked className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Subject-wise Marks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
      >
        {subjects.map((subject, index) => (
          <motion.div
            key={subject.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{subject.name}</CardTitle>
                    <CardDescription>{subject.code}</CardDescription>
                  </div>
                  <Badge className={getGradeColor(subject.grade)}>
                    {subject.grade}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Individual Component Scores */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-2 bg-blue-50 rounded-lg">
                      <p className="text-xs text-gray-600">Test 1</p>
                      <p className="font-bold text-blue-600">{subject.test1}/20</p>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded-lg">
                      <p className="text-xs text-gray-600">Test 2</p>
                      <p className="font-bold text-green-600">{subject.test2}/20</p>
                    </div>
                    <div className="text-center p-2 bg-purple-50 rounded-lg">
                      <p className="text-xs text-gray-600">Assignment</p>
                      <p className="font-bold text-purple-600">{subject.assignment}/10</p>
                    </div>
                    <div className="text-center p-2 bg-orange-50 rounded-lg">
                      <p className="text-xs text-gray-600">Attendance</p>
                      <p className="font-bold text-orange-600">{subject.attendance}/10</p>
                    </div>
                  </div>

                  {/* Total Score Progress */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Total Score</span>
                      <span className="text-sm font-bold">
                        {subject.total}/{subject.maxMarks}
                      </span>
                    </div>
                    <Progress 
                      value={(subject.total / subject.maxMarks) * 100} 
                      className="h-2"
                    />
                  </div>

                  {/* GPA */}
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-sm text-gray-600">GPA</span>
                    <span className="font-bold text-lg">{subject.gpa}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default InternalMarksPage;


import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, Users, Plus, Video, MapPin } from 'lucide-react';

const ScheduleMentoringPage: React.FC = () => {
  const { toast } = useToast();
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');
  const [meetingType, setMeetingType] = useState('');

  // Mock data
  const students = [
    { id: 1, name: 'John Doe', usn: 'CS21001' },
    { id: 2, name: 'Jane Smith', usn: 'CS21002' },
    { id: 3, name: 'Mike Johnson', usn: 'CS21003' },
    { id: 4, name: 'Sarah Wilson', usn: 'CS21004' },
  ];

  const upcomingSessions = [
    {
      id: 1,
      studentName: 'John Doe',
      usn: 'CS21001',
      date: '2024-01-28',
      time: '10:00',
      type: 'in-person',
      location: 'Faculty Room 204',
      notes: 'Discuss academic progress and career guidance',
      status: 'scheduled'
    },
    {
      id: 2,
      studentName: 'Jane Smith',
      usn: 'CS21002',
      date: '2024-01-29',
      time: '14:30',
      type: 'online',
      location: 'Google Meet',
      notes: 'Address attendance concerns and study plan',
      status: 'scheduled'
    },
    {
      id: 3,
      studentName: 'Mike Johnson',
      usn: 'CS21003',
      date: '2024-01-30',
      time: '11:00',
      type: 'in-person',
      location: 'Faculty Room 204',
      notes: 'Project guidance and mentoring',
      status: 'completed'
    },
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const handleSchedule = () => {
    if (!selectedStudent || !selectedDate || !selectedTime || !meetingType) {
      toast({
        title: "Error",
        description: "Please fill all required fields.",
        variant: "destructive"
      });
      return;
    }

    const student = students.find(s => s.id.toString() === selectedStudent);
    toast({
      title: "Session Scheduled",
      description: `Mentoring session with ${student?.name} scheduled for ${selectedDate} at ${selectedTime}.`,
    });

    // Reset form
    setSelectedStudent('');
    setSelectedDate('');
    setSelectedTime('');
    setNotes('');
    setMeetingType('');
  };

  const getTypeInfo = (type: string) => {
    switch (type) {
      case 'online':
        return {
          label: 'Online',
          color: 'bg-blue-100 text-blue-800',
          icon: <Video className="h-4 w-4" />
        };
      case 'in-person':
        return {
          label: 'In-Person',
          color: 'bg-green-100 text-green-800',
          icon: <MapPin className="h-4 w-4" />
        };
      default:
        return {
          label: 'Unknown',
          color: 'bg-gray-100 text-gray-800',
          icon: null
        };
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const scheduledCount = upcomingSessions.filter(s => s.status === 'scheduled').length;
  const completedCount = upcomingSessions.filter(s => s.status === 'completed').length;

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
              Schedule Mentoring
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Schedule and manage mentoring sessions with students
            </p>
          </div>
          <Badge variant="outline" className="flex items-center gap-2 w-fit">
            <Calendar className="h-4 w-4" />
            {scheduledCount} Upcoming
          </Badge>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Scheduled Sessions</p>
                <p className="text-2xl font-bold text-blue-600">{scheduledCount}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed Sessions</p>
                <p className="text-2xl font-bold text-green-600">{completedCount}</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Schedule Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Schedule New Session
            </CardTitle>
            <CardDescription>
              Create a new mentoring session with a student
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Select Student</label>
                <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose student" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map(student => (
                      <SelectItem key={student.id} value={student.id.toString()}>
                        {student.name} ({student.usn})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Meeting Type</label>
                <Select value={meetingType} onValueChange={setMeetingType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in-person">In-Person</SelectItem>
                    <SelectItem value="online">Online</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Date</label>
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Time</label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map(time => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm font-medium mb-2 block">Notes (Optional)</label>
                <Textarea
                  placeholder="Add any notes or agenda for the session..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="sm:col-span-2">
                <Button onClick={handleSchedule} className="w-full sm:w-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Session
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Upcoming Sessions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              All Sessions
            </CardTitle>
            <CardDescription>
              View and manage your mentoring sessions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingSessions.map((session, index) => {
                const typeInfo = getTypeInfo(session.type);
                
                return (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                          <h4 className="font-medium text-gray-900">{session.studentName}</h4>
                          <Badge variant="outline">{session.usn}</Badge>
                          <Badge className={getStatusColor(session.status)}>
                            {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">
                              {new Date(session.date).toLocaleDateString()} at {session.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {typeInfo.icon}
                            <span className="text-sm text-gray-600">{session.location}</span>
                          </div>
                        </div>

                        {session.notes && (
                          <div className="bg-blue-50 p-3 rounded-md">
                            <p className="text-sm text-blue-800">{session.notes}</p>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-2">
                        <Badge className={typeInfo.color}>
                          {typeInfo.icon}
                          <span className="ml-1">{typeInfo.label}</span>
                        </Badge>
                        
                        {session.status === 'scheduled' && (
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              Reschedule
                            </Button>
                            <Button size="sm" variant="destructive">
                              Cancel
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {upcomingSessions.length === 0 && (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">No mentoring sessions scheduled</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ScheduleMentoringPage;

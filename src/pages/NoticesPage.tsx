
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Bell, Plus, Pin, Edit, Trash } from 'lucide-react';

const NoticesPage: React.FC = () => {
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState('all');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [targetRole, setTargetRole] = useState('');

  // Mock notices data
  const notices = [
    { 
      id: 1, 
      title: 'Mid-Semester Exam Schedule', 
      message: 'Mid-semester examinations will commence from March 15th...', 
      role: 'student', 
      date: '2025-03-10', 
      isPinned: true, 
      isUrgent: true 
    },
    { 
      id: 2, 
      title: 'Faculty Development Program', 
      message: 'All faculty members are requested to attend the FDP on AI/ML...', 
      role: 'faculty', 
      date: '2025-03-08', 
      isPinned: false, 
      isUrgent: false 
    },
    { 
      id: 3, 
      title: 'Library Holiday Notice', 
      message: 'The library will remain closed on March 12th due to maintenance...', 
      role: 'all', 
      date: '2025-03-07', 
      isPinned: true, 
      isUrgent: false 
    },
    { 
      id: 4, 
      title: 'Department Meeting', 
      message: 'Monthly department meeting scheduled for March 20th at 2 PM...', 
      role: 'faculty', 
      date: '2025-03-05', 
      isPinned: false, 
      isUrgent: false 
    },
  ];

  const filteredNotices = notices.filter(notice => {
    if (selectedRole !== 'all' && notice.role !== selectedRole && notice.role !== 'all') return false;
    return true;
  });

  const handleCreateNotice = () => {
    if (!title || !message || !targetRole) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Notice Created",
      description: `Notice "${title}" has been published to ${targetRole === 'all' ? 'everyone' : targetRole}.`,
    });

    // Reset form
    setTitle('');
    setMessage('');
    setTargetRole('');
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'student': return 'default';
      case 'faculty': return 'secondary';
      case 'all': return 'outline';
      default: return 'outline';
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
              Notice Management
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Create and manage department notices
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-blue-500" />
            <span className="text-sm text-blue-600 font-medium">
              {filteredNotices.length} active notices
            </span>
          </div>
        </div>
      </motion.div>

      {/* Create Notice Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Create New Notice
            </CardTitle>
            <CardDescription>
              Send important announcements to students, faculty, or everyone
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Notice Title</label>
                <Input
                  placeholder="Enter notice title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Target Audience</label>
                <Select value={targetRole} onValueChange={setTargetRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select target audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Everyone</SelectItem>
                    <SelectItem value="student">Students Only</SelectItem>
                    <SelectItem value="faculty">Faculty Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Message</label>
              <Textarea
                placeholder="Write your notice message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
              />
            </div>
            <Button onClick={handleCreateNotice} className="w-full sm:w-auto">
              Publish Notice
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <label className="text-sm font-medium">Filter by Role:</label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Notices</SelectItem>
                  <SelectItem value="student">Student Notices</SelectItem>
                  <SelectItem value="faculty">Faculty Notices</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Notice History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Notice History</CardTitle>
            <CardDescription>
              Previously published notices with status indicators
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-96 overflow-y-auto">
              {filteredNotices.length > 0 ? (
                <div className="space-y-0">
                  {filteredNotices.map((notice, index) => (
                    <motion.div
                      key={notice.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-4 border-b hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {notice.isPinned && <Pin className="h-4 w-4 text-blue-500" />}
                            <h3 className="font-medium text-gray-900">{notice.title}</h3>
                            {notice.isUrgent && (
                              <Badge variant="destructive" className="text-xs">Urgent</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {notice.message}
                          </p>
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge variant={getRoleBadgeColor(notice.role)} className="text-xs">
                              {notice.role === 'all' ? 'Everyone' : notice.role.charAt(0).toUpperCase() + notice.role.slice(1)}
                            </Badge>
                            <span className="text-xs text-gray-500">{notice.date}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No notices found for the selected filter</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default NoticesPage;

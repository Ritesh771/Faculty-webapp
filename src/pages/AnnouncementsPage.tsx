
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Bell, Calendar, User, Filter } from 'lucide-react';
import { getFacultyNotifications, getFacultySentNotifications } from '@/utils/faculty_api';

const AnnouncementsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [received, setReceived] = useState<any[]>([]);
  const [sent, setSent] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const [rec, snt] = await Promise.all([
        getFacultyNotifications(),
        getFacultySentNotifications(),
      ]);
      if (rec?.success && rec?.data) setReceived(rec.data);
      if (snt?.success && snt?.data) setSent(snt.data);
    })();
  }, []);

  const normalize = (n: any, idx: number, source: 'received' | 'sent') => ({
    id: n.id || `${source}-${idx}`,
    title: n.title || n.subject || 'Announcement',
    content: n.content || n.message || '',
    author: n.sent_by || n.created_by || (source === 'sent' ? 'You' : 'Admin'),
    role: n.role || (source === 'sent' ? 'Faculty' : 'Admin'),
    date: n.date || n.created_at || new Date().toISOString(),
    type: n.type || 'general',
    priority: n.priority || 'medium',
  });

  const announcements = [
    ...received.map((n, i) => normalize(n, i, 'received')),
    ...sent.map((n, i) => normalize(n, i, 'sent')),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = 
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === '' || announcement.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'academic': return 'bg-blue-100 text-blue-800';
      case 'general': return 'bg-gray-100 text-gray-800';
      case 'training': return 'bg-purple-100 text-purple-800';
      case 'maintenance': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
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
              Announcements
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Stay updated with the latest announcements from admin and HOD
            </p>
          </div>
          <Badge variant="outline" className="flex items-center gap-2 w-fit">
            <Bell className="h-4 w-4" />
            {filteredAnnouncements.length} Active
          </Badge>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search announcements..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="training">Training</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Announcements List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        {filteredAnnouncements.map((announcement, index) => (
          <motion.div
            key={announcement.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{announcement.title}</CardTitle>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <Badge className={getPriorityColor(announcement.priority)}>
                        {announcement.priority.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className={getTypeColor(announcement.type)}>
                        {announcement.type.charAt(0).toUpperCase() + announcement.type.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      {new Date(announcement.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="h-4 w-4" />
                      {announcement.author} ({announcement.role})
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {announcement.content}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {filteredAnnouncements.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent className="text-center py-8">
                <Bell className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">No announcements found</p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default AnnouncementsPage;

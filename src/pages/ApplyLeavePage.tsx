
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, FileText, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { applyLeave, getFacultyAssignments, getFacultyLeaveRequests, getApplyLeaveBootstrap } from '@/utils/faculty_api';

const ApplyLeavePage: React.FC = () => {
  const { toast } = useToast();
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [branches, setBranches] = useState<{ id: number; name: string }[]>([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [history, setHistory] = useState<any[]>([]);

  const leaveTypes = ['Sick Leave', 'Personal Leave', 'Emergency Leave', 'Vacation', 'Maternity Leave'];

  useEffect(() => {
    (async () => {
      const bootstrapRes = await getApplyLeaveBootstrap();
      if (bootstrapRes?.success && bootstrapRes?.data) {
        const { assignments, leave_requests, branches } = bootstrapRes.data;
        setBranches(branches);
        if (branches.length > 0) setSelectedBranch(String(branches[0].id));
        setHistory(leave_requests || []);
      } else {
        // Fallback to old method if bootstrap fails
        const [assignmentsRes, leaves] = await Promise.all([
          getFacultyAssignments(),
          getFacultyLeaveRequests().catch(() => []),
        ]);
        if (assignmentsRes?.success && assignmentsRes?.data) {
          const b = Array.from(new Map(assignmentsRes.data.map((a: any) => [a.branch_id, { id: a.branch_id, name: a.branch }])).values());
          setBranches(b);
          if (b.length > 0) setSelectedBranch(String(b[0].id));
        }
        setHistory(leaves || []);
      }
    })();
  }, []);

  const leaveHistory = history.map((l, idx) => ({
    id: l.id || idx + 1,
    type: l.leave_type || 'Leave',
    dates: l.start_date && l.end_date ? `${l.start_date} to ${l.end_date}` : (l.date || ''),
    status: (l.status || '').toString().toLowerCase(),
    reason: l.reason || '',
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!leaveType || !startDate || !endDate || !reason) {
      toast({
        title: "Error",
        description: "Please fill all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      toast({
        title: "Error",
        description: "End date cannot be before start date.",
        variant: "destructive"
      });
      return;
    }

    try {
      const res = await applyLeave({
        branch_ids: selectedBranch ? [selectedBranch] : [],
        start_date: startDate,
        end_date: endDate,
        reason,
      });
      if (res.success) {
        toast({ title: 'Leave Application Submitted', description: 'Your leave request has been sent for approval.' });
        setLeaveType('');
        setStartDate('');
        setEndDate('');
        setReason('');
        const leaves = await getFacultyLeaveRequests().catch(() => []);
        setHistory(leaves || []);
      } else {
        toast({ title: 'Error', description: res.message || 'Failed to submit leave', variant: 'destructive' });
      }
    } catch (err) {
      toast({ title: 'Network error', description: 'Please try again later', variant: 'destructive' });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'pending': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
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
              Apply for Leave
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Submit leave applications and track their status
            </p>
          </div>
        </div>
      </motion.div>

      {/* Leave Application Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Leave Application Form
            </CardTitle>
            <CardDescription>
              Fill out the form below to submit a leave request
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Leave Type</label>
                  <Select value={leaveType} onValueChange={setLeaveType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Leave Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {leaveTypes.map(type => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Branch</label>
                  <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Branch" />
                    </SelectTrigger>
                    <SelectContent>
                      {branches.map(b => (
                        <SelectItem key={b.id} value={b.id.toString()}>{b.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Start Date</label>
                    <Input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">End Date</label>
                    <Input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      min={startDate || new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Reason for Leave</label>
                <Textarea
                  placeholder="Please provide a detailed reason for your leave request..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button type="submit" className="flex-1 sm:flex-none">
                  Submit Application
                </Button>
                
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {/* Leave History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Leave History
            </CardTitle>
            <CardDescription>
              View your previous leave applications and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaveHistory.map((leave, index) => (
                <motion.div
                  key={leave.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium text-gray-900">{leave.type}</h4>
                        <Badge className={`flex items-center gap-1 ${getStatusColor(leave.status)}`}>
                          {getStatusIcon(leave.status)}
                          {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {leave.dates}
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mt-2">{leave.reason}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Leaves</p>
                <p className="text-2xl font-bold text-blue-600">{leaveHistory.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">
                  {leaveHistory.filter(l => l.status === 'approved').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {leaveHistory.filter(l => l.status === 'pending').length}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ApplyLeavePage;

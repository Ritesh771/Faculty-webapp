import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, User, CheckCircle, XCircle } from 'lucide-react';

interface LeaveRequest {
  id: string;
  name: string;
  department: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
  days: number;
}

const HODLeavesPage: React.FC = () => {
  const {toast} = useToast();
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      department: 'Computer Science & Engineering',
      startDate: '2025-01-20',
      endDate: '2025-01-22',
      reason: 'Conference attendance - IEEE Tech Summit',
      status: 'pending',
      appliedDate: '2025-01-14',
      days: 3
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      department: 'Electrical Engineering',
      startDate: '2025-01-25',
      endDate: '2025-01-26',
      reason: 'Personal family emergency',
      status: 'approved',
      appliedDate: '2025-01-13',
      days: 2
    },
    {
      id: '3',
      name: 'Dr. Emily Davis',
      department: 'Civil Engineering',
      startDate: '2025-01-15',
      endDate: '2025-01-17',
      reason: 'Medical appointment and recovery',
      status: 'pending',
      appliedDate: '2025-01-12',
      days: 3
    },
    {
      id: '4',
      name: 'Dr. Robert Wilson',
      department: 'Mechanical Engineering',
      startDate: '2025-01-10',
      endDate: '2025-01-11',
      reason: 'Workshop on Advanced Manufacturing',
      status: 'rejected',
      appliedDate: '2025-01-08',
      days: 2
    }
  ]);

  const handleApprove = (id: string) => {
    setLeaveRequests(prev => prev.map(request => 
      request.id === id ? { ...request, status: 'approved' as const } : request
    ));
    toast({
      title: "Leave approved",
      description: "The leave request has been approved successfully.",
    });
  };

  const handleReject = (id: string) => {
    setLeaveRequests(prev => prev.map(request => 
      request.id === id ? { ...request, status: 'rejected' as const } : request
    ));
    toast({
      title: "Leave rejected",
      description: "The leave request has been rejected.",
      variant: "destructive"
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 text-xs">Pending</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 text-xs">Rejected</Badge>;
      default:
        return <Badge variant="secondary" className="text-xs">{status}</Badge>;
    }
  };

  const pendingRequests = leaveRequests.filter(req => req.status === 'pending');

  return (
    <div className="w-full max-w-full overflow-hidden">
      <motion.div 
        className="space-y-4 sm:space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight mb-2">HOD Leave Management</h1>
          <p className="text-sm sm:text-base text-gray-600">Review and manage leave requests from department heads</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-lg sm:text-2xl font-bold text-yellow-900">{pendingRequests.length}</p>
                  <p className="text-xs sm:text-sm text-yellow-700 truncate">Pending Requests</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-lg sm:text-2xl font-bold text-green-900">
                    {leaveRequests.filter(req => req.status === 'approved').length}
                  </p>
                  <p className="text-xs sm:text-sm text-green-700 truncate">Approved</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <XCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-lg sm:text-2xl font-bold text-red-900">
                    {leaveRequests.filter(req => req.status === 'rejected').length}
                  </p>
                  <p className="text-xs sm:text-sm text-red-700 truncate">Rejected</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Pending Requests */}
        {pendingRequests.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Card className="border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-800 text-base sm:text-lg">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  Pending Requests
                </CardTitle>
                <CardDescription className="text-sm">
                  Review and approve/reject these leave requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingRequests.map((request, index) => (
                    <motion.div
                      key={request.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                      className="border rounded-lg p-3 sm:p-4 bg-white hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex flex-col gap-4">
                        <div className="space-y-3 flex-1">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                              <User className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="font-semibold text-gray-800 text-sm sm:text-base truncate">{request.name}</h4>
                              <p className="text-xs sm:text-sm text-gray-600 truncate">{request.department}</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                              <span className="truncate">{request.startDate} to {request.endDate}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                              <span>{request.days} day{request.days > 1 ? 's' : ''}</span>
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 rounded p-2 sm:p-3">
                            <p className="text-xs sm:text-sm"><strong>Reason:</strong> <span className="break-words">{request.reason}</span></p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button 
                            size="sm"
                            onClick={() => handleApprove(request.id)}
                            className="bg-green-500 hover:bg-green-600 text-white text-xs sm:text-sm flex-1"
                          >
                            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            Approve
                          </Button>
                          <Button 
                            size="sm"
                            variant="outline"
                            onClick={() => handleReject(request.id)}
                            className="border-red-200 text-red-600 hover:bg-red-50 text-xs sm:text-sm flex-1"
                          >
                            <XCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* All Requests History */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">All Leave Requests</CardTitle>
              <CardDescription className="text-sm">
                Complete history of leave requests and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {leaveRequests.map((request, index) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index, duration: 0.3 }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border rounded-lg hover:bg-gray-50 transition-colors gap-2"
                  >
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                        <h4 className="font-medium text-sm sm:text-base truncate">{request.name}</h4>
                        {getStatusBadge(request.status)}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 truncate">{request.department}</p>
                      <p className="text-xs text-gray-500 truncate">
                        {request.startDate} to {request.endDate} ({request.days} days)
                      </p>
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 flex-shrink-0">
                      Applied: {request.appliedDate}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HODLeavesPage;


import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from '@/context/AuthContext';

// Mock data for users
const mockUsers = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    email: "s.johnson@neurocampus.edu",
    role: "faculty",
    department: "Computer Science",
    status: "active",
    lastActive: "2 hours ago",
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    email: "m.chen@neurocampus.edu",
    role: "faculty",
    department: "Mathematics",
    status: "active",
    lastActive: "1 day ago",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    email: "e.rodriguez@neurocampus.edu",
    role: "faculty",
    department: "Physics",
    status: "active",
    lastActive: "5 hours ago",
  },
  {
    id: 4,
    name: "Dr. Robert Lee",
    email: "r.lee@neurocampus.edu",
    role: "hod",
    department: "Physics",
    status: "active",
    lastActive: "3 hours ago",
  },
  {
    id: 5,
    name: "Prof. James Wilson",
    email: "j.wilson@neurocampus.edu",
    role: "hod",
    department: "Mathematics",
    status: "active",
    lastActive: "Just now",
  },
  {
    id: 6,
    name: "Dr. Amanda White",
    email: "a.white@neurocampus.edu",
    role: "faculty",
    department: "Biology",
    status: "inactive",
    lastActive: "2 weeks ago",
  },
  {
    id: 7,
    name: "Prof. Daniel Brown",
    email: "d.brown@neurocampus.edu",
    role: "faculty",
    department: "Chemistry",
    status: "active",
    lastActive: "Yesterday",
  },
  {
    id: 8,
    name: "Dr. Thomas Garcia",
    email: "t.garcia@neurocampus.edu",
    role: "hod",
    department: "History",
    status: "active",
    lastActive: "4 hours ago",
  },
  {
    id: 9,
    name: "Prof. Lisa Taylor",
    email: "l.taylor@neurocampus.edu",
    role: "faculty",
    department: "English",
    status: "active",
    lastActive: "1 hour ago",
  },
  {
    id: 10,
    name: "Dr. Steven Adams",
    email: "s.adams@neurocampus.edu",
    role: "admin",
    department: "Administration",
    status: "active",
    lastActive: "Just now",
  },
  {
    id: 11,
    name: "Rajesh Kumar",
    email: "r.kumar@neurocampus.edu",
    role: "student",
    department: "Computer Science",
    status: "active",
    lastActive: "3 hours ago",
  },
  {
    id: 12,
    name: "Priya Sharma",
    email: "p.sharma@neurocampus.edu",
    role: "student",
    department: "Physics",
    status: "active",
    lastActive: "2 days ago",
  }
];

const UsersPage: React.FC = () => null;

export default UsersPage;


import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Edit, Trash2, Plus } from 'lucide-react';

interface Branch {
  id: string;
  name: string;
  assignedHOD: string;
  studentCount: number;
  facultyCount: number;
}

const BranchesPage: React.FC = () => {
  const { toast } = useToast();
  const [branches, setBranches] = useState<Branch[]>([
    { id: '1', name: 'Computer Science & Engineering', assignedHOD: 'Dr. Sarah Johnson', studentCount: 476, facultyCount: 28 },
    { id: '2', name: 'Electrical Engineering', assignedHOD: 'Dr. Michael Chen', studentCount: 356, facultyCount: 22 },
    { id: '3', name: 'Mechanical Engineering', assignedHOD: 'Dr. Robert Wilson', studentCount: 412, facultyCount: 25 },
    { id: '4', name: 'Civil Engineering', assignedHOD: 'Dr. Emily Davis', studentCount: 298, facultyCount: 18 },
    { id: '5', name: 'Information Technology', assignedHOD: 'Dr. David Brown', studentCount: 521, facultyCount: 32 },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    assignedHOD: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBranch) {
      setBranches(prev => prev.map(branch => 
        branch.id === editingBranch.id 
          ? { ...branch, name: formData.name, assignedHOD: formData.assignedHOD }
          : branch
      ));
      toast({
        title: "Branch updated successfully!",
        description: `${formData.name} has been updated.`,
      });
    } else {
      const newBranch: Branch = {
        id: Date.now().toString(),
        name: formData.name,
        assignedHOD: formData.assignedHOD,
        studentCount: 0,
        facultyCount: 0
      };
      setBranches(prev => [...prev, newBranch]);
      toast({
        title: "Branch added successfully!",
        description: `${formData.name} has been added.`,
      });
    }
    setFormData({ name: '', assignedHOD: '' });
    setShowAddForm(false);
    setEditingBranch(null);
  };

  const handleEdit = (branch: Branch) => {
    setEditingBranch(branch);
    setFormData({ name: branch.name, assignedHOD: branch.assignedHOD });
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    setBranches(prev => prev.filter(branch => branch.id !== id));
    toast({
      title: "Branch deleted",
      description: "The branch has been removed successfully.",
    });
  };

  return (
    <motion.div 
      className="space-y-6 p-2 sm:p-4 lg:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Branches Management</h1>
          <p className="text-gray-600">Manage department branches and HOD assignments</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Branch
        </Button>
      </motion.div>

      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
              <CardHeader>
                <CardTitle>{editingBranch ? 'Edit Branch' : 'Add New Branch'}</CardTitle>
                <CardDescription>
                  {editingBranch ? 'Update branch information' : 'Create a new department branch'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="branchName">Branch Name</Label>
                      <Input
                        id="branchName"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter branch name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="assignedHOD">Assigned HOD</Label>
                      <Input
                        id="assignedHOD"
                        value={formData.assignedHOD}
                        onChange={(e) => setFormData(prev => ({ ...prev, assignedHOD: e.target.value }))}
                        placeholder="Enter HOD name"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="bg-green-500 hover:bg-green-600">
                      {editingBranch ? 'Update Branch' : 'Add Branch'}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingBranch(null);
                        setFormData({ name: '', assignedHOD: '' });
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="grid gap-4 sm:gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {branches.map((branch, index) => (
          <motion.div
            key={branch.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
          >
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-gradient-to-r from-white to-gray-50">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-800">{branch.name}</h3>
                    <p className="text-sm text-gray-600">HOD: {branch.assignedHOD}</p>
                    <div className="flex gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        {branch.studentCount} Students
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        {branch.facultyCount} Faculty
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(branch)}
                      className="hover:bg-blue-50"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(branch.id)}
                      className="hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default BranchesPage;

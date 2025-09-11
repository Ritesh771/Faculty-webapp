
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Award, Upload, Download, Eye, FileText, Plus } from 'lucide-react';

const CertificatesPage: React.FC = () => {
  const { toast } = useToast();
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    file: null as File | null
  });

  // Mock data for certificates
  const certificates = [
    {
      id: 1,
      title: 'Python Programming Certification',
      description: 'Completed advanced Python programming course from Coursera',
      uploadDate: '2024-01-15',
      fileSize: '2.4 MB',
      fileType: 'PDF',
      status: 'verified'
    },
    {
      id: 2,
      title: 'Web Development Bootcamp',
      description: 'Full-stack web development certification from freeCodeCamp',
      uploadDate: '2024-01-10',
      fileSize: '1.8 MB',
      fileType: 'PDF',
      status: 'pending'
    },
    {
      id: 3,
      title: 'AWS Cloud Practitioner',
      description: 'Amazon Web Services Cloud Practitioner certification',
      uploadDate: '2024-01-05',
      fileSize: '3.1 MB',
      fileType: 'PDF',
      status: 'verified'
    },
    {
      id: 4,
      title: 'Data Science Workshop',
      description: 'Data Science and Machine Learning workshop certificate',
      uploadDate: '2023-12-20',
      fileSize: '2.7 MB',
      fileType: 'PDF',
      status: 'rejected'
    },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      file
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.file) {
      toast({
        title: "Error",
        description: "Please fill in all fields and select a file",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Certificate Uploaded",
      description: "Your certificate has been uploaded successfully and is pending verification",
    });

    // Reset form
    setFormData({
      title: '',
      description: '',
      file: null
    });
    setShowUploadForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const statusCounts = {
    verified: certificates.filter(c => c.status === 'verified').length,
    pending: certificates.filter(c => c.status === 'pending').length,
    rejected: certificates.filter(c => c.status === 'rejected').length,
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
              Certificates
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Upload and manage your academic and professional certificates
            </p>
          </div>
          <Button onClick={() => setShowUploadForm(!showUploadForm)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Upload Certificate
          </Button>
        </div>
      </motion.div>

      {/* Status Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Verified</p>
                <p className="text-2xl font-bold text-green-600">{statusCounts.verified}</p>
              </div>
              <Award className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{statusCounts.pending}</p>
              </div>
              <FileText className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold text-blue-600">{certificates.length}</p>
              </div>
              <Upload className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Upload Form */}
      {showUploadForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload New Certificate
              </CardTitle>
              <CardDescription>
                Upload your certificate with proper title and description
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Certificate Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Python Programming Certification"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of the certificate..."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file">Certificate File *</Label>
                  <Input
                    id="file"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    required
                  />
                  <p className="text-xs text-gray-500">
                    Accepted formats: PDF, JPG, JPEG, PNG (Max 5MB)
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Upload Certificate
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowUploadForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Certificates List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
      >
        {certificates.map((certificate, index) => (
          <motion.div
            key={certificate.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{certificate.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {certificate.description}
                    </CardDescription>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(certificate.status)}`}>
                    {certificate.status.charAt(0).toUpperCase() + certificate.status.slice(1)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Upload Date:</span>
                      <p className="font-medium">{new Date(certificate.uploadDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">File Size:</span>
                      <p className="font-medium">{certificate.fileSize}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>

                  {certificate.status === 'rejected' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-sm text-red-700">
                        Certificate was rejected. Please check the document quality and reupload.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {certificates.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Card>
            <CardContent className="text-center py-8">
              <Award className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No certificates uploaded yet</p>
              <Button 
                onClick={() => setShowUploadForm(true)} 
                className="mt-3 flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Upload Your First Certificate
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default CertificatesPage;


import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const BulkUploadPage: React.FC = () => {
  const { toast } = useToast();
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const uploadedFile = e.dataTransfer.files[0];
      if (uploadedFile.type === 'text/csv' || uploadedFile.name.endsWith('.csv')) {
        setFile(uploadedFile);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a CSV file only.",
          variant: "destructive"
        });
      }
    }
  }, [toast]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const uploadedFile = e.target.files[0];
      if (uploadedFile.type === 'text/csv' || uploadedFile.name.endsWith('.csv')) {
        setFile(uploadedFile);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a CSV file only.",
          variant: "destructive"
        });
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setIsUploading(true);
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    toast({
      title: "Upload successful!",
      description: `${file.name} has been processed successfully.`,
    });
    
    setFile(null);
    setIsUploading(false);
  };

  return (
    <div className="w-full max-w-full overflow-hidden">
      <motion.div 
        className="space-y-4 sm:space-y-6 animate-fade-in"
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
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight mb-2">Bulk Upload Users</h1>
          <p className="text-sm sm:text-base text-gray-600">Upload multiple users at once using CSV format</p>
        </motion.div>

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-full min-w-0"
          >
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span className="truncate">File Upload</span>
                </CardTitle>
                <CardDescription className="text-sm">
                  Drop your CSV file here or click to browse
                </CardDescription>
              </CardHeader>
              <CardContent className="w-full">
                <motion.div
                  className={`border-2 border-dashed rounded-lg p-4 sm:p-6 lg:p-8 text-center transition-all duration-300 ${
                    dragActive 
                      ? 'border-blue-500 bg-blue-50' 
                      : file 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <motion.div
                      animate={dragActive ? { scale: 1.1 } : { scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {file ? (
                        <div className="space-y-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-12 sm:w-12 mx-auto text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="text-xs sm:text-sm font-medium text-green-700 truncate px-2">{file.name}</p>
                          <p className="text-xs text-green-600">File size: {(file.size / 1024).toFixed(2)} KB</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-12 sm:w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <p className="text-xs sm:text-sm font-medium px-2">Drop CSV file here or click to browse</p>
                          <p className="text-xs text-gray-500">Supports CSV files up to 10MB</p>
                        </div>
                      )}
                    </motion.div>
                  </label>
                </motion.div>

                {file && (
                  <motion.div 
                    className="mt-4 space-y-3"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button 
                        onClick={handleUpload}
                        disabled={isUploading}
                        className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                      >
                        {isUploading ? (
                          <div className="flex items-center gap-2">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                            />
                            <span className="text-sm">Processing...</span>
                          </div>
                        ) : (
                          <span className="text-sm">Upload File</span>
                        )}
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setFile(null)}
                        disabled={isUploading}
                        className="flex-shrink-0"
                      >
                        <span className="text-sm">Remove</span>
                      </Button>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Instructions Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-full min-w-0"
          >
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="truncate">Instructions</span>
                </CardTitle>
                <CardDescription className="text-sm">
                  Follow these guidelines for successful upload
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 w-full">
                <div className="min-w-0">
                  <h4 className="font-medium mb-2 text-sm sm:text-base">Required CSV Format:</h4>
                  <div className="bg-gray-50 rounded p-2 sm:p-3 text-xs sm:text-sm font-mono overflow-x-auto">
                    <div className="min-w-max">
                      email,firstName,lastName,role<br/>
                      john@example.com,John,Doe,student<br/>
                      jane@example.com,Jane,Smith,faculty
                    </div>
                  </div>
                </div>

                <div className="min-w-0">
                  <h4 className="font-medium mb-2 text-sm sm:text-base">Supported Roles:</h4>
                  <ul className="space-y-1 text-xs sm:text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                      <span>student</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
                      <span>faculty</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></span>
                      <span>hod</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></span>
                      <span>admin</span>
                    </li>
                  </ul>
                </div>

                <div className="min-w-0">
                  <h4 className="font-medium mb-2 text-sm sm:text-base">File Requirements:</h4>
                  <ul className="space-y-1 text-xs sm:text-sm text-gray-600">
                    <li>• CSV format only</li>
                    <li>• Maximum file size: 10MB</li>
                    <li>• First row must contain headers</li>
                    <li>• Email addresses must be unique</li>
                  </ul>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full"
                >
                  <Button 
                    variant="outline" 
                    className="w-full text-sm"
                    onClick={() => {
                      // Create and download template CSV
                      const csvContent = "email,firstName,lastName,role\njohn@example.com,John,Doe,student\njane@example.com,Jane,Smith,faculty";
                      const blob = new Blob([csvContent], { type: 'text/csv' });
                      const url = window.URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'bulk_upload_template.csv';
                      a.click();
                      window.URL.revokeObjectURL(url);
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="truncate">Download Template</span>
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default BulkUploadPage;

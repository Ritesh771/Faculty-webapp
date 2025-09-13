import React, { useState, useRef } from 'react';
import { Camera, Upload, X, File, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Camera as CapacitorCamera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';

interface FileUploadProps {
  onFileSelect: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  showCamera?: boolean;
  className?: string;
}

interface UploadedFile {
  file: File;
  preview?: string;
  id: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  accept = "image/*,.pdf,.doc,.docx,.txt",
  multiple = false,
  maxSize = 10,
  showCamera = true,
  className = ""
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    // Validate file sizes
    const oversizedFiles = files.filter(file => file.size > maxSize * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      toast.error(`Some files exceed the ${maxSize}MB limit`);
      return;
    }

    const newUploadedFiles: UploadedFile[] = files.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
    }));

    if (multiple) {
      setUploadedFiles(prev => [...prev, ...newUploadedFiles]);
      onFileSelect([...uploadedFiles.map(f => f.file), ...files]);
    } else {
      setUploadedFiles(newUploadedFiles);
      onFileSelect(files);
    }
  };

  const handleCameraCapture = async () => {
    try {
      const image = await CapacitorCamera.getPhoto({
        quality: 85,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        saveToGallery: true
      });

      if (image.webPath) {
        // Convert to File object
        const response = await fetch(image.webPath);
        const blob = await response.blob();
        const file = new File([blob], `photo_${Date.now()}.jpg`, { type: 'image/jpeg' });

        const newFile: UploadedFile = {
          file,
          id: Math.random().toString(36).substr(2, 9),
          preview: image.webPath
        };

        if (multiple) {
          setUploadedFiles(prev => [...prev, newFile]);
          onFileSelect([...uploadedFiles.map(f => f.file), file]);
        } else {
          setUploadedFiles([newFile]);
          onFileSelect([file]);
        }

        toast.success('Photo captured successfully!');
      }
    } catch (error) {
      console.error('Camera error:', error);
      toast.error('Failed to capture photo');
    }
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => {
      const updated = prev.filter(f => f.id !== fileId);
      onFileSelect(updated.map(f => f.file));
      return updated;
    });
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex gap-2 flex-wrap">
        <Button
          type="button"
          variant="outline"
          onClick={openFileDialog}
          className="flex items-center gap-2"
        >
          <Upload className="h-4 w-4" />
          Upload Files
        </Button>

        {showCamera && (
          <Button
            type="button"
            variant="outline"
            onClick={handleCameraCapture}
            className="flex items-center gap-2"
          >
            <Camera className="h-4 w-4" />
            Take Photo
          </Button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileSelect}
        className="hidden"
      />

      {uploadedFiles.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {uploadedFiles.map((uploadedFile) => (
            <Card key={uploadedFile.id} className="relative">
              <CardContent className="p-4">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 h-6 w-6 p-0"
                  onClick={() => removeFile(uploadedFile.id)}
                >
                  <X className="h-4 w-4" />
                </Button>

                <div className="flex items-center gap-3">
                  {uploadedFile.preview ? (
                    <img
                      src={uploadedFile.preview}
                      alt="Preview"
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                      {uploadedFile.file.type.startsWith('image/') ? (
                        <ImageIcon className="h-6 w-6 text-gray-500" />
                      ) : (
                        <File className="h-6 w-6 text-gray-500" />
                      )}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {uploadedFile.file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
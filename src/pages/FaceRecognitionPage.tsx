
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Camera, ScanFace, CheckCircle, XCircle, History, Play, Square } from 'lucide-react';

const FaceRecognitionPage: React.FC = () => {
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<'success' | 'failed' | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // Mock data for scan history
  const scanHistory = [
    {
      id: 1,
      date: '2024-01-25',
      time: '09:15 AM',
      result: 'success',
      subject: 'Operating Systems',
      location: 'Room 301',
      confidence: 98.5
    },
    {
      id: 2,
      date: '2024-01-25',
      time: '11:30 AM',
      result: 'success',
      subject: 'Computer Networks',
      location: 'Room 405',
      confidence: 96.2
    },
    {
      id: 3,
      date: '2024-01-24',
      time: '02:00 PM',
      result: 'failed',
      subject: 'Database Systems',
      location: 'Room 302',
      confidence: 45.3
    },
    {
      id: 4,
      date: '2024-01-24',
      time: '09:00 AM',
      result: 'success',
      subject: 'Software Engineering',
      location: 'Room 403',
      confidence: 99.1
    },
  ];

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 640, 
          height: 480,
          facingMode: 'user'
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      
      setStream(mediaStream);
      setIsScanning(true);
      
      toast({
        title: "Camera Started",
        description: "Position your face in the frame for scanning",
      });
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsScanning(false);
    setScanResult(null);
  };

  const simulateScan = () => {
    // Simulate scanning process
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% success rate
      setScanResult(success ? 'success' : 'failed');
      
      if (success) {
        toast({
          title: "Scan Successful",
          description: "Face recognized successfully. Attendance marked.",
        });
      } else {
        toast({
          title: "Scan Failed",
          description: "Face not recognized. Please try again.",
          variant: "destructive",
        });
      }
    }, 2000);
  };

  const getResultColor = (result: string) => {
    switch (result) {
      case 'success': return 'bg-green-100 text-green-800 border-green-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const successCount = scanHistory.filter(s => s.result === 'success').length;
  const failedCount = scanHistory.filter(s => s.result === 'failed').length;

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
              Face Recognition
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Use face recognition for attendance marking
            </p>
          </div>
          <Badge variant="outline" className="flex items-center gap-2 w-fit">
            <ScanFace className="h-4 w-4" />
            Biometric System
          </Badge>
        </div>
      </motion.div>

      {/* Statistics */}
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
                <p className="text-sm text-gray-600">Successful Scans</p>
                <p className="text-2xl font-bold text-green-600">{successCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Failed Scans</p>
                <p className="text-2xl font-bold text-red-600">{failedCount}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-blue-600">
                  {((successCount / scanHistory.length) * 100).toFixed(1)}%
                </p>
              </div>
              <ScanFace className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Camera Interface */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Live Camera Feed
            </CardTitle>
            <CardDescription>
              Position your face clearly in the camera frame
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ aspectRatio: '4/3' }}>
                {isScanning ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <Camera className="h-16 w-16 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500">Camera not active</p>
                    </div>
                  </div>
                )}
                
                {isScanning && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-4 border-2 border-blue-500 rounded-lg opacity-75"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-32 h-32 border-2 border-green-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                )}
                
                {scanResult && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center text-white">
                      {scanResult === 'success' ? (
                        <>
                          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-2" />
                          <p className="text-lg font-semibold">Scan Successful!</p>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-2" />
                          <p className="text-lg font-semibold">Scan Failed</p>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                {!isScanning ? (
                  <Button onClick={startCamera} className="flex items-center gap-2">
                    <Play className="h-4 w-4" />
                    Start Camera
                  </Button>
                ) : (
                  <>
                    <Button onClick={simulateScan} disabled={scanResult !== null}>
                      <ScanFace className="h-4 w-4 mr-2" />
                      {scanResult ? 'Scanning...' : 'Scan Face'}
                    </Button>
                    <Button onClick={stopCamera} variant="outline">
                      <Square className="h-4 w-4 mr-2" />
                      Stop
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scan History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Scan History
            </CardTitle>
            <CardDescription>
              Recent face recognition attempts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {scanHistory.map((scan, index) => (
                <motion.div
                  key={scan.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border rounded-lg p-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{scan.subject}</span>
                        <Badge variant="outline" className={getResultColor(scan.result)}>
                          {scan.result === 'success' ? (
                            <CheckCircle className="h-3 w-3 mr-1" />
                          ) : (
                            <XCircle className="h-3 w-3 mr-1" />
                          )}
                          {scan.result}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600">{scan.location}</p>
                      <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                        <span>{scan.date} at {scan.time}</span>
                        <span>Confidence: {scan.confidence}%</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">For Best Results:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Ensure good lighting conditions</li>
                  <li>• Remove sunglasses or masks</li>
                  <li>• Look directly at the camera</li>
                  <li>• Keep your face centered in the frame</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Troubleshooting:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• If scan fails, try adjusting lighting</li>
                  <li>• Move closer or farther from camera</li>
                  <li>• Ensure camera permissions are granted</li>
                  <li>• Contact IT support for persistent issues</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default FaceRecognitionPage;

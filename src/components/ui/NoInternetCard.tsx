import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInternetConnectivity } from '@/hooks/useInternetConnectivity';

interface NoInternetCardProps {
  onRetry?: () => void;
}

export const NoInternetCard: React.FC<NoInternetCardProps> = ({ onRetry }) => {
  const { isOnline, isChecking, checkConnectivity } = useInternetConnectivity();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [wasOffline, setWasOffline] = useState(!isOnline);
  const [isReloading, setIsReloading] = useState(false);

  // Detect when internet comes back online
  useEffect(() => {
    if (isOnline && wasOffline && !showSuccessMessage) {
      // Internet just came back online
      setShowSuccessMessage(true);
      setWasOffline(false);

      // Auto-hide after 2 seconds with smooth animation
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 2000);
    } else if (!isOnline) {
      setWasOffline(true);
      setShowSuccessMessage(false);
    }
  }, [isOnline, wasOffline, showSuccessMessage]);

  const handleRetry = async () => {
    console.log('Reload button clicked');
    if (onRetry) {
      onRetry();
    }

    // Show reloading status for 2 seconds
    setIsReloading(true);
    setTimeout(async () => {
      setIsReloading(false);

      // Now check connectivity
      const connected = await checkConnectivity();
      console.log('Connectivity check result:', connected);
      if (connected && !showSuccessMessage) {
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 2000);
      }
    }, 2000);
  };

  return (
    <AnimatePresence>
      {(!isOnline || showSuccessMessage) && (
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{
            y: '100%',
            opacity: 0,
            transition: {
              duration: 0.8,
              ease: [0.4, 0, 0.2, 1] // Smooth ease-out curve for dissolve effect
            }
          }}
          transition={{
            type: 'spring',
            damping: 25,
            stiffness: 300,
            duration: 0.5,
          }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6 pointer-events-none"
        >
          <div className="max-w-md mx-auto pointer-events-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                transition: { delay: 0.2, duration: 0.3 }
              }}
              className={`bg-gradient-to-r ${showSuccessMessage ? 'from-green-500 via-green-600 to-green-700' : 'from-red-500 via-red-600 to-red-700'} rounded-2xl shadow-2xl border ${showSuccessMessage ? 'border-green-400/20' : 'border-red-400/20'} backdrop-blur-xl relative overflow-hidden`}
            >
              <div className="p-6 relative z-10">
                {/* Reloading progress indicator */}
                {isReloading && (
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2, ease: 'linear' }}
                    className="absolute top-0 left-0 h-1 bg-gradient-to-r from-blue-400 to-blue-500 rounded-t-2xl"
                  />
                )}

                {/* Success countdown indicator */}
                {showSuccessMessage && (
                  <motion.div
                    initial={{ width: '100%' }}
                    animate={{ width: '0%' }}
                    transition={{ duration: 2, ease: 'linear' }}
                    className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-300 to-green-400 rounded-t-2xl"
                  />
                )}

                {/* Header with icon */}
                <div className="flex items-center justify-center mb-4">
                  <motion.div
                    className="relative"
                    animate={showSuccessMessage ? {
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    } : {}}
                    transition={{
                      duration: 0.6,
                      ease: "easeInOut",
                      times: [0, 0.3, 0.6, 1]
                    }}
                  >
                    <div className={`absolute inset-0 ${showSuccessMessage ? 'bg-green-400/30' : 'bg-red-400/30'} rounded-full blur-xl animate-pulse`}></div>
                    <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-4">
                      {showSuccessMessage ? (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        >
                          <CheckCircle className="h-8 w-8 text-white" />
                        </motion.div>
                      ) : (
                        <WifiOff className="h-8 w-8 text-white" />
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <motion.div
                  className="text-center mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: showSuccessMessage ? 0.4 : 0.1, duration: 0.3 }}
                >
                  <motion.h3
                    className="text-xl font-bold text-white mb-2"
                    animate={showSuccessMessage ? {
                      scale: [1, 1.05, 1],
                    } : {}}
                    transition={{
                      duration: 0.8,
                      ease: "easeInOut",
                      delay: 0.2
                    }}
                  >
                    {showSuccessMessage ? 'Internet Connection Succeeded' : 'No Internet Connection'}
                  </motion.h3>
                  <motion.p
                    className={`${showSuccessMessage ? 'text-green-100' : 'text-red-100'} text-sm leading-relaxed`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: showSuccessMessage ? 0.6 : 0.2, duration: 0.3 }}
                  >
                    {showSuccessMessage ? 'You are back online!' : 'Poor network coverage detected. Please check your connection and try again.'}
                  </motion.p>
                </motion.div>

                {/* Status indicator */}
                {!showSuccessMessage && (
                  <div className="flex items-center justify-center gap-2 mb-6 p-3 bg-red-400/20 rounded-xl border border-red-300/30">
                    <AlertTriangle className="h-5 w-5 text-red-200" />
                    <span className="text-red-100 text-sm font-medium">
                      Some features may not work properly
                    </span>
                  </div>
                )}

                {/* Action buttons */}
                {!showSuccessMessage && (
                  <div className="flex gap-3 relative z-20">
                    <Button
                      onClick={handleRetry}
                      disabled={isChecking || isReloading}
                      className="flex-1 bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
                      size="lg"
                    >
                      {isReloading ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Reloading...
                        </>
                      ) : isChecking ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Checking...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Reload
                        </>
                      )}
                    </Button>
                  </div>
                )}

                {/* Connection status indicator */}
                <motion.div
                  className="mt-4 flex items-center justify-center gap-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: showSuccessMessage ? 0.8 : 0.3, duration: 0.3 }}
                >
                  {showSuccessMessage ? (
                    <motion.div
                      className="flex items-center gap-2"
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <motion.div
                        animate={{
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      >
                        <CheckCircle className="h-5 w-5 text-green-200" />
                      </motion.div>
                      <span className="text-green-200 text-xs font-medium">
                        Online
                      </span>
                    </motion.div>
                  ) : (
                    <>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-red-300 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                      <span className="text-red-200 text-xs font-medium">
                        Offline
                      </span>
                    </>
                  )}
                </motion.div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-2xl pointer-events-none">
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-16 h-16 bg-white/5 rounded-full blur-xl"></div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
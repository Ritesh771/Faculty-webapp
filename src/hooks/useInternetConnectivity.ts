import { useState, useEffect } from 'react';

export interface InternetStatus {
  isOnline: boolean;
  isChecking: boolean;
  lastChecked: Date | null;
}

export const useInternetConnectivity = (): InternetStatus & { checkConnectivity: () => Promise<boolean> } => {
  const [status, setStatus] = useState<InternetStatus>({
    isOnline: navigator.onLine,
    isChecking: false,
    lastChecked: null,
  });

  const checkConnectivity = async (): Promise<boolean> => {
    try {
      setStatus(prev => ({ ...prev, isChecking: true }));

      // Try to fetch a small resource from Google
      const response = await fetch('https://www.google.com/favicon.ico', {
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-cache',
        signal: AbortSignal.timeout(5000), // 5 second timeout
      });

      const isOnline = true; // If we get here, we have internet
      setStatus({
        isOnline,
        isChecking: false,
        lastChecked: new Date(),
      });

      return isOnline;
    } catch (error) {
      console.log('Internet check failed:', error);
      setStatus({
        isOnline: false,
        isChecking: false,
        lastChecked: new Date(),
      });
      return false;
    }
  };

  useEffect(() => {
    // Initial check
    checkConnectivity();

    // Set up periodic checks every 30 seconds
    const interval = setInterval(checkConnectivity, 30000);

    // Listen for online/offline events
    const handleOnline = () => {
      console.log('Browser reports online');
      checkConnectivity();
    };

    const handleOffline = () => {
      console.log('Browser reports offline');
      setStatus(prev => ({
        ...prev,
        isOnline: false,
        lastChecked: new Date(),
      }));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      clearInterval(interval);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return {
    ...status,
    checkConnectivity,
  };
};
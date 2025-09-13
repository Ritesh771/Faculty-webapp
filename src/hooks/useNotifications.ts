import { useEffect, useCallback } from 'react';
import { LocalNotifications } from '@capacitor/local-notifications';
import { playNotificationSound, playSuccessSound, playErrorSound, setSoundEnabled, isSoundEnabled } from '@/utils/soundManager';

interface NotificationOptions {
  title: string;
  body: string;
  id?: number;
  sound?: boolean;
  type?: 'default' | 'success' | 'error';
}

export const useNotifications = () => {
  // Request permissions for local notifications on mobile
  const requestPermissions = useCallback(async () => {
    try {
      const result = await LocalNotifications.requestPermissions();
      return result.display === 'granted';
    } catch (error) {
      console.warn('Local notifications not supported or permission denied');
      return false;
    }
  }, []);

  // Show notification with sound
  const showNotification = useCallback(async (options: NotificationOptions) => {
    const { title, body, id = Date.now(), sound = true, type = 'default' } = options;

    try {
      // Check if we're on mobile and have permissions
      const hasPermission = await requestPermissions();

      if (hasPermission) {
        // Use Capacitor Local Notifications for mobile
        await LocalNotifications.schedule({
          notifications: [{
            title,
            body,
            id,
            schedule: { at: new Date(Date.now() + 100) }, // Show immediately
            sound: sound ? 'notification.wav' : undefined,
            attachments: [],
            actionTypeId: '',
            extra: null
          }]
        });
      } else {
        // Fallback to browser notification API
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification(title, { body });
        }
      }

      // Play sound based on type
      if (sound && isSoundEnabled()) {
        switch (type) {
          case 'success':
            await playSuccessSound();
            break;
          case 'error':
            await playErrorSound();
            break;
          default:
            await playNotificationSound();
            break;
        }
      }
    } catch (error) {
      console.warn('Failed to show notification:', error);
    }
  }, [requestPermissions]);

  // Initialize notifications on mount
  useEffect(() => {
    const initNotifications = async () => {
      // Request browser notification permission
      if ('Notification' in window && Notification.permission === 'default') {
        await Notification.requestPermission();
      }

      // Request mobile permissions
      await requestPermissions();
    };

    initNotifications();
  }, [requestPermissions]);

  return {
    showNotification,
    requestPermissions,
    setSoundEnabled,
    isSoundEnabled
  };
};
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.myapp',
  appName: 'NeuroCampus',
  webDir: 'dist',
  plugins: {
    Camera: {
      allowEditing: true,
      saveToGallery: true,
      quality: 85
    },
    LocalNotifications: {
      smallIcon: 'ic_stat_icon_config_sample',
      iconColor: '#488AFF',
      sound: 'notification.wav'
    }
  }
};

export default config;

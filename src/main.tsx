
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// If running inside Capacitor native shell, ensure the StatusBar does not overlay the WebView.
// This prevents the app header from being drawn under the phone status bar on Android/iOS.
try {
  // Use dynamic import to avoid breaking web build when @capacitor/core isn't installed.
  // eslint-disable-next-line @typescript-eslint/no-floating-promises, @typescript-eslint/no-var-requires
  const maybeCapacitor = require('@capacitor/core');
  if (maybeCapacitor && maybeCapacitor.isNativePlatform) {
    try {
      // Import the StatusBar plugin if available
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { StatusBar, Style } = require('@capacitor/status-bar');
      // Disable overlay so the webview starts below the status bar area on supported platforms
      if (StatusBar && typeof StatusBar.setOverlaysWebView === 'function') {
        StatusBar.setOverlaysWebView({ overlay: false }).catch(() => {});
      }
      // Optionally set a default style if desired
      if (StatusBar && typeof StatusBar.setStyle === 'function') {
        StatusBar.setStyle({ style: Style.Dark }).catch(() => {});
      }
    } catch (e) {
      // Ignore if status-bar plugin isn't available
    }
  }
} catch (e) {
  // Not running in Capacitor environment or require failed — ignore
}

console.log('main.tsx loading...');

const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error('Root element not found!');
} else {
  console.log('Root element found, creating React root...');
  try {
    const root = createRoot(rootElement);
    console.log('React root created, rendering App...');
    root.render(<App />);
    console.log('App rendered successfully');
  } catch (error) {
    console.error('Error rendering app:', error);
  }
}

// Register service worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

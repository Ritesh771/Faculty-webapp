import { useState, useEffect } from 'react';

export function useSafeArea() {
  const [safeAreaInsets, setSafeAreaInsets] = useState({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  });

  useEffect(() => {
    // Function to get safe area insets from CSS variables
    const getSafeAreaInsets = () => {
      const root = document.documentElement;
      const computedStyle = getComputedStyle(root);

      const top = parseInt(computedStyle.getPropertyValue('--safe-top') || '0', 10);
      const bottom = parseInt(computedStyle.getPropertyValue('--safe-bottom') || '0', 10);
      const left = parseInt(computedStyle.getPropertyValue('--safe-left') || '0', 10);
      const right = parseInt(computedStyle.getPropertyValue('--safe-right') || '0', 10);

      return { top, bottom, left, right };
    };

    // Set initial values
    setSafeAreaInsets(getSafeAreaInsets());

    // Listen for orientation changes and viewport changes
    const handleResize = () => {
      setTimeout(() => {
        setSafeAreaInsets(getSafeAreaInsets());
      }, 100); // Small delay to ensure CSS variables are updated
    };

    const handleOrientationChange = () => {
      setTimeout(() => {
        setSafeAreaInsets(getSafeAreaInsets());
      }, 200); // Longer delay for orientation changes
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  return safeAreaInsets;
}
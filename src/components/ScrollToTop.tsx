import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top of the page
    window.scrollTo(0, 0);

    // Also scroll the main dashboard content area to top
    // This targets the scrollable div in DashboardLayout
    const mainScrollableContent = document.querySelector('.overflow-y-auto');
    if (mainScrollableContent) {
      mainScrollableContent.scrollTop = 0;
    }

    // Additional fallback: scroll any element with overflow auto/scroll
    const scrollableElements = document.querySelectorAll('[class*="overflow-y-auto"], [class*="overflow-y-scroll"]');
    scrollableElements.forEach(element => {
      (element as HTMLElement).scrollTop = 0;
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
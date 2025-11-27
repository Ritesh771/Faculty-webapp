import React, { createContext, useContext } from 'react';
import { useTheme as useNextTheme } from 'next-themes';

const ThemeContext = createContext<{ theme: string | undefined }>({ theme: 'light' });

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useNextTheme();

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
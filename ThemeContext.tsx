import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';

export type Theme = 'light' | 'dark' | 'system';

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  setTheme: () => {},
  isDark: false,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('system');

  const getIsDark = (): boolean => {
    if (theme === 'light') return false;
    if (theme === 'dark') return true;
    return Appearance.getColorScheme() === 'dark';
  };

  const [isDark, setIsDark] = useState(getIsDark());

  useEffect(() => {
    const listener = Appearance.addChangeListener(() => {
      if (theme === 'system') {
        setIsDark(Appearance.getColorScheme() === 'dark');
      }
    });

    return () => listener.remove();
  }, [theme]);

  useEffect(() => {
    setIsDark(getIsDark());
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

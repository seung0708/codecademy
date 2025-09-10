import React, { useState, useEffect, createContext, useContext } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(true);

    const toggleTheme = () => setIsDark((prev) => !prev);

    useEffect(() => {
        const body = document.body;
        if (isDark) {
          body.classList.add("dark");
          body.classList.remove("light");
        } else {
          body.classList.remove("dark");
          body.classList.add("light");
        }
      }, [isDark]);

    return (
        <ThemeContext.Provider value={{isDark, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

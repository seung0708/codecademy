import React, { useState, useEffect, createContext, useContext } from 'react';
import { Sun, Moon } from 'lucide-react';

ThemeContext = createContext();

const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(true);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
      };
    
    const theme = {
        isDark: darkMode,
        toggleTheme,
        colors: darkMode ? {
            primary: '#06b6d4',
            secondary: '#8b5cf6',
            accent: '#ec4899',
            bg: '#0f172a',
            bgSecondary: 'rgba(30, 41, 59, 0.5)',
            bgCard: 'rgba(51, 65, 85, 0.5)',
            text: '#ffffff',
            textSecondary: '#cbd5e1',
            textMuted: '#64748b',
            border: '#475569'
        } : {
            primary: '#0891b2',
            secondary: '#7c3aed',
            accent: '#db2777',
            bg: '#ffffff',
            bgSecondary: 'rgba(248, 250, 252, 0.8)',
            bgCard: 'rgba(241, 245, 249, 0.8)',
            text: '#1e293b',
            textSecondary: '#475569',
            textMuted: '#94a3b8',
            border: '#e2e8f0'
        }
    };
    
    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
}
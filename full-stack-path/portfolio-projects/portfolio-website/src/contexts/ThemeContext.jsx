import React, { useState, useEffect, createContext, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(false);

    const toggleTheme = () => setIsDark(prev => !prev);

    const colors = isDark ? {
        bg: "#000000",
        text: "#ffffff",
        link: "#8b5cf6",
    } : {
        bg: "#ffffff",
        text: "#1e293b",
        link: "#7c3aed",
    };

    useEffect(() => {
        document.body.className = isDark ? "dark" : "light";
    }, [isDark]);
 
    return (
        <ThemeContext.Provider value={{isDark, toggleTheme, colors}}>
            {children}
        </ThemeContext.Provider>
    );
}


export const useTheme = () => useContext(ThemeContext);
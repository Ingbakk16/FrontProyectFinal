import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

const themeValue = localStorage.getItem("theme");

export const ThemeContextProvider = ({ children }) => {
    const [theme, setTheme] = useState(themeValue ?? "default"); // Por defecto

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.setAttribute("data-bs-theme", "dark");
        } else {
            document.documentElement.removeAttribute("data-bs-theme"); // Remueve el modo oscuro
        }
    }, [theme]);

    const toggleTheme = () => {
        if (theme === "default") {
            setTheme("dark");
            localStorage.setItem("theme", "dark");
        } else {
            setTheme("default");
            localStorage.setItem("theme", "default");
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

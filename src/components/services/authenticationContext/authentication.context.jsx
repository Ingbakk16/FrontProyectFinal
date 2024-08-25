import { createContext, useState } from "react";

export const AuthenticationContext = createContext();

const userValue = JSON.parse(localStorage.getItem("user"));

export const AuthenticationContextProvider = ({ children }) => {
    const [user, setUser] = useState(userValue);

    const handleLogin = (email) => {
        const newUser = { email };
        localStorage.setItem("user", JSON.stringify(newUser));
        setUser(newUser);
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthenticationContext.Provider value={{ user, handleLogin, handleLogout }}>
            {children}
        </AuthenticationContext.Provider>
    );
};

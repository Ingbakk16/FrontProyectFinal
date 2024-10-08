import { createContext, useState } from "react";

export const AuthenticationContext = createContext();

// Obtener datos del localStorage
const storedUser = JSON.parse(localStorage.getItem("user"));
const storedToken = localStorage.getItem("token");

export const AuthenticationContextProvider = ({ children }) => {
    // Almacenar tanto el usuario como el token en el estado
    const [user, setUser] = useState(storedUser);
    const [token, setToken] = useState(storedToken);

    // Manejar el inicio de sesión, almacenando el token y el usuario
    const handleLogin = (username, token) => {
        const newUser = { username };
        localStorage.setItem("user", JSON.stringify(newUser));
        // localStorage.setItem("token", token);  // Almacenar el token en el localStorage
        setUser(newUser);
        setToken(token);  // Guardar el token en el estado
    };

    // Manejar el cierre de sesión, eliminando el token y el usuario
    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);  // Limpiar el token del estado
    };

    return (
        <AuthenticationContext.Provider value={{ user, token, handleLogin, handleLogout }}>
            {children}
        </AuthenticationContext.Provider>
    );
};

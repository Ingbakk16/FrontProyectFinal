import { createContext, useState, useEffect } from "react";

export const AuthenticationContext = createContext();

const storedUser = JSON.parse(localStorage.getItem("user"));
// const storedToken = localStorage.getItem("token");

export const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isWorker, setIsWorker] = useState(false); 

  // Verificar si el usuario es un trabajador
  useEffect(() => {
    const fetchUserRole = async () => {
      if (!token) return;

      try {
        const response = await fetch('http://localhost:8081/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();
        if (data.role?.name === "ROLE_WORKER") {
          setIsWorker(true); 
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchUserRole();
  }, [token]); 
  

  const handleLogin = (username, tokenVal) => {
    const newUser = { username };
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
    setToken(tokenVal);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    setIsWorker(false); 
  };

  return (
    <AuthenticationContext.Provider value={{ user, token, handleLogin, handleLogout, isWorker }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

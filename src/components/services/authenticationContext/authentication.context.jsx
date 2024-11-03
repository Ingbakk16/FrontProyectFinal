import { createContext, useState, useEffect } from "react";

export const AuthenticationContext = createContext();

const storedUser = JSON.parse(localStorage.getItem("user"));
const storedToken = localStorage.getItem("token");

export const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(storedToken);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchUserRole = async () => {
      if (!token) {
        setLoading(false); // Set loading to false if no token is present
        return;
      }

      try {
        setLoading(true);
        const response = await fetch("http://localhost:8081/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          const userRole = data.role?.name;
          setRole(userRole); // Update role state directly

          
        } else {
          console.error("Failed to fetch user role:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
      finally {
        setLoading(false); // End loading after fetching role
      }
    };

    fetchUserRole();
  }, [token]);

  const handleLogin = (username, tokenVal) => {
    const newUser = { username };
    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("token", tokenVal);
    setUser(newUser);
    setToken(tokenVal);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    setRole(null); // Clear role on logout
    setLoading(false); // Clear loading on logout
  };

  return (
    <AuthenticationContext.Provider value={{ user, token, role, loading, handleLogin, handleLogout }}>
      {children}
    </AuthenticationContext.Provider>
  );
};


import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is logged in by making an API request
    axios.get("/api/check-session")  // Assuming there's a backend endpoint to check session
      .then(response => {
        setUser(response.data.user);  // Set the user state if session exists
      })
      .catch(error => {
        console.log("No user session");  // No session found
      });
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post("/api/loginForm", { email, password });
      setUser({ email, userId: response.data.userId });  // Store user info in state
      return response.data;  // Return the login response data
    } catch (error) {
      console.error("Login error:", error);
      return error.response.data;  // Return the error data from the server
    }
  };

  const logout = () => {
    setUser(null);  // Clear the user from state
    // Optionally, you can also make a backend logout request here
    // axios.post("/api/logout");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}  {/* Render children components */}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext in other components
export const useAuth = () => React.useContext(AuthContext);

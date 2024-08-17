import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";

export const AuthContext = createContext();

// Authentication for thhe user
export const AuthProvider = ({ children }) => {
  // Cuurent user information will be store here
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Checks if there is an existing user logged-in tthe system
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  // This function will handle User login
  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    navigate("/");
  };

  // The function to handle user Logout
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  // The function will help to handle to update user's nformation
  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
 
  // protectedRoute to restrict authorization to other routes
export const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

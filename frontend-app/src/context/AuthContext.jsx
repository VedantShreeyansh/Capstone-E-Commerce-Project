import React, { createContext, useState, useContext } from "react";
import User from "../../../backend-app/models/User";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser || storedUser === "undefined") return null;
    try {
      return storedUser ? JSON.parse(storedUser) : null; // Fallback to null if no user is stored
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      return null; // Return null if parsing fails
    }
  });

  const login = (userData) => {
    if (!userData) {
      console.error("Invalid user data provided to login");
      return;
    }

    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
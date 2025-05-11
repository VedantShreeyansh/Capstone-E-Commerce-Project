import React, { useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "./src/context/AuthContext";

const AuthWrapper = ({ children }) => {
    const location = useLocation();
    const { logout, isLoggedIn } = useAuth();
    const [isStateUpdated, setIsStateUpdated] = useState(false);
    
    useEffect(() => {
        // Clear local storage and update state when navigating to the login page
        if (location.pathname === "/login") {
          localStorage.clear();
          logout(); // Update the application state
        }
        setIsStateUpdated(true);
      }, [location, logout]);

      if (!isStateUpdated) {
        return null; 
      }

    // if (location.pathname === "/login" && isLoggedIn) {
    //      return <Navigate to="/home" />;
    // }

    return children;
};

export default AuthWrapper;
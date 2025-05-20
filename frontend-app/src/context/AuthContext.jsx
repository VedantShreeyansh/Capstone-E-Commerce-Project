import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

// Removed duplicate useAuth definition

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [profilePic, setProfilePic] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    setProfilePic(userData.profilePic || null);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setProfilePic(null);
    localStorage.clear();
  };

  useEffect(() =>{
    const isAuthenticated = localStorage.getItem("isAuthenticated")=== "true";
    setIsLoggedIn(isAuthenticated);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
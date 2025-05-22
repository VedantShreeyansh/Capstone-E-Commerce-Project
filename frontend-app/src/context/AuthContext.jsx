import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/CartSlice";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Removed duplicate useAuth definition

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [profilePic, setProfilePic] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    setProfilePic(userData.profilePic || null);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("user", JSON.stringify(userData));

    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      dispatch({ type: "cart/setCart", payload: JSON.parse(savedCart) })
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setProfilePic(null);

    localStorage.clear();
    dispatch(clearCart());
  };

  const fetchProfilePic = async () => {
    if (user?.email) {
      try {
        const res = await axios.get(`${backendUrl}/api/auth/profile`, {
          params: { email: user.email },
          withCredentials: true,
        });
        setProfilePic(`${backendUrl}${res.data.profilePic}`);
      } catch (err) {
        console.error("Error fetching profile picture: ", err.response?.data?.message || err.message);
      }
    }
  };

  const updateProfilePic = (newProfilePic) => {
    setProfilePic(newProfilePic);
    const updatedUser = { ...user, profilePic: newProfilePic};
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };



  // const fetchCart = async () => {
  //   const res = await axios.get(`${backendUrl}/api/auth/cart`, { withCredentials: true });
  //   dispatchEvent(setCart(res.data));
  // };

  useEffect(() =>{
    const isAuthenticated = localStorage.getItem("isAuthenticated")=== "true";
    setIsLoggedIn(isAuthenticated);
  }, []);

  useEffect(() => {
    if (user) {
      fetchProfilePic();
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, profilePic, isLoggedIn, login, logout, setProfilePic: updateProfilePic }}>
      {children}
    </AuthContext.Provider>
  );
};

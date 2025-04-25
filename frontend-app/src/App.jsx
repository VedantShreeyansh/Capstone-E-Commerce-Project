import React from "react";
import NavBar from "./components/Navbar";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Login from "./components/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Checkout from "./components/Checkout";
import Register from "./components/Register";
import Profile from "./components/Profile";


const App = () => {
  return (
    <AuthProvider>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
        <Route path="/cart" element={<ProtectedRoutes><Cart /></ProtectedRoutes>} />
        <Route path="/checkout" element={<ProtectedRoutes><Checkout /></ProtectedRoutes>} />
        <Route path="/profile" element={<ProtectedRoutes><Profile /></ProtectedRoutes>} />
        <Route path="/register" element={<Register />} />
        
    </Routes>
    </Router>
</AuthProvider>
  );
};
export default App;
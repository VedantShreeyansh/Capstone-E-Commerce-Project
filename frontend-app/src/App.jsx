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
import AdminDashboard from "./components/adminDashboard";
import BuyerDashboard from "./components/BuyerDashboard";
import SellerDashboard from "./components/SellerDashboard";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import AuthWrapper from "../AuthWrapper";
import ProductDetails from "./components/ProductDetails";

const App = () => {
  return (
    <AuthProvider>
    <Router>
    <AuthWrapper>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
        <Route path="/cart" element={<ProtectedRoutes><Cart /></ProtectedRoutes>} />
        <Route path="/checkout" element={<ProtectedRoutes><Checkout /></ProtectedRoutes>} />
        <Route path="/profile" element={<ProtectedRoutes><Profile /></ProtectedRoutes>} />
        <Route path="/product/:id" element={<ProtectedRoutes><ProductDetails /></ProtectedRoutes>} />
        <Route path="/admin/dashboard" element={<ProtectedRoutes><AdminDashboard /></ProtectedRoutes>} />
        <Route path="/buyer/dashboard" element={<ProtectedRoutes><BuyerDashboard /></ProtectedRoutes>} />
        <Route path="/seller/dashboard" element={<ProtectedRoutes><SellerDashboard /></ProtectedRoutes>} />
        <Route path="/register" element={<Register />} />
    </Routes>
    </AuthWrapper>
    </Router>
</AuthProvider>
  );
};
export default App;
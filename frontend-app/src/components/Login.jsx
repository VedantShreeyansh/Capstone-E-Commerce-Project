// src/pages/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Use the context

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth(); // Use login from AuthContext
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      if (res.data.user) {
        login(res.data.user); // Ensure res.data.user contains valid user data
        navigate("/home");
      } else {
        throw new Error("Invalid user data received from the server.");
      }
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed");
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="p-8 max-w-md mx-auto">
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="mb-4 w-full p-2 border" />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="mb-4 w-full p-2 border" />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Login</button>
    </form>
  );
};

export default Login;
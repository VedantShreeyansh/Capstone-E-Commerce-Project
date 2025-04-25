import React from "react";
import {useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
    const { user, login } = useAuth();   // custom hook
    const navigate = useNavigate();
    const [profile, setProfile] = useState({ email: ""});
    const [newUsername, setNewUsername] = useState("");

    useEffect(() => {
        if (!user){
            navigate("/login");
        } else {
          console.log("User from useAuth:", user);
        }
    }, [user, navigate]);

    // Fetch profile details
    useEffect(() => {
        const fetchProfile = async () => {
          try {
            console.log("Fetching profile for email:", user.email);
            const res = await axios.get("http://localhost:5000/api/auth/profile", {
              params: { email: user.email }, 
            });
            console.log("Profile fetched:", res.data);
            setProfile({ email: res.data.email });
            setNewUsername(res.data.username); // Pre-fill the username field
          } catch (err) {
            console.error("Error fetching profile:", err.response?.data || err.message);
            alert(err.response?.data?.message || "Error fetching profile");
          }
        };
        if (user && user.email) fetchProfile();
      }, [user]);

      // Updated username
      const handleUpdate = async () => {
        try {
            console.log("Updating Profile:", { email: profile.email,username: newUsername });

            const res = await axios.patch("http://localhost:5000/api/auth/profile", {
              email: profile.email,
              username: newUsername,
            });
            alert(res.data.message);
            alert(res.data.user);
        } catch (err) {
            console.error("Error updating the username", err.response?.data || err.message);
            alert(err.response?.data?.message || "Error updating username");
        }
      };

      return (
        <div className="p-8 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Profile</h1>

            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Email:</label>
                <input type="email" value={profile.email} disabled className="w-full p-2 border bg-gray-100 cursor-not-allowed"
                />
            </div>
            <div className="mb-4">
                <label classname="block text-gray-700 font-bold mb-2">Password:</label>
                <input type="password" value={profile.password} disabled className="w-full p-2 border bg-gray-100 cursor-not-allowed" 
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Username: </label>
                <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)}
                className="w-full p-2 border"
                />
            </div>
            <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded">
                Update Username
            </button>
            </div>
      );
};

export default Profile;
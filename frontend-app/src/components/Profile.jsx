import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import store from "../redux/Store";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ email: "", username: "", profilePic: "" });
  const [newUsername, setNewUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://capstone-e-commerce-project.onrender.com";

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Fetch profile details from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("Fetching profile from:", `${backendUrl}/api/auth/profile`);
        const res = await axios.get(`${backendUrl}/api/auth/profile`, {
          params: { email: user?.email },
          withCredentials: true,
        });
        console.log("Profile response:", res.data);
        setProfile(res.data);
        setNewUsername(res.data.username);
      } catch (err) {
        console.error("Error fetching profile:", err.response?.data?.message || err.message);
        if (err.response?.status === 401) {
          logout();
          navigate("/login");
        }
      }
    };

    if (user?.email) fetchProfile();
  }, [user]);

  const handleUpdate = async () => {
    if (!profile.email) return alert("Email missing. Please log in again.");
    try {
      const res = await axios.patch(
        `${backendUrl}/api/auth/profile`,
        { email: profile.email, username: newUsername },
        { withCredentials: true }
      );
      alert(res.data.message);
      setProfile((prev) => ({ ...prev, username: newUsername }));
    } catch (err) {
      console.error("Error updating username:", err.response?.data?.message || err.message);
    }
  };

  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select a file.");
    if (!profile.email) return alert("Email missing. Please log in again.");

    const formData = new FormData();
    formData.append("profilePic", selectedFile);
    formData.append("email", profile.email);

    try {
      const res = await axios.post(`${backendUrl}/api/auth/upload-pic`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      alert(res.data.message);

      setProfilePic(`${backendUrl}${res.data.profilePic}`);

      const updatedProfile = await axios.get(`${backendUrl}/api/auth/profile`, {
        params: { email: profile.email },
        withCredentials: true,
      });
      setProfile(updatedProfile.data);
    } catch (err) {
      console.error("Upload error:", err.response?.data?.message || err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${backendUrl}/api/auth/logout`, {}, { withCredentials: true });
      logout(); // Clear user from context + localStorage
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative">
          <img
            src={
              profile.profilePic
                ? `${backendUrl}${profile.profilePic}`
                : "https://via.placeholder.com/150"
            }
            className="w-24 h-24 bg-gray-300 rounded-full object-cover"
            alt="Profile"
          />
          <label htmlFor="fileInput" className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer">
            +
          </label>
          <input id="fileInput" type="file" onChange={handleFileChange} className="hidden" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Profile</h1>
          <p className="text-gray-600">Manage your account details</p>
        </div>
      </div>

      <button
        onClick={handleUpload}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
      >
        Upload Profile Picture
      </button>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Email:</label>
        <input
          type="email"
          value={profile.email}
          disabled
          className="w-full p-2 border bg-gray-100 cursor-not-allowed rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Username:</label>
        <input
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex space-x-4">
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Username
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;

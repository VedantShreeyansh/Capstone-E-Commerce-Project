import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ email: "", username: "", profilePic: "" });
  const [newUsername, setNewUsername] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          params: { email: user.email },
        });
        setProfile(res.data);
        setNewUsername(res.data.username);
      } catch (err) {
        alert(err.response?.data?.message || "Error fetching profile");
      }
    };
    if (user && user.email) fetchProfile();
  }, [user]);

  const handleUpdate = async () => {
    try {
      const res = await axios.patch("http://localhost:5000/api/auth/profile", {
        email: profile.email,
        username: newUsername,
      });
      alert(res.data.message);
      setProfile((prev) => ({ ...prev, username: newUsername }));
    } catch (err) {
      alert(err.response?.data?.message || "Error updating username");
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("profilePic", selectedFile);
    formData.append("email", profile.email);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/upload-pic", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(res.data.message);
      setProfile((prev) => ({ ...prev, profilePic: `http://localhost:5000${res.data.profilePic}`}));
    } catch (err) {
      alert(err.response?.data?.message || "Error uploading profile picture");
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <div className="flex items-center space-x-4 mb-6">
      <div className="relative">
  {profile.profilePic ? (
    <img
      src={`http://localhost:5000${profile.profilePic}`}  // Use the full URL
      className="w-24 h-24 bg-gray-300 rounded-full object-cover"
    />
  ) : (
    <img
      src="https://via.placeholder.com/150"
      alt="Default Profile"
      className="w-24 h-24 bg-gray-300 rounded-full object-cover"
    />
  )}
  <label
    htmlFor="fileInput"
    className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer"
  >
    +
  </label>
  <input
    id="fileInput"
    type="file"
    onChange={handleFileChange}
    className="hidden"
  />
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
        <label className="block text-gray-700 font-bold mb-2">Password:</label>
        <input
          type="password"
          value="******"
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
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
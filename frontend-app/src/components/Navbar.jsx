import React, {useRef, useEffect, useState} from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSelector } from "react-redux";
import axios from "axios";

const NavBar = () => {
  const cart = useSelector((state) => state.cart);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const searchQueryRef = useRef("");
  const profilePicRef = useRef("");
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);
  
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  useEffect(() => {
    const fetchProfilePic = async () => {
      if (user && user.email) {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          params: { email: user.email },
        });
        profilePicRef.current = `http://localhost:5000${res.data.profilePic}`;
      } catch (err) {
        console.error("Error fetching profile picture:", err);
      }
     }
    };
    fetchProfilePic();
  }, [user]);


  const handleSearchChange = (e) => {
    searchQueryRef.current = e.target.value;
    navigate(`/home?search=${searchQueryRef.current}`);
  }


  return (
    <nav className="bg-gray-900 p-4 text-white flex justify-between items-center shadow-lg">
      <h2 className="text-2xl font-bold">24x7-Shop</h2>
    <div className="flex items-center space-x-6">
        {/* Search Bar */}
        {!isAuthPage && isLoggedIn && (
          <>
          <input
          type="text"
          placeholder="Search products..."
          onChange={handleSearchChange}
          className="p-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <ul className="flex space-x-6">
          <li>
            <Link to="/home" className="hover:text-yellow-400">Home</Link>
          </li>
          <li>
            <Link to="/cart" className="hover:text-yellow-400 flex items-center">
              Cart
              {totalItems > 0 && (
                <span className="bg-red-500 text-white rounded-full px-2 ml-2 text-sm">
                  {totalItems}
                </span>
              )}
            </Link>
          </li>
          {/* <ul className="flex justify-between">
          <li>
            <Link to="/login" className="me-10 pl-2 space-x-5 hover:text-yellow-400">Login</Link>
          </li>
          <li>
            <Link to="/register" className="me-10 space-x-2 hover:text-yellow-400">Register</Link>
          </li>
          </ul> */}
          {/* Role-Based Links */ }
          {user?.role === "admin" && (
            <li>
               <Link to="/admin/dashboard" className="hover:text-yellow-400">
                  Admin Dashboard
               </Link>
            </li>
          )}
          {user?.role === "seller" && (
            <li>
                <Link to="/seller/dashboard" className="hover:text-yellow-400">
                 Seller Dashboard
                 </Link>
            </li>
          )}
          {user?.role === "buyer" && (
            <li>
                 <Link to="/buyer/dashboard" className="hover:text-yellow-400">
                  Buyer Dashboard
                  </Link>
            </li>
          )}
        </ul>
        {/* Profile Icon */}
        {profilePicRef.current ? (
          <img
            src={profilePicRef.current}
            className="w-10 h-10 rounded-full object-cover cursor-pointer"
            onClick={() => navigate("/profile")}
          />
        ) : (
          <img
            src="https://via.placeholder.com/150"
            className="w-10 h-10 rounded-full object-cover  cursor-pointer"
            onClick={() => navigate("/profile")}
          />
        )} 
         </>
        )}
        {!isLoggedIn && (
          <>
          <ul className="flex space-x-6">
            <li>
            <Link to="/login" className="hover:text-yellow-400">
              Login
            </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-yellow-400">
              Register
              </Link>
            </li>
          </ul>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
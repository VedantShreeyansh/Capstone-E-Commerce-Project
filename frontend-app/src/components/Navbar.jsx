import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = () => {
  const cart = useSelector((state) => state.cart);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <h2 className="text-2xl font-bold">Weekdays-6-Shop</h2>
      <ul className="flex space-x-4">
        <li>
          <Link to="/home" className="hover:text-yellow-200">Home</Link>
        </li>
        <li>
          <Link to="/cart" className="hover:text-yellow-200">
            Cart
            {totalItems > 0 && (
              <span className="bg-red-500 text-white rounded-full px-2 ml-2">
                {totalItems}
              </span>
            )}
          </Link>
        </li>
        <li>
          <Link to="/login" className="hover:text-yellow-200">Login</Link>
        </li>
        <li>
          <Link to="/register" className="hover:text-yellow-200">Register</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
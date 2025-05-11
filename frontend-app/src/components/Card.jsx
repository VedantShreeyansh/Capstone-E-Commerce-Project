import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increaseQuantity, decreaseQuantity } from "../redux/CartSlice";
import { Link } from "react-router-dom";

const Card = ({ productObj }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart || []);

  // Check if the product is already in the cart
  const productInCart = cart.find((item) => item.id === productObj.id);

  const {id, title, discountedPercentage, category, price, thumbnail, rating } = productObj;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-72 hover:shadow-lg transition-shadow duration-300">
      <Link to={`/product/${id}`}>
      <figure className="w-full h-48 overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={thumbnail}
          alt={title}
        />
      </figure>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="mt-1 text-sm text-gray-600">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
            {category}
          </span>
        </p>
        <p className="mt-2 text-sm text-gray-700">Rating: {rating} ⭐</p>
        <p className="mt-2 text-xl font-bold text-gray-900">${price}</p>

        {/* Increment and decrement buttons */}
        {productInCart ? (
          <div className="flex items-center mt-4 justify-between">
            <button
              onClick={() => dispatch(decreaseQuantity(productObj))}
              className="px-3 py-2 bg-gray-200 rounded-lg"
            >
              -
            </button>

            <span>{productInCart.quantity}</span>

            <button
              onClick={() => dispatch(increaseQuantity(productObj))}
              className="px-3 py-2 bg-gray-200 rounded-lg"
            >
              +
            </button>
          </div>
        ) : (
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => dispatch(addToCart(productObj))}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium"
            >
              Add to Cart
            </button>
          </div>
        )}
      </div>
      </Link>
    </div>
  );
};

export default Card;
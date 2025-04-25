import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity } from "../redux/CartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cart || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calculate total amount
  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Add items to proceed to checkout.");
      return;
    }
    navigate("/checkout"); // Navigate to the checkout page
  };
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">My Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-4"
            >
              {/* Product Thumbnail */}
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-16 h-16 object-cover rounded"
              />

              {/* Product Details */}
              <div className="flex-1 ml-4">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-sm text-gray-600">{item.category}</p>
                <p className="text-sm text-gray-700">
                  Price: ${item.price.toFixed(2)}
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => dispatch(decreaseQuantity(item))}
                  className="px-3 py-2 bg-gray-200 rounded-lg"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => dispatch(increaseQuantity(item))}
                  className="px-3 py-2 bg-gray-200 rounded-lg"
                >
                  +
                </button>
              </div>

              {/* Subtotal */}
              <p className="text-sm font-semibold">
                ${item.price * item.quantity}
              </p>
            </div>
          ))}

          {/* Total Amount */}
          <div className="mt-6 text-right">
            <h2 className="text-xl font-bold">
              Total: ${totalAmount.toFixed(2)}
            </h2>
          </div>
        </div>
      )}

      <button onClick={handleCheckout} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 right-0">
       PROCEED TO CHECKOUT
       </button>
    </div>
  );
};

export default Cart;
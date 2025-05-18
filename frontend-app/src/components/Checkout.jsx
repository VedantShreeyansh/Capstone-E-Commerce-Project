import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";

const Checkout = () => {
const navigate = useNavigate();
const cart = useSelector((state) => state.cart || []);
console.log(cart);

// const dispatch = useDispatch();

const handlePayment = async () => {
  try {
    const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const order = {
      id: "order_placeholderID",
      amount: totalAmount * 100,
      currency: "INR",
    };

    const options = {
      key: "rzp_test_placeholderKeyID",
      amount: order.amount,
      currency: order.currency,
      name: "24x7 Shop",
      description: "Test Transaction",
      order_id: order.id,
      handler: function (response) {
        alert("Payment Successful! (Simulated");
        console.log(response);
        navigate("/home");
      },
      prefill: {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "9991221291",
      },
      theme: {
        color: "#3399cc",
      },
    };

    console.log("Razorpay options", { ...options, totalAmount });
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (err) {
    console.error("Error initiating payment:", err.message);
  }
}

const totalAmount = cart.reduce( (acc, item) => acc + item.price * item.quantity, 0);
const formattedTotalAmount = totalAmount.toFixed(2);

  return (
  <div className="h-screen flex items-center justify-center bg-gray-100">
    <div className="card bg-white shadow-2xl rounded-lg w-96 p-8">
       <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Checkout</h1>
          <h2 className="text-lg text-gray-600 mb-4 text-center">You are about to pay</h2>
          <p className="text-2xl font-semibold text-gray-800 mb-6 text-center">₹{formattedTotalAmount}</p>
    <div className="flex justify-center ">
          <button
            onClick={handlePayment}
            className="bg-green-500 text-white w-80 py-3 rounded flex items-center justify-center space-x-2"
          >
          <FontAwesomeIcon  icon={faCreditCard} />
           <span>Pay Now</span> 
          </button>
    </div>
        </div>
    </div>
  );
};

export default Checkout
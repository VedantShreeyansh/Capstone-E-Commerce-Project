import React from 'react'

const BuyerDashboard = () => {

  return (
    <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Buyer Dashboard</h1>
        <div className="space-y-6">
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-xl font-bold mb-4">Order History</h2>
            <p className="text-gray-600">You have no orders yet.</p>
          </div>

          <div className="bg-white p-6 shadow-lg rounded-lg">
             <h2 className="text-xl font-bold mb-4">Wishlist</h2>
             <p className="text-gray-600">Your wishlist is empty</p>
          </div>

          <div className="bg-white p-6 shadow-lg rounded-lg">
              <h2 className="text-xl font-bold mb-4">Recommended Products</h2>
              <p className="text-gray-600">No recommendations available at the moment.</p>
          </div>
        </div>
    </div>
  );
};

export default BuyerDashboard;
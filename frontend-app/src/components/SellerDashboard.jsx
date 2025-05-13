import React from 'react'

const SellerDashboard = () => {

  return (
    <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Seller Dashboard</h1>
        <div className="space-y-6">
            <div className="bg-white p-6 shadow-lg rounded-lg">
                <h2 className="text-xl font-bold mb-4">Manage Products</h2>
                <p className="text-gray-600">Add, edit, or delete your products here.</p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600">
                    Manage Products
                </button>
            </div>

             {/* View Sales */}
            <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-xl font-bold mb-4">View Sales</h2>
            <p className="text-gray-600">Check your sales performance and analytics.</p>
            <button className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600">
                View Sales
            </button>
            </div>

            <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-xl font-bold mb-4">Support</h2>
            <p className="text-gray-600">Contact support for any assistance.</p>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded mt-4 hover:bg-yellow-600">
                Contact Support
            </button>
            </div>
        </div>
    </div>
  );
};

export default SellerDashboard
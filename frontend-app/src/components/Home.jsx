import React, { useState, useEffect } from "react";
import Card from "./Card.jsx";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("default");
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products/list");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err.message);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = ["All", ...new Set(products.map((product) => product.category))];

  const categoryFilteredProducts =
    selectedCategory === "All"
      ? filteredProducts
      : filteredProducts.filter((product) => product.category === selectedCategory);

  const sortedProducts = [...categoryFilteredProducts].sort((a, b) => {
    if (sortOption === "priceLowToHigh") {
      return a.price - b.price;
    } else if (sortOption === "priceHighToLow") {
      return b.price - a.price;
    } else if (sortOption === "ratingHighToLow") {
      return b.rating - a.rating;
    }
    return 0;
  });

  return (
    <>
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-8 rounded-lg mb-8 shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Welcome to 24x7 Shop</h1>
        <p className="text-lg">Discover the best deals on your favorite products!</p>
        <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded">
          Shop Now
        </button>
      </div>

      <div className="flex justify-center mb-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-center mb-4">
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="default">Default</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
          <option value="ratingHighToLow">Rating: High to Low</option>
        </select>
      </div>

      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {sortedProducts.map((product, index) => (
            <Card key={index} productObj={product} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600 mt-8">
          <h2 className="text-2xl font-bold">Product not found</h2>
          <p className="text-lg">Try searching for something else</p>
        </div>
      )}
    </>
  );
};

export default Home;
import React, { useState, useEffect } from "react"; // Import useState
import Card from "./Card.jsx";
import { useLocation } from "react-router-dom";
import products from "../../../backend-app/data/product.js";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("default"); // first we define a state for implementing sorting feature
  const [filteredProducts, setFilteredProducts] = useState(products);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    const filtered = products[0].products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery]);

  // Extract unique categories from the products array
  const categories = [
    "All",
    ...new Set(products[0].products.map((product) => product.category)),
  ];

  // Filter products based on the selected category
  const categoryFilteredProducts =
    selectedCategory === "All"
      ? filteredProducts
      : filteredProducts.filter(
          (product) => product.category === selectedCategory
        );

  // Sort products based on the selected sorting category
  const sortedProducts = [...categoryFilteredProducts].sort((a, b) => {
    if (sortOption === "priceLowToHigh") {
      return a.price - b.price; // Sort by price ( low to high)
    } else if (sortOption === "priceHighToLow") {
      return b.price - a.price;
    } else if (sortOption === "ratingHighToLow") {
      return b.rating - a.rating;
    }
    return 0;
  });

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-8 rounded-lg mb-8 shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Welcome to 24x7 Shop</h1>
        <p className="text-lg">
          Discover the best deals on your favorite products!
        </p>
        <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded">
          Shop Now
        </button>
      </div>

      {/* Category Filter */}
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

      {/* Sorting Dropdown */}
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

      {/* Product Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {sortedProducts.map((product, index) => {
          console.log("Rendering product:", product);
          return <Card key={index} productObj={product} />;
        })}
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

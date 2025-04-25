import React, { useState } from "react"; // Import useState
import Card from "./Card.jsx";
import products from "../product.js";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("default");  // first we define a state for implementing sorting feature


  // Extract unique categories from the products array
  const categories = ["All", ...new Set(products[0].products.map((product) => product.category))];

  // Filter products based on the selected category
  const filteredProducts =
    selectedCategory === "All"
      ? products[0].products
      : products[0].products.filter((product) => product.category === selectedCategory);


  // Sort products based on the selected sorting category
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "priceLowToHigh") {
      return a.price - b.price; // Sort by price ( low to high)
    } else if ( sortOption === "priceHighToLow") {
      return b.price - a.price;
    } else if ( sortOption === 'ratingHighToLow') {
      return b.rating - a.rating;
    }
    return 0;
  });

  return (
    <>
      <div className="flex text-3xl font-bold mb-4 justify-center items-center">Home</div>

      {/* Category Filter Dropdown */}
      <div className="flex justify-center mb-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded"
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
           className="p-2 border rounded"
           >

           <option value="default">Default</option>
           <option value="priceLowToHigh">Price: Low to High</option>
           <option value="priceHighToLow">Price: High to Low</option>
           <option value="ratingHighToLow">Rating: High to Low</option>
           </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {sortedProducts.map((product, index) => (
          <Card key={index} productObj={product} />
        ))}
      </div>
    </>
  );
};

export default Home;
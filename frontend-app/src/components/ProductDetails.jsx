import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://capstone-e-commerce-project.onrender.com/api/products/${productId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }
        const productData = await res.json();
        setProduct(productData);
      } catch (err) {
        console.error("Error fetching product:", err.message);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="product-details">
      <div className="product-header">
        <h1>{product.title || "No Title Available"}</h1>
        <p className="product-type">{product.category || "No Category"}</p>
      </div>
      <div className="product-body">
        <img
          src={product.thumbnail || "https://via.placeholder.com/150"}
          alt={product.title || "Product Image"}
          className="product-image"
        />
        <div className="product-info">
          <p>
            <strong>Description:</strong> {product.description || "No additional description available"}
          </p>
          <p>
            <strong>Price:</strong> ${product.price || "N/A"}
          </p>
          <p>
            <strong>Discount Percentage:</strong> {product.discountPercentage || "N/A"}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
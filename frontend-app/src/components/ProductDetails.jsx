import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id: productId } = useParams(); // Extract productId from the route
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        console.log(`Fetching product with ID: ${productId}`);
        const response = await fetch(`http://localhost:5000/api/products/${productId}`); // Corrected API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const productData = await response.json();
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    }

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (!product) {
    return <p>Loading product details...</p>; // Updated loading message
  }

  return (
    <div className="product-details">
      {/* <div className="product-id">
        <div>Product Item: {productId}</div>
      </div> */}
      <div className="product-header">
        <h1>{product.title || "No Title Available"}</h1>
        <p className="product-type">{product?.category || "No Category"}</p>
      </div>
      <div className="product-body">
        <img
          src={Array.isArray(product.images) ? product.images[0] : product.images || "https://via.placeholder.com/150"} // Handle array or string
          alt={product.itemName || 'Product Image'}
          className="product-image"
        />
        <div className="product-info">
          <p>
            <strong>Description:</strong> {product?.description || 'No additional description available'}
          </p>
          <p>
            <strong>Price:</strong> ${product?.price || "N/A"}
          </p>
          <p>
            <strong>Discount Percentage:</strong> {product?.discountPercentage || "N/A"}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Product List</h1>
      <Link to="/create-product" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
        Create New Product
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-gray-600">{product.shipping}</p>
            <p className="text-green-600 font-bold mt-2">${product.price}</p>
            <Link 
              to={`/edit-product/${product._id}`} 
              className="text-blue-500 hover:underline mt-4 inline-block"
            >
              Edit
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

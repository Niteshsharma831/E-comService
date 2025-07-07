// src/pages/BuyNowPage.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BuyNowPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  if (!product) {
    return (
      <div className="text-center mt-24 text-gray-500">
        No product selected for buying.
        <button
          onClick={() => navigate("/shop")}
          className="block mt-4 text-blue-600 underline"
        >
          Go to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="mt-24 min-h-screen px-6 py-8 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded">
        <h2 className="text-2xl font-bold text-green-700 mb-4">
          ✅ Order Summary
        </h2>
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <img
            src={product.image}
            alt={product.name}
            className="h-48 w-36 object-contain"
          />
          <div className="flex-1">
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-gray-600 mb-2 capitalize">{product.category}</p>
            <div className="text-lg text-green-700 font-bold mb-1">
              ₹{product.price}
            </div>
            <p className="text-sm text-gray-500">
              Thank you for your purchase! Your order has been placed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyNowPage;

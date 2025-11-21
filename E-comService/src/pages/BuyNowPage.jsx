// src/pages/BuyNowPage.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api";
import { toast } from "react-toastify";

const BuyNowPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

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

  const handleBuyNow = async () => {
    setLoading(true);
    try {
      await API.post("/users/cart/add", {
        productId: product._id,
        quantity,
      });
      toast.success("✅ Product added to cart. Proceed to checkout!");
      navigate("/cart");
    } catch (err) {
      if (err.response?.status === 401) {
        toast.warning("⚠️ Please login first");
        navigate("/login");
      } else {
        toast.error("❌ Failed to add product");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-24 min-h-screen px-6 py-8 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded">
        <h2 className="text-2xl font-bold text-green-700 mb-4">🛒 Buy Now</h2>

        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <img
            src={product.image}
            alt={product.name}
            className="h-48 w-36 object-contain"
          />
          <div className="flex-1">
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-gray-600 mb-2 capitalize">{product.category}</p>
            <div className="text-lg text-green-700 font-bold mb-3">
              ₹{product.price * quantity}
            </div>

            <div className="flex items-center gap-3 mb-4">
              <span>Quantity:</span>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 bg-gray-200 rounded"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 bg-gray-200 rounded"
              >
                +
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              disabled={loading}
              className="bg-indigo-600 text-white py-2 px-6 rounded hover:bg-indigo-700 transition"
            >
              {loading ? "Processing..." : "Buy Now"}
            </button>

            <p className="text-sm text-gray-500 mt-3">
              You can also add more items to your cart and checkout together.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyNowPage;

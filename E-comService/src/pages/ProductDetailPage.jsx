import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/products/getproducts/${id}`
        );
        setProduct(res.data.product);
      } catch (err) {
        console.error("Error loading product:", err.message);
      }
    };
    fetchProduct();
  }, [id]);

  const handleBuyNow = () => {
    navigate("/order", { state: { product } });
  };

  const handleAddToCart = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/users/cart/add", // ✅ correct endpoint
        { productId: product._id, quantity: 1 }, // ✅ include quantity
        { withCredentials: true }
      );
      toast.success("✅ Added to cart successfully!");
    } catch (err) {
      console.error("Failed to add to cart:", err.message);
      if (err.response?.status === 401) {
        toast.warning("⚠️ Please login to add items");
        navigate("/login");
      } else {
        toast.error("❌ Failed to add to cart");
      }
    }
  };

  if (!product)
    return <div className="text-center mt-20 text-gray-500">Loading...</div>;

  return (
    <div className="mt-24 min-h-screen bg-gray-100 px-6 py-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6 flex flex-col lg:flex-row gap-8">
        {/* Left - Image and Buttons */}
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          <img
            src={product.image}
            alt={product.name}
            className="h-[400px] w-full object-contain"
          />

          <div className="flex gap-4 mt-6 w-full justify-center px-2">
            <button
              onClick={handleAddToCart}
              className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded hover:bg-yellow-500 w-1/2"
            >
              🛒 Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-orange-600 text-white font-semibold px-6 py-3 rounded hover:bg-orange-700 w-1/2"
            >
              ⚡ Buy Now
            </button>
          </div>
        </div>

        {/* Right - Product Details */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
            <p className="text-gray-600 mt-1 mb-2 capitalize">
              {product.category}
            </p>

            {/* Ratings */}
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                4.3 ★
              </span>
              <span className="text-sm text-gray-500">8,475 Ratings</span>
            </div>

            {/* Pricing */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl font-bold text-green-700">
                ₹{product.price}
              </span>
              <span className="line-through text-gray-400 text-sm">
                ₹{Math.round(product.price * 1.14)}
              </span>
              {product.discount && (
                <span className="text-green-600 text-sm font-medium">
                  {product.discount}% off
                </span>
              )}
            </div>

            {/* Description */}
            <div className="mb-5">
              <h3 className="font-semibold text-gray-700 mb-1">Description:</h3>
              <ul className="list-disc text-gray-600 text-sm ml-5">
                {(Array.isArray(product.description)
                  ? product.description
                  : [product.description]
                ).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Offers */}
            <div className="mb-5">
              <h3 className="text-md font-semibold text-gray-700 mb-2">
                Available offers
              </h3>
              <ul className="text-sm text-gray-600 space-y-1 list-disc ml-6">
                <li>
                  Bank Offer: 5% cashback on Flipkart Axis Bank Credit Card
                </li>
                <li>Bank Offer: 5% off on Axis Bank Debit Card up to ₹750</li>
                <li>Flat ₹10 Cashback on Paytm UPI (Min ₹500)</li>
              </ul>
            </div>

            {/* Exchange Options */}
            <div className="mb-5 border rounded-lg p-4">
              <label className="flex items-center gap-4 text-sm">
                <input
                  type="radio"
                  name="exchange"
                  defaultChecked
                  className="accent-blue-600"
                />
                Buy without Exchange - ₹{product.price}
              </label>
              <label className="flex items-center gap-4 text-sm mt-2 text-gray-500">
                <input
                  type="radio"
                  name="exchange"
                  className="accent-blue-600"
                />
                Buy with Exchange - up to ₹6,350 off
              </label>
              <p className="text-xs text-red-500 mt-1">
                Enter pincode to check if exchange is available
              </p>
            </div>

            {/* Product Additional Details */}
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <strong>Brand:</strong> {product.brand}
              </p>
              <p>
                <strong>Stock:</strong> {product.stock}
              </p>
              <p>
                <strong>SKU:</strong> {product.sku}
              </p>
              <p>
                <strong>Warranty:</strong>{" "}
                {product.warranty || "1 Year Manufacturer Warranty"}
              </p>
              <p>
                <strong>Color:</strong> {product.color || "Varies by model"}
              </p>
              <p>
                <strong>Material:</strong>{" "}
                {product.material || "Plastic / Metal"}
              </p>
              <p>
                <strong>Dimensions:</strong> {product.dimensions || "Standard"}
              </p>
              <p>
                <strong>Weight:</strong> {product.weight || "Approx. 400g"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

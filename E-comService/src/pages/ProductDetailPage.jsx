import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api";
import {
  FaStar,
  FaTags,
  FaBoxOpen,
  FaShoppingCart,
  FaBolt,
} from "react-icons/fa";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/getproducts/${id}`);
        setProduct(res.data.product);
      } catch (err) {
        console.error("Error loading product:", err);
        toast.error("❌ Failed to load product details.");
      }
    };
    fetchProduct();
  }, [id]);

  const handleBuyNow = () => {
    if (!product) return;
    const orderPayload = { productId: product._id, price: product.price };
    navigate("/order", { state: { product, orderPayload } });
  };

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      await API.post("/users/cart/add", {
        productId: product._id,
        quantity: 1,
      });
      toast.success("🛒 Added to cart successfully!");
    } catch (err) {
      if (err.response?.status === 401) {
        toast.warning("⚠️ Please login to continue.");
        navigate("/login");
      } else {
        toast.error("❌ Failed to add to cart.");
      }
    }
  };

  if (!product)
    return <div className="text-center mt-20 text-gray-500">Loading...</div>;

  return (
    <div className="mt-30 min-h-screen bg-gray-100 px-3 md:px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* LEFT IMAGE SECTION */}
          <div className="w-full lg:w-1/2 flex flex-col items-center">
            <div className="bg-white rounded-2xl shadow-lg p-4 h-[400px] w-full flex items-center justify-center overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="object-contain h-full w-full hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* THUMBNAILS */}
            <div className="flex gap-3 mt-4">
              {[product.image, product.image, product.image].map(
                (img, index) => (
                  <img
                    key={index}
                    src={img}
                    className="h-16 w-16 rounded-xl p-1 bg-white shadow-md object-contain"
                  />
                )
              )}
            </div>

            {/* DESKTOP BUTTONS BELOW IMAGE */}
            <div className="hidden lg:flex mt-6 gap-4 w-full">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-yellow-400 rounded-xl py-3 font-semibold flex items-center justify-center gap-2"
              >
                <FaShoppingCart /> Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                className="flex-1 bg-orange-600 text-white rounded-xl py-3 font-semibold flex items-center justify-center gap-2"
              >
                <FaBolt /> Buy Now
              </button>
            </div>
          </div>

          {/* RIGHT SIDE DETAILS */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

            <p className="text-gray-600 mt-2 capitalize text-sm">
              {product.category}
            </p>

            {/* Ratings */}
            <div className="flex items-center gap-2 mt-3">
              <span className="bg-green-600 text-white px-2 py-1 text-xs rounded-lg flex items-center gap-1">
                <FaStar /> 4.3
              </span>
              <span className="text-gray-500 text-sm">8,475 Ratings</span>
            </div>

            {/* Price */}
            <div className="mt-4 flex items-center gap-4">
              <p className="text-4xl font-bold text-green-700">
                ₹{product.price}
              </p>
              <p className="text-gray-400 line-through text-sm">
                ₹{Math.round(product.price * 1.2)}
              </p>
              {product.discount && (
                <p className="text-green-600 text-sm font-medium">
                  {product.discount}% Off
                </p>
              )}
            </div>

            {/* Offers */}
            <div className="mt-6 bg-blue-50 p-5 rounded-2xl shadow">
              <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FaTags /> Available Offers
              </h3>
              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                <li>🔥 5% cashback on Flipkart Axis Bank Credit Card</li>
                <li>🔥 Flat ₹750 off on Axis Bank Debit Card</li>
                <li>🔥 ₹10 Cashback on Paytm UPI</li>
              </ul>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 text-lg mb-2">
                Description
              </h3>
              <ul className="list-disc ml-6 text-gray-600 text-sm space-y-1">
                {(Array.isArray(product.description)
                  ? product.description
                  : [product.description]
                ).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Specifications */}
            <div className="mt-8 bg-gray-50 p-5 rounded-2xl shadow-inner">
              <h3 className="font-semibold text-gray-800 text-lg mb-3">
                Product Details
              </h3>
              <div className="grid grid-cols-2 gap-3 text-gray-600 text-sm">
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
                  <strong>Warranty:</strong> {product.warranty || "1 Year"}
                </p>
                <p>
                  <strong>Color:</strong> {product.color || "Multiple"}
                </p>
                <p>
                  <strong>Weight:</strong> {product.weight || "400g"}
                </p>
                <p>
                  <strong>Material:</strong>{" "}
                  {product.material || "Plastic / Metal"}
                </p>
                <p>
                  <strong>Dimensions:</strong>{" "}
                  {product.dimensions || "Standard"}
                </p>
              </div>
            </div>

            {/* Delivery */}
            <div className="mt-6 flex items-center gap-3 p-4 bg-white rounded-2xl shadow">
              <FaBoxOpen className="text-indigo-600 text-2xl" />
              <p className="text-gray-600 text-sm">
                Delivery in <strong>3–5 days</strong> • Free shipping over ₹499
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE ONLY BUTTONS */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white p-3 shadow-2xl flex gap-3">
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-yellow-400 rounded-xl py-3 font-semibold flex items-center justify-center gap-2"
        >
          <FaShoppingCart /> Add to Cart
        </button>

        <button
          onClick={handleBuyNow}
          className="flex-1 bg-orange-600 text-white rounded-xl py-3 font-semibold flex items-center justify-center gap-2"
        >
          <FaBolt /> Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductDetailPage;

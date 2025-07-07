import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const OrderFormPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state?.product;

  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    phone: "",
    address: "",
    pincode: "",
    paymentMethod: "COD",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    const { fullName, gender, phone, address, pincode, paymentMethod } =
      formData;

    if (!fullName || !gender || !phone || !address || !pincode) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await axios.post(
        "https://e-comservice.onrender.com/api/users/create-order",
        {
          items: [{ productId: product._id, quantity: 1 }],
          fullName,
          gender,
          phone,
          address,
          pincode,
          paymentMethod,
        },
        { withCredentials: true }
      );

      toast.success("🎉 Order placed successfully!");
      navigate("/order-success");
    } catch (err) {
      console.error("Order error:", err);
      toast.error("❌ Failed to place order");
    }
  };

  if (!product) {
    return <div className="mt-24 text-center">No product to order.</div>;
  }

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5);

  return (
    <div className="mt-24 px-4 py-10 min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left - Order Summary */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <h2 className="text-2xl font-bold mb-5 text-gray-800 border-b pb-2">
            🛍️ Order Summary
          </h2>

          <div className="flex gap-4 mb-5">
            <img
              src={product.image}
              alt={product.name}
              className="w-28 h-28 object-contain border rounded-md"
            />
            <div className="flex flex-col justify-between">
              <h3 className="font-semibold text-lg text-gray-700">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 capitalize">
                Category: {product.category}
              </p>
              <p className="text-sm text-gray-500">Brand: {product.brand}</p>
              <p className="text-sm text-green-600 font-medium">
                ⭐ {product.rating || 4.5} / 5
              </p>
              <p className="text-sm text-gray-500">
                Delivery by:{" "}
                <span className="text-gray-700 font-semibold">
                  {deliveryDate.toDateString()}
                </span>
              </p>
            </div>
          </div>

          <div className="text-sm text-gray-700 space-y-3 mt-6">
            <div className="flex justify-between">
              <span>Price</span>
              <span>₹{product.price}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span className="text-green-600">
                - ₹{Math.round((product.price * (product.discount || 0)) / 100)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charges</span>
              <span className="text-green-600">FREE</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between text-lg font-bold">
              <span>Total Amount</span>
              <span>
                ₹
                {product.price -
                  Math.round((product.price * (product.discount || 0)) / 100)}
              </span>
            </div>
          </div>
        </div>

        {/* Right - Form */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <h2 className="text-2xl font-bold mb-5 text-gray-800 border-b pb-2 text-center">
            📝 Enter Delivery Details
          </h2>

          <div className="space-y-5">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-md focus:outline-blue-500"
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-md text-gray-700"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="text"
              name="phone"
              placeholder="Mobile Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-md focus:outline-blue-500"
            />
            <input
              type="text"
              name="pincode"
              placeholder="PIN Code"
              value={formData.pincode}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-md focus:outline-blue-500"
            />
            <textarea
              name="address"
              placeholder="Delivery Address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className="w-full border px-4 py-3 rounded-md focus:outline-blue-500"
            ></textarea>

            <div className="space-y-2">
              <p className="font-semibold text-gray-700">Payment Method:</p>
              <div className="flex gap-6 text-sm">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={formData.paymentMethod === "COD"}
                    onChange={handleChange}
                    className="accent-blue-600"
                  />
                  Cash on Delivery
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Online"
                    checked={formData.paymentMethod === "Online"}
                    onChange={handleChange}
                    className="accent-blue-600"
                  />
                  Online Payment
                </label>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md text-lg transition"
            >
              ✅ Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderFormPage;

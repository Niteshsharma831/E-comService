import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api";

const OrderFormPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;

  const [form, setForm] = useState({
    fullName: "",
    gender: "Male",
    phone: "",
    address: "",
    pincode: "",
    paymentMethod: "COD",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    API.get("/users/profile")
      .then((res) => {
        const { name, gender, phone, address } = res.data.user;
        setForm((prev) => ({
          ...prev,
          fullName: name || "",
          gender: gender || "Male",
          phone: phone || "",
          address: address || "",
        }));
      })
      .catch(() => {
        toast.warning("⚠️ Please login to place an order.");
        navigate("/login");
      });
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!product?._id) {
      toast.error("❌ Invalid product details.");
      setIsSubmitting(false);
      return;
    }

    const orderPayload = {
      ...form,
      items: [{ productId: product._id, quantity: 1 }],
    };

    try {
      if (form.paymentMethod === "COD") {
        await API.post("/users/create-order", orderPayload);
        toast.success("✅ Order placed successfully!");
        navigate("/order-success", { state: { product } });
      } else {
        navigate("/razorpay-payment", {
          state: { orderPayload, product, from: location.pathname },
        });
      }
    } catch (err) {
      console.error("Order Error:", err.response?.data || err.message);
      toast.error("❌ Failed to place order. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateDiscountedPrice = () => {
    const price = product?.price || 0;
    const discount = 20;
    return price - discount;
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-16 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-indigo-700 mb-6 flex items-center gap-2">
            📦 Order Summary
          </h2>

          <div className="flex items-center gap-4 mb-6">
            <img
              src={product?.image || "https://placehold.co/100x100"}
              alt={product?.name}
              className="w-28 h-28 object-cover rounded-xl border"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-800">
                {product?.name || "Product Name"}
              </h3>
              <p className="text-sm text-gray-500">
                Category: {product?.category || "-"}
              </p>
              <p className="text-sm text-gray-500">
                Brand: {product?.brand || "-"}
              </p>
              <p className="text-yellow-400 font-semibold mt-1">⭐ 5.0</p>
              <p className="text-sm text-green-600 mt-1">
                Delivery by:{" "}
                {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toDateString()}
              </p>
            </div>
          </div>

          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span>Price</span>
              <span className="font-medium">₹{product?.price || 0}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>- ₹20</span>
            </div>
            <div className="flex justify-between text-blue-600">
              <span>Delivery Charges</span>
              <span>FREE</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-semibold text-lg text-gray-800">
              <span>Total Amount</span>
              <span>₹{calculateDiscountedPrice()}</span>
            </div>
          </div>
        </div>

        {/* Delivery Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-indigo-700 mb-6 flex items-center gap-2">
            📝 Delivery Details
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-300 focus:outline-none"
            />

            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-300 focus:outline-none"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <input
              type="tel"
              name="phone"
              placeholder="Mobile Number"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-300 focus:outline-none"
            />

            <input
              type="text"
              name="pincode"
              placeholder="PIN Code"
              value={form.pincode}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-300 focus:outline-none"
            />

            <textarea
              name="address"
              placeholder="Full Delivery Address"
              value={form.address}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-300 focus:outline-none resize-none"
            />

            {/* Payment Method */}
            <div className="mt-2">
              <span className="block font-semibold mb-2">Payment Method:</span>
              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={form.paymentMethod === "COD"}
                    onChange={handleChange}
                  />
                  Cash on Delivery
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Online"
                    checked={form.paymentMethod === "Online"}
                    onChange={handleChange}
                  />
                  Online Payment
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition-all disabled:opacity-50"
            >
              {form.paymentMethod === "Online"
                ? isSubmitting
                  ? "Processing Payment..."
                  : "💳 Make Payment"
                : isSubmitting
                ? "Processing..."
                : "✅ Place Order"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderFormPage;

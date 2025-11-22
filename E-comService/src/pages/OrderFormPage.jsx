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
    paymentMethod: "COD", // ⭐ Default is COD
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-fill user details
  useEffect(() => {
    API.get("/users/profile")
      .then((res) => {
        const { name, gender, phone, address } = res.data.user;
        setForm((prev) => ({
          ...prev,
          fullName: name || "",
          gender: gender || "Gender",
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

  // Submit order
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!product?._id) {
      toast.error("❌ Invalid product details. Please try again.");
      setIsSubmitting(false);
      return;
    }

    const orderPayload = {
      ...form,
      items: [{ productId: product._id, quantity: 1 }],
    };

    try {
      if (form.paymentMethod === "COD") {
        // COD Order
        await API.post("/users/create-order", orderPayload);
        toast.success("✅ Order placed successfully!");
        navigate("/order-success", { state: { product } });
      } else {
        // ONLINE PAYMENT
        navigate("/razorpay-payment", { state: { orderPayload, product } });
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
    <div className="min-h-screen bg-gray-100 px-4 py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-xl font-semibold border-b pb-3 mb-4">
            📦 Order Summary
          </h2>

          <div className="flex items-center gap-4 mb-4">
            <img
              src={product?.image}
              alt={product?.name}
              className="w-24 h-24 object-contain border rounded"
            />
            <div>
              <h3 className="font-semibold text-lg">{product?.name}</h3>
              <p className="text-sm text-gray-600">
                Category: {product?.category}
              </p>
              <p className="text-sm text-gray-600">Brand: {product?.brand}</p>
              <p className="text-yellow-500 text-sm">⭐ 5 / 5</p>
              <p className="text-green-600 text-sm">
                Delivery by:{" "}
                {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toDateString()}
              </p>
            </div>
          </div>

          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span>Price</span>
              <span>₹{product?.price}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>- ₹20</span>
            </div>
            <div className="flex justify-between text-blue-600">
              <span>Delivery Charges</span>
              <span>FREE</span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total Amount</span>
              <span>₹{calculateDiscountedPrice()}</span>
            </div>
          </div>
        </div>

        {/* Delivery Form */}
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-xl font-semibold border-b pb-3 mb-4">
            📝 Enter Delivery Details
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />

            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full border p-2 rounded"
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
              className="w-full border p-2 rounded"
            />

            <input
              type="text"
              name="pincode"
              placeholder="PIN Code"
              value={form.pincode}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />

            <textarea
              name="address"
              placeholder="Delivery Full Address"
              value={form.address}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />

            {/* Payment Method */}
            <div>
              <label className="block font-semibold mb-1">
                Payment Method:
              </label>
              <div className="flex gap-4">
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

            {/* ⭐ Dynamic Button Label */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
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

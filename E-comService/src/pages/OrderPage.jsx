import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

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

  useEffect(() => {
    // Prefill user details if logged in
    axios
      .get("https://e-comservice.onrender.com/api/users/profile", {
        withCredentials: true,
      })
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

    if (!product || !product._id) {
      toast.error("❌ Invalid product details. Please try again.");
      return;
    }

    const orderPayload = {
      ...form,
      items: [{ productId: product._id, quantity: 1 }],
    };

    console.log("Sending order payload:", orderPayload);

    try {
      const res = await axios.post(
        "https://e-comservice.onrender.com/api/users/create-order",
        orderPayload,
        { withCredentials: true }
      );

      toast.success("✅ Order placed successfully!");
      navigate("/order-success");
    } catch (err) {
      console.error("Order Error:", err.response?.data || err.message);
      if (err.response?.status === 401) {
        toast.warning("⚠️ Please login to place order.");
        navigate("/login");
      } else {
        toast.error("❌ Failed to place order. Try again.");
      }
    }
  };

  return (
    <div className="mt-24 min-h-screen px-6 py-8 bg-gray-100">
      <div className="max-w-xl mx-auto bg-white p-8 shadow-md rounded">
        <h2 className="text-2xl font-bold mb-6 text-green-700">
          🛒 Delivery Details
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
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          <textarea
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={form.pincode}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          <select
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="COD">Cash on Delivery</option>
            <option value="Online" disabled>
              Online Payment (Coming Soon)
            </option>
          </select>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            ✅ Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderFormPage;

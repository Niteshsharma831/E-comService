// src/pages/RazorpayPayment.jsx

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api";

const RazorpayPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const { orderPayload, product } = location.state || {};

  useEffect(() => {
    if (!orderPayload || !product) {
      navigate("/");
      return;
    }

    const loadRazorpay = () =>
      new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });

    const startPayment = async () => {
      const loaded = await loadRazorpay();
      if (!loaded) {
        alert("Failed to load Razorpay");
        return;
      }

      try {
        // Create Razorpay order from backend
        const res = await API.post("/payment/create-razorpay-order", {
          amount: product.price * 100,
        });

        const { order } = res.data;

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY,
          amount: order.amount,
          currency: "INR",
          name: "Sharma Furniture House",
          description: product.name,
          order_id: order.id,

          handler: async (response) => {
            try {
              const verifyRes = await API.post(
                "/payment/verify-razorpay-payment",
                {
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                  orderPayload,
                }
              );

              if (verifyRes.data.success) {
                // 🔥 redirect to success page
                navigate("/order-success", {
                  state: { orderId: verifyRes.data.orderId },
                });
              } else {
                alert("Payment verification failed.");
              }
            } catch (err) {
              alert("Payment verification failed.");
            }
          },

          theme: { color: "#0F9D58" },
        };

        setLoading(false);
        new window.Razorpay(options).open();
      } catch (error) {
        alert("Failed to start payment.");
      }
    };

    startPayment();
  }, [navigate, orderPayload, product]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="bg-white shadow-xl p-8 rounded-2xl max-w-md w-full text-center animate-fadeIn">
        {/* Spinner */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Redirecting to Payment
        </h2>

        <p className="text-gray-600 mb-4">
          You are being redirected to the secure Razorpay payment page.
        </p>

        {/* Product Box */}
        <div className="bg-gray-100 p-4 rounded-xl shadow-inner">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Product:</span> {product?.name}
          </p>
          <p className="text-sm text-gray-700 mt-1">
            <span className="font-semibold">Amount:</span> ₹{product?.price}
          </p>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          Please do not refresh or close this page.
        </p>

        {loading && (
          <p className="text-xs text-gray-500 mt-2 animate-pulse">
            Loading Razorpay…
          </p>
        )}
      </div>
    </div>
  );
};

export default RazorpayPayment;

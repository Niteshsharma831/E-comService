import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api";

const RazorpayPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  // Get orderPayload, product
  const { orderPayload, product } = location.state || {};

  useEffect(() => {
    if (!orderPayload || !product) {
      navigate("/shop"); // fallback to shop page
      return;
    }

    // Load Razorpay script
    const loadScript = () =>
      new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });

    const startPayment = async () => {
      const loaded = await loadScript();
      if (!loaded) {
        alert("Failed to load Razorpay");
        return;
      }

      try {
        // Create Razorpay order on server
        const res = await API.post("/payment/create-razorpay-order", {
          amount: product.price * 100,
        });

        const { order } = res.data;

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY,
          amount: order.amount,
          currency: "INR",
          name: "ShopiZo E-commerce",
          description: product.name,
          order_id: order.id,

          handler: async (response) => {
            try {
              const verify = await API.post(
                "/payment/verify-razorpay-payment",
                {
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                  orderPayload,
                }
              );

              if (verify.data.success) {
                navigate("/order-success", {
                  state: { orderId: verify.data.orderId },
                });
              } else {
                alert("Payment verification failed.");
                navigate("/shop");
              }
            } catch (err) {
              console.log("Verification Error:", err);
              alert("Verification API error");
              navigate("/shop");
            }
          },

          modal: {
            ondismiss: function () {
              alert("Payment cancelled");
              navigate("/shop"); // redirect to shop page on cancel
            },
          },

          theme: { color: "#0F9D58" },
        };

        setLoading(false);
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (err) {
        console.log("Payment Init Error:", err);
        alert("Server error. Unable to start payment.");
        navigate("/shop");
      }
    };

    startPayment();
  }, [location.state]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow text-center max-w-md w-full">
        <div className="w-14 h-14 border-4 border-gray-300 border-t-green-600 rounded-full animate-spin mx-auto"></div>
        <h2 className="text-xl font-bold mt-4">Redirecting to Payment…</h2>
        <p className="text-gray-600 mt-2">Product: {product?.name}</p>
        <p className="text-gray-600">Amount: ₹{product?.price}</p>
        {loading && <p className="animate-pulse text-xs mt-2">Loading…</p>}
      </div>
    </div>
  );
};

export default RazorpayPayment;

// src/pages/OrderSuccessPage.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const OrderSuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/orders");
    }, 3000); // 3 seconds delay before redirect

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      <FaCheckCircle className="text-green-600 text-6xl mb-4 animate-bounce" />
      <h2 className="text-3xl font-bold text-green-700">Order Confirmed!</h2>
      <p className="text-gray-600 mt-2 text-center">
        Thank you for your purchase. Redirecting to your orders...
      </p>
    </div>
  );
};

export default OrderSuccessPage;

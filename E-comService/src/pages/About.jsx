// src/pages/About.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaShoppingCart,
  FaShieldAlt,
  FaShippingFast,
  FaTags,
} from "react-icons/fa";

const About = () => {
  return (
    <div className="w-full bg-gray-50 text-gray-800 min-h-screen mt-20">
      {/* HERO SECTION */}
      <section className="w-full bg-blue-600 text-white py-16 px-6 md:px-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center"
        >
          About <span className="text-yellow-300">Shopizo</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mt-4 max-w-3xl mx-auto text-center text-lg md:text-xl"
        >
          Your trusted shopping destination where high-quality products,
          affordable prices, and great customer experience come together.
        </motion.p>
      </section>

      {/* ABOUT SECTION */}
      <section className="max-w-6xl mx-auto py-14 px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-xl rounded-2xl p-8 md:p-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Who We Are</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Shopizo is a modern e-commerce platform built with one goal in
            mind—providing the smoothest and most reliable online shopping
            experience. We offer a wide variety of products including
            electronics, fashion, accessories, and home essentials.
            <br />
            <br />
            Our selection is carefully curated to ensure quality, durability,
            and affordability. From trending gadgets to everyday items, Shopizo
            is your one-stop destination for all your needs.
          </p>
        </motion.div>
      </section>

      {/* FEATURES SECTION */}
      <section className="w-full bg-white py-16 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
          What Makes Shopizo Different?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="bg-gray-100 p-8 rounded-xl shadow">
            <FaShoppingCart className="text-blue-600 text-4xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Huge Product Range</h3>
            <p className="text-gray-600">
              Explore thousands of products across multiple categories.
            </p>
          </div>

          <div className="bg-gray-100 p-8 rounded-xl shadow">
            <FaShieldAlt className="text-blue-600 text-4xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Secure Shopping</h3>
            <p className="text-gray-600">
              Your payments and personal data are 100% safe and encrypted.
            </p>
          </div>

          <div className="bg-gray-100 p-8 rounded-xl shadow">
            <FaShippingFast className="text-blue-600 text-4xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">
              Quick doorstep delivery with real-time order tracking.
            </p>
          </div>
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="bg-gray-100 py-16 px-6 md:px-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-5 text-gray-900">Our Mission</h2>
          <p className="text-gray-700 text-lg">
            Our mission is to make online shopping affordable, accessible, and
            trustworthy. We focus on quality products, smooth delivery, and
            exceptional customer support.
          </p>
        </div>
      </section>
      {/* VALUES SECTION */}
      <section className="bg-white py-16 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
          Our Core Values
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="bg-gray-100 p-8 rounded-xl shadow">
            <FaCheckCircle className="text-green-600 text-4xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Quality First</h3>
            <p className="text-gray-600">
              We never compromise on product quality and customer satisfaction.
            </p>
          </div>

          <div className="bg-gray-100 p-8 rounded-xl shadow">
            <FaTags className="text-yellow-600 text-4xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Affordable Prices</h3>
            <p className="text-gray-600">
              We offer the most competitive pricing across all categories.
            </p>
          </div>

          <div className="bg-gray-100 p-8 rounded-xl shadow">
            <FaShieldAlt className="text-blue-600 text-4xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Trusted & Secure</h3>
            <p className="text-gray-600">
              100% secure payments, encrypted data, and verified sellers.
            </p>
          </div>
        </div>
      </section>
      {/* STATS SECTION */}
      <section className="bg-blue-600 text-white py-16 px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-6xl mx-auto text-center">
          <div>
            <h3 className="text-4xl font-bold">10K+</h3>
            <p className="text-lg">Happy Customers</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold">50K+</h3>
            <p className="text-lg">Orders Delivered</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold">500+</h3>
            <p className="text-lg">Verified Sellers</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold">4.9★</h3>
            <p className="text-lg">Average Rating</p>
          </div>
        </div>
      </section>
      {/* TESTIMONIALS SECTION */}
      <section className="bg-gray-50 py-16 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
          What Our Customers Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow">
            <p className="text-gray-700 mb-4">
              "Amazing service! Products were exactly as described and delivered
              on time."
            </p>
            <h4 className="font-semibold text-gray-900">Rahul Sharma</h4>
            <p className="text-yellow-500">★★★★★</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow">
            <p className="text-gray-700 mb-4">
              "Shopizo has become my go-to shopping site for electronics!"
            </p>
            <h4 className="font-semibold text-gray-900">Priya Verma</h4>
            <p className="text-yellow-500">★★★★★</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow">
            <p className="text-gray-700 mb-4">
              "Customer support is super helpful. Highly recommended!"
            </p>
            <h4 className="font-semibold text-gray-900">Amit Kumar</h4>
            <p className="text-yellow-500">★★★★★</p>
          </div>
        </div>
      </section>

      {/* VISION SECTION */}
      <section className="bg-white py-16 px-6 md:px-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-5 text-gray-900">Our Vision</h2>
          <p className="text-gray-700 text-lg">
            We aim to become the most reliable and customer-friendly e-commerce
            brand by consistently offering value and convenience.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;

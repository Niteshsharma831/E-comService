import React from "react";
import { Link } from "react-router-dom";
import SmartphoneDeals from "../Cards/SmartphoneDeals";
import FashionDeals from "../Cards/FashionsDeals";
import CategoryBar from "../Cards/CategoryBar";
import ChatBot from "../components/ChatBot";
import Banner from "../../public/banner.png";

const Home = () => {
  return (
    <div className="bg-gray-100 text-gray-800 font-sans py-45">
      {/* HERO BANNER */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between px-6 py-10 gap-6">
          <div>
            <h1 className="text-4xl font-bold mb-4 text-gray-900">
              Big Savings on Your Daily Essentials!
            </h1>
            <p className="text-lg mb-6 text-gray-600">
              Enjoy exclusive discounts on top brands. Limited time only!
            </p>
            <Link
              to="/shop"
              className="inline-block bg-yellow-400 text-black px-6 py-3 rounded font-semibold hover:bg-yellow-300 transition"
            >
              Start Shopping
            </Link>
          </div>

          {/* Image Section with margin top */}
          <div className="mt-10 lg:mt-0">
            <img
              src="https://img.freepik.com/free-psd/horizontal-banner-online-fashion-sale_23-2148585404.jpg?semt=ais_hybrid&w=740"
              alt="hero"
              className="w-full max-w-lg rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      {/* CATEGORY NAVIGATION */}
      <section className="bg-white border-t border-gray-200 hidden sm:block">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-xl font-bold mb-4">Top Categories</h2>
          <CategoryBar />
        </div>
      </section>
      {/* DEALS */}
      <section className="p max-w-7xl mx-auto space-y-12">
        <SmartphoneDeals />
        <FashionDeals />
      </section>

      {/* POPULAR PRODUCTS */}
      <section className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">Popular Picks for You</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {[
              {
                name: "Apple AirPods Pro",
                price: "₹24,999",
                image:
                  "https://m.media-amazon.com/images/I/61f1YfTkTDL._SX679_.jpg",
              },
              {
                name: "Samsung Smart Watch",
                price: "₹13,999",
                image:
                  "https://m.media-amazon.com/images/I/61bK6PMOC3L._SX679_.jpg",
              },
              {
                name: "Canon DSLR Camera",
                price: "₹48,500",
                image:
                  "https://m.media-amazon.com/images/I/81P1L85KinL._SX679_.jpg",
              },
              {
                name: "Sony Bluetooth Speaker",
                price: "₹7,499",
                image:
                  "https://m.media-amazon.com/images/I/81ExhpBEbHL._SX679_.jpg",
              },
              {
                name: "Nike Sports Shoes",
                price: "₹4,299",
                image:
                  "https://m.media-amazon.com/images/I/71ZVjRaYLXL._SY695_.jpg",
              },
              {
                name: "HP Laptop 15s",
                price: "₹52,990",
                image:
                  "https://m.media-amazon.com/images/I/71Y8r3VXyUL._SX679_.jpg",
              },
              {
                name: "boAt Wireless Earbuds",
                price: "₹1,299",
                image:
                  "https://m.media-amazon.com/images/I/61u1VALn6JL._SX679_.jpg",
              },
              {
                name: "Mi Smart LED TV",
                price: "₹32,499",
                image:
                  "https://m.media-amazon.com/images/I/710U0k4hTSL._SX679_.jpg",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gray-100 rounded-lg shadow hover:shadow-md transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-44 object-contain p-4"
                />
                <div className="px-4 pb-4">
                  <h3 className="font-semibold mb-1">{item.name}</h3>
                  <p className="text-green-700 font-bold">{item.price}</p>
                  <p className="text-sm text-gray-500">Free Delivery</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRANDS */}
      {/* TOP BRANDS BY CATEGORY */}
      <section className="bg-gray-50 py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Top Brands by Category
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Mobile Brands */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-100 to-white shadow hover:shadow-md transition">
              <h3 className="text-lg font-bold mb-4 text-indigo-800">
                Mobile Brands
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  "Apple",
                  "Samsung",
                  "OnePlus",
                  "Realme",
                  "Xiaomi",
                  "Vivo",
                  "iQOO",
                ].map((brand) => (
                  <span
                    key={brand}
                    className="bg-white px-3 py-1 rounded shadow text-sm font-medium text-gray-700"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>

            {/* Laptop Brands */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-green-100 to-white shadow hover:shadow-md transition">
              <h3 className="text-lg font-bold mb-4 text-green-800">
                Laptop Brands
              </h3>
              <div className="flex flex-wrap gap-3">
                {["HP", "Dell", "Lenovo", "Asus", "Acer", "Apple", "MSI"].map(
                  (brand) => (
                    <span
                      key={brand}
                      className="bg-white px-3 py-1 rounded shadow text-sm font-medium text-gray-700"
                    >
                      {brand}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* TV & Appliances */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-yellow-100 to-white shadow hover:shadow-md transition">
              <h3 className="text-lg font-bold mb-4 text-yellow-800">
                TV & Appliances
              </h3>
              <div className="flex flex-wrap gap-3">
                {["Sony", "LG", "Samsung", "Panasonic", "Haier", "TCL"].map(
                  (brand) => (
                    <span
                      key={brand}
                      className="bg-white px-3 py-1 rounded shadow text-sm font-medium text-gray-700"
                    >
                      {brand}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Grocery */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-orange-100 to-white shadow hover:shadow-md transition">
              <h3 className="text-lg font-bold mb-4 text-orange-800">
                Grocery
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  "Tata",
                  "Fortune",
                  "Patanjali",
                  "Aashirvaad",
                  "Dabur",
                  "Surf Excel",
                ].map((brand) => (
                  <span
                    key={brand}
                    className="bg-white px-3 py-1 rounded shadow text-sm font-medium text-gray-700"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>

            {/* Food & Snacks */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-pink-100 to-white shadow hover:shadow-md transition">
              <h3 className="text-lg font-bold mb-4 text-pink-800">
                Food & Snacks
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  "Maggie",
                  "Kellogg's",
                  "Lays",
                  "CocaCola",
                  "Pepsi",
                  "Parle",
                  "Nestle",
                ].map((brand) => (
                  <span
                    key={brand}
                    className="bg-white px-3 py-1 rounded shadow text-sm font-medium text-gray-700"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>

            {/* Furniture */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-100 to-white shadow hover:shadow-md transition">
              <h3 className="text-lg font-bold mb-4 text-blue-800">
                Furniture Brands
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  "Godrej",
                  "Urban Ladder",
                  "Home Centre",
                  "IKEA",
                  "Durian",
                  "Nilkamal",
                ].map((brand) => (
                  <span
                    key={brand}
                    className="bg-white px-3 py-1 rounded shadow text-sm font-medium text-gray-700"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APP PROMO */}
      <section className="bg-gradient-to-br from-indigo-700 via-purple-700 to-indigo-800 text-white py-14 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          {/* Text + CTA */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight">
              Shop Anytime, Anywhere
            </h2>
            <p className="text-lg text-indigo-100 mb-6">
              Download our mobile app and get exclusive offers, faster delivery,
              and seamless shopping at your fingertips.
            </p>

            {/* Store Buttons */}
            <div className="flex gap-4 mb-4">
              <button
                onClick={() => alert("Coming soon...")}
                className="focus:outline-none"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png"
                  alt="Play Store"
                  className="h-12 hover:scale-105 transition"
                />
              </button>

              <button
                onClick={() => alert("Coming soon...")}
                className="focus:outline-none"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/1280px-Download_on_the_App_Store_Badge.svg.png"
                  alt="App Store"
                  className="h-12 hover:scale-105 transition"
                />
              </button>
            </div>

            {/* Optional CTA Button */}
            <a
              href="/download"
              className="inline-block mt-2 px-6 py-2 bg-white text-indigo-700 font-semibold rounded shadow hover:bg-indigo-100 transition"
            >
              Learn More
            </a>
          </div>

          {/* Glowing Mobile Image */}
          <div className="flex justify-center">
            <img
              src={Banner}
              className="w-full max-w-[500px] drop-shadow-2xl animate-pulse-slow"
              alt="App Preview"
            />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-white py-10 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">What Our Customers Say</h2>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-gray-100 p-4 rounded-lg shadow w-full md:w-1/3"
              >
                <p className="italic mb-2">
                  “Fast delivery and great products. Highly satisfied!”
                </p>
                <p className="text-sm font-semibold text-right text-gray-700">
                  — Customer {i}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ChatBot />
    </div>
  );
};

export default Home;

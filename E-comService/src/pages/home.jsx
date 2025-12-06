import React, { useState } from "react";
import { Link } from "react-router-dom";
import SmartphoneDeals from "../Cards/SmartphoneDeals";
import FashionDeals from "../Cards/FashionsDeals";
import CategoryBar from "../Cards/CategoryBar";
import ChatBot from "../components/ChatBot";
import Banner from "../../public/banner.png";

const Home = () => {
  const [showAllCategories, setShowAllCategories] = useState(false);

  return (
    <div className="bg-gray-100 text-gray-800 font-sans mt-30">
      {/* HERO BANNER - Add some bottom padding to prevent overlap */}
      <section className="bg-white pb-4 md:pb-0">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 py-6 md:py-10 gap-6">
          <div className="text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-gray-900">
              Big Savings on Your Daily Essentials!
            </h1>
            <p className="text-sm sm:text-base md:text-lg mb-4 md:mb-6 text-gray-600">
              Enjoy exclusive discounts on top brands. Limited time only!
            </p>
            <Link
              to="/shop"
              className="inline-block bg-yellow-400 text-black px-5 py-2.5 md:px-6 md:py-3 rounded font-semibold hover:bg-yellow-300 transition text-sm md:text-base"
            >
              Start Shopping
            </Link>
          </div>

          {/* Image Section */}
          <div className="w-full lg:w-auto">
            <img
              src="https://img.freepik.com/free-psd/horizontal-banner-online-fashion-sale_23-2148585404.jpg?semt=ais_hybrid&w=740"
              alt="hero"
              className="w-full max-w-md md:max-w-lg rounded-lg shadow-md mx-auto"
            />
          </div>
        </div>
      </section>

      {/* CATEGORY NAVIGATION - Reduced negative margin for mobile */}
      <section className="bg-white border-t border-gray-200 py-3 md:py-4 -mt-2 md:mt-0">
        {/* Changed from -mt-4 to -mt-2 */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
          <div className="flex justify-between items-center mb-2 md:mb-3">
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
              Top Categories
            </h2>
            <button
              onClick={() => setShowAllCategories(!showAllCategories)}
              className="md:hidden text-blue-600 text-sm font-medium"
            >
              {showAllCategories ? "Show Less" : "View All"}
            </button>
          </div>

          {/* Mobile: Show limited categories */}
          <div className="md:hidden">
            {showAllCategories ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                <CategoryBar />
              </div>
            ) : (
              <div className="overflow-x-auto pb-2 -mx-3 sm:-mx-4 px-3 sm:px-4">
                <div className="flex space-x-4 min-w-max">
                  <CategoryBar />
                </div>
                {/* Scroll indicator */}
                <div className="text-center mt-2 pt-2 border-t border-gray-100">
                  <span className="text-xs text-gray-500">
                    ← Scroll to see more →
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Desktop: Always show full category bar */}
          <div className="hidden md:block">
            <CategoryBar />
          </div>
        </div>
      </section>

      {/* DEALS SECTION - Add margin to separate from CategoryBar */}
      <section className="max-w-7xl mx-auto space-y-8 md:space-y-12 px-4 sm:px-6 mt-6 md:mt-8">
        <SmartphoneDeals />
        <FashionDeals />
      </section>

      {/* POPULAR PRODUCTS */}
      <section className="bg-white py-6 md:py-10 mt-8 md:mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 md:mb-6">
            Popular Picks for You
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
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
                  "https://utgadgets.com/cdn/shop/files/Canon_400D_DSLR_Camera_with_28-80mm_lens_-_Best_Price_in_Pakistan_3264x.jpg?v=1737635269",
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
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiRtYAM7d7TeCp3klPRtNIw2RFUyy7CBijnQ&s",
              },
              {
                name: "HP Laptop 15s",
                price: "₹52,990",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPWiwW678dEErD4DBcUwmUV2NmDnARLxW2pQ&s",
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
                  "https://5.imimg.com/data5/ANDROID/Default/2023/1/LV/FW/RY/160159535/product-jpeg-500x500.jpg",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-lg shadow hover:shadow-md transition overflow-hidden border border-gray-200"
              >
                <div className="aspect-square p-3 md:p-4 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain max-h-32 md:max-h-40"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-xs sm:text-sm md:text-base mb-1 line-clamp-2 h-8 md:h-10">
                    {item.name}
                  </h3>
                  <p className="text-green-700 font-bold text-sm md:text-base">
                    {item.price}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Free Delivery</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOP BRANDS BY CATEGORY */}
      <section className="bg-gray-50 py-6 md:py-10 px-4 sm:px-6 mt-8 md:mt-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 md:mb-8 text-center">
            Top Brands by Category
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Mobile Brands */}
            <div className="p-4 md:p-6 rounded-xl bg-gradient-to-br from-indigo-100 to-white shadow hover:shadow-md transition">
              <h3 className="text-sm md:text-base lg:text-lg font-bold mb-3 text-indigo-800">
                📱 Mobile Brands
              </h3>
              <div className="flex flex-wrap gap-2">
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
                    className="bg-white px-2 py-1 rounded shadow text-xs md:text-sm font-medium text-gray-700"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>

            {/* Laptop Brands */}
            <div className="p-4 md:p-6 rounded-xl bg-gradient-to-br from-green-100 to-white shadow hover:shadow-md transition">
              <h3 className="text-sm md:text-base lg:text-lg font-bold mb-3 text-green-800">
                💻 Laptop Brands
              </h3>
              <div className="flex flex-wrap gap-2">
                {["HP", "Dell", "Lenovo", "Asus", "Acer", "Apple", "MSI"].map(
                  (brand) => (
                    <span
                      key={brand}
                      className="bg-white px-2 py-1 rounded shadow text-xs md:text-sm font-medium text-gray-700"
                    >
                      {brand}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* TV & Appliances */}
            <div className="p-4 md:p-6 rounded-xl bg-gradient-to-br from-yellow-100 to-white shadow hover:shadow-md transition">
              <h3 className="text-sm md:text-base lg:text-lg font-bold mb-3 text-yellow-800">
                📺 TV & Appliances
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Sony", "LG", "Samsung", "Panasonic", "Haier", "TCL"].map(
                  (brand) => (
                    <span
                      key={brand}
                      className="bg-white px-2 py-1 rounded shadow text-xs md:text-sm font-medium text-gray-700"
                    >
                      {brand}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Grocery */}
            <div className="p-4 md:p-6 rounded-xl bg-gradient-to-br from-orange-100 to-white shadow hover:shadow-md transition">
              <h3 className="text-sm md:text-base lg:text-lg font-bold mb-3 text-orange-800">
                🛒 Grocery
              </h3>
              <div className="flex flex-wrap gap-2">
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
                    className="bg-white px-2 py-1 rounded shadow text-xs md:text-sm font-medium text-gray-700"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>

            {/* Food & Snacks */}
            <div className="p-4 md:p-6 rounded-xl bg-gradient-to-br from-pink-100 to-white shadow hover:shadow-md transition">
              <h3 className="text-sm md:text-base lg:text-lg font-bold mb-3 text-pink-800">
                🍕 Food & Snacks
              </h3>
              <div className="flex flex-wrap gap-2">
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
                    className="bg-white px-2 py-1 rounded shadow text-xs md:text-sm font-medium text-gray-700"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>

            {/* Furniture */}
            <div className="p-4 md:p-6 rounded-xl bg-gradient-to-br from-blue-100 to-white shadow hover:shadow-md transition">
              <h3 className="text-sm md:text-base lg:text-lg font-bold mb-3 text-blue-800">
                🛋️ Furniture Brands
              </h3>
              <div className="flex flex-wrap gap-2">
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
                    className="bg-white px-2 py-1 rounded shadow text-xs md:text-sm font-medium text-gray-700"
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
      <section className="bg-gradient-to-br from-indigo-700 via-purple-700 to-indigo-800 text-white py-8 md:py-14 px-4 sm:px-6 mt-8 md:mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-10">
          {/* Text + CTA */}
          <div className="text-center md:text-left">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3 md:mb-4 leading-tight">
              Shop Anytime, Anywhere
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-indigo-100 mb-4 md:mb-6">
              Download our mobile app and get exclusive offers, faster delivery,
              and seamless shopping at your fingertips.
            </p>

            {/* Store Buttons */}
            <div className="flex justify-center md:justify-start gap-3 md:gap-4 mb-4">
              <button
                onClick={() => alert("Coming soon...")}
                className="focus:outline-none"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png"
                  alt="Play Store"
                  className="h-8 sm:h-10 md:h-12 hover:scale-105 transition"
                />
              </button>

              <button
                onClick={() => alert("Coming soon...")}
                className="focus:outline-none"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/1280px-Download_on_the_App_Store_Badge.svg.png"
                  alt="App Store"
                  className="h-8 sm:h-10 md:h-12 hover:scale-105 transition"
                />
              </button>
            </div>

            {/* Optional CTA Button */}
            <div className="text-center md:text-left">
              <a
                href="/download"
                className="inline-block mt-2 px-4 md:px-6 py-1.5 md:py-2 bg-white text-indigo-700 font-semibold rounded shadow hover:bg-indigo-100 transition text-sm md:text-base"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Glowing Mobile Image */}
          <div className="flex justify-center order-first md:order-last">
            <img
              src={Banner}
              className="w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[400px] drop-shadow-2xl"
              alt="App Preview"
            />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-white py-6 md:py-10 px-4 sm:px-6 mt-8 md:mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 md:mb-6">
            What Our Customers Say
          </h2>
          <div className="flex flex-col md:flex-row gap-3 md:gap-6 justify-center">
            {[
              "Fast delivery and great products. Highly satisfied!",
              "Best prices and excellent customer service!",
              "Easy returns and quick refunds. Love shopping here!",
            ].map((testimonial, i) => (
              <div
                key={i}
                className="bg-gray-100 p-3 md:p-5 rounded-lg shadow w-full md:w-1/3"
              >
                <p className="italic text-sm md:text-base mb-2">
                  "{testimonial}"
                </p>
                <p className="text-xs md:text-sm font-semibold text-right text-gray-700">
                  — Customer {i + 1}
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

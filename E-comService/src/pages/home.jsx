// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import SmartphoneDeals from "../Cards/SmartphoneDeals";
// import FashionDeals from "../Cards/FashionsDeals";
// import CategoryBar from "../Cards/CategoryBar";
// import ChatBot from "../components/ChatBot";
// import Banner from "../../public/banner.png";

// const Home = () => {
//   const [showAllCategories, setShowAllCategories] = useState(false);

//   return (
//     <div className="bg-gray-100 text-gray-800 font-sans mt-30">
//       {/* HERO BANNER - Add some bottom padding to prevent overlap */}
//       <section className="bg-white pb-4 md:pb-0">
//         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 py-6 md:py-10 gap-6">
//           <div className="text-center lg:text-left">
//             <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-gray-900">
//               Big Savings on Your Daily Essentials!
//             </h1>
//             <p className="text-sm sm:text-base md:text-lg mb-4 md:mb-6 text-gray-600">
//               Enjoy exclusive discounts on top brands. Limited time only!
//             </p>
//             <Link
//               to="/shop"
//               className="inline-block bg-yellow-400 text-black px-5 py-2.5 md:px-6 md:py-3 rounded font-semibold hover:bg-yellow-300 transition text-sm md:text-base"
//             >
//               Start Shopping
//             </Link>
//           </div>

//           {/* Image Section */}
//           <div className="w-full lg:w-auto">
//             <img
//               src="https://img.freepik.com/free-psd/horizontal-banner-online-fashion-sale_23-2148585404.jpg?semt=ais_hybrid&w=740"
//               alt="hero"
//               className="w-full max-w-md md:max-w-lg rounded-lg shadow-md mx-auto"
//             />
//           </div>
//         </div>
//       </section>

//       {/* CATEGORY NAVIGATION - Reduced negative margin for mobile */}
//       <section className="bg-white border-t border-gray-200 py-3 md:py-4 -mt-2 md:mt-0">
//         {/* Changed from -mt-4 to -mt-2 */}
//         <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
//           <div className="flex justify-between items-center mb-2 md:mb-3">
//             <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
//               Top Categories
//             </h2>
//             <button
//               onClick={() => setShowAllCategories(!showAllCategories)}
//               className="md:hidden text-blue-600 text-sm font-medium"
//             >
//               {showAllCategories ? "Show Less" : "View All"}
//             </button>
//           </div>

//           {/* Mobile: Show limited categories */}
//           <div className="md:hidden">
//             {showAllCategories ? (
//               <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
//                 <CategoryBar />
//               </div>
//             ) : (
//               <div className="overflow-x-auto pb-2 -mx-3 sm:-mx-4 px-3 sm:px-4">
//                 <div className="flex space-x-4 min-w-max">
//                   <CategoryBar />
//                 </div>
//                 {/* Scroll indicator */}
//                 <div className="text-center mt-2 pt-2 border-t border-gray-100">
//                   <span className="text-xs text-gray-500">
//                     ← Scroll to see more →
//                   </span>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Desktop: Always show full category bar */}
//           <div className="hidden md:block">
//             <CategoryBar />
//           </div>
//         </div>
//       </section>

//       {/* DEALS SECTION - Add margin to separate from CategoryBar */}
//       <section className="max-w-7xl mx-auto space-y-8 md:space-y-12 px-4 sm:px-6 mt-6 md:mt-8">
//         <SmartphoneDeals />
//         <FashionDeals />
//       </section>

//       {/* POPULAR PRODUCTS */}
//       <section className="bg-white py-6 md:py-10 mt-8 md:mt-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6">
//           <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 md:mb-6">
//             Popular Picks for You
//           </h2>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
//             {[
//               {
//                 name: "Apple AirPods Pro",
//                 price: "₹24,999",
//                 image:
//                   "https://m.media-amazon.com/images/I/61f1YfTkTDL._SX679_.jpg",
//               },
//               {
//                 name: "Samsung Smart Watch",
//                 price: "₹13,999",
//                 image:
//                   "https://m.media-amazon.com/images/I/61bK6PMOC3L._SX679_.jpg",
//               },
//               {
//                 name: "Canon DSLR Camera",
//                 price: "₹48,500",
//                 image:
//                   "https://utgadgets.com/cdn/shop/files/Canon_400D_DSLR_Camera_with_28-80mm_lens_-_Best_Price_in_Pakistan_3264x.jpg?v=1737635269",
//               },
//               {
//                 name: "Sony Bluetooth Speaker",
//                 price: "₹7,499",
//                 image:
//                   "https://m.media-amazon.com/images/I/81ExhpBEbHL._SX679_.jpg",
//               },
//               {
//                 name: "Nike Sports Shoes",
//                 price: "₹4,299",
//                 image:
//                   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiRtYAM7d7TeCp3klPRtNIw2RFUyy7CBijnQ&s",
//               },
//               {
//                 name: "HP Laptop 15s",
//                 price: "₹52,990",
//                 image:
//                   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPWiwW678dEErD4DBcUwmUV2NmDnARLxW2pQ&s",
//               },
//               {
//                 name: "boAt Wireless Earbuds",
//                 price: "₹1,299",
//                 image:
//                   "https://m.media-amazon.com/images/I/61u1VALn6JL._SX679_.jpg",
//               },
//               {
//                 name: "Mi Smart LED TV",
//                 price: "₹32,499",
//                 image:
//                   "https://5.imimg.com/data5/ANDROID/Default/2023/1/LV/FW/RY/160159535/product-jpeg-500x500.jpg",
//               },
//             ].map((item, i) => (
//               <div
//                 key={i}
//                 className="bg-gray-50 rounded-lg shadow hover:shadow-md transition overflow-hidden border border-gray-200"
//               >
//                 <div className="aspect-square p-3 md:p-4 flex items-center justify-center">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-full h-full object-contain max-h-32 md:max-h-40"
//                   />
//                 </div>
//                 <div className="p-3">
//                   <h3 className="font-semibold text-xs sm:text-sm md:text-base mb-1 line-clamp-2 h-8 md:h-10">
//                     {item.name}
//                   </h3>
//                   <p className="text-green-700 font-bold text-sm md:text-base">
//                     {item.price}
//                   </p>
//                   <p className="text-xs text-gray-500 mt-1">Free Delivery</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* TOP BRANDS BY CATEGORY */}
//       <section className="bg-gray-50 py-6 md:py-10 px-4 sm:px-6 mt-8 md:mt-12">
//         <div className="max-w-7xl mx-auto">
//           <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 md:mb-8 text-center">
//             Top Brands by Category
//           </h2>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
//             {/* Mobile Brands */}
//             <div className="p-4 md:p-6 rounded-xl bg-gradient-to-br from-indigo-100 to-white shadow hover:shadow-md transition">
//               <h3 className="text-sm md:text-base lg:text-lg font-bold mb-3 text-indigo-800">
//                 📱 Mobile Brands
//               </h3>
//               <div className="flex flex-wrap gap-2">
//                 {[
//                   "Apple",
//                   "Samsung",
//                   "OnePlus",
//                   "Realme",
//                   "Xiaomi",
//                   "Vivo",
//                   "iQOO",
//                 ].map((brand) => (
//                   <span
//                     key={brand}
//                     className="bg-white px-2 py-1 rounded shadow text-xs md:text-sm font-medium text-gray-700"
//                   >
//                     {brand}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* Laptop Brands */}
//             <div className="p-4 md:p-6 rounded-xl bg-gradient-to-br from-green-100 to-white shadow hover:shadow-md transition">
//               <h3 className="text-sm md:text-base lg:text-lg font-bold mb-3 text-green-800">
//                 💻 Laptop Brands
//               </h3>
//               <div className="flex flex-wrap gap-2">
//                 {["HP", "Dell", "Lenovo", "Asus", "Acer", "Apple", "MSI"].map(
//                   (brand) => (
//                     <span
//                       key={brand}
//                       className="bg-white px-2 py-1 rounded shadow text-xs md:text-sm font-medium text-gray-700"
//                     >
//                       {brand}
//                     </span>
//                   )
//                 )}
//               </div>
//             </div>

//             {/* TV & Appliances */}
//             <div className="p-4 md:p-6 rounded-xl bg-gradient-to-br from-yellow-100 to-white shadow hover:shadow-md transition">
//               <h3 className="text-sm md:text-base lg:text-lg font-bold mb-3 text-yellow-800">
//                 📺 TV & Appliances
//               </h3>
//               <div className="flex flex-wrap gap-2">
//                 {["Sony", "LG", "Samsung", "Panasonic", "Haier", "TCL"].map(
//                   (brand) => (
//                     <span
//                       key={brand}
//                       className="bg-white px-2 py-1 rounded shadow text-xs md:text-sm font-medium text-gray-700"
//                     >
//                       {brand}
//                     </span>
//                   )
//                 )}
//               </div>
//             </div>

//             {/* Grocery */}
//             <div className="p-4 md:p-6 rounded-xl bg-gradient-to-br from-orange-100 to-white shadow hover:shadow-md transition">
//               <h3 className="text-sm md:text-base lg:text-lg font-bold mb-3 text-orange-800">
//                 🛒 Grocery
//               </h3>
//               <div className="flex flex-wrap gap-2">
//                 {[
//                   "Tata",
//                   "Fortune",
//                   "Patanjali",
//                   "Aashirvaad",
//                   "Dabur",
//                   "Surf Excel",
//                 ].map((brand) => (
//                   <span
//                     key={brand}
//                     className="bg-white px-2 py-1 rounded shadow text-xs md:text-sm font-medium text-gray-700"
//                   >
//                     {brand}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* Food & Snacks */}
//             <div className="p-4 md:p-6 rounded-xl bg-gradient-to-br from-pink-100 to-white shadow hover:shadow-md transition">
//               <h3 className="text-sm md:text-base lg:text-lg font-bold mb-3 text-pink-800">
//                 🍕 Food & Snacks
//               </h3>
//               <div className="flex flex-wrap gap-2">
//                 {[
//                   "Maggie",
//                   "Kellogg's",
//                   "Lays",
//                   "CocaCola",
//                   "Pepsi",
//                   "Parle",
//                   "Nestle",
//                 ].map((brand) => (
//                   <span
//                     key={brand}
//                     className="bg-white px-2 py-1 rounded shadow text-xs md:text-sm font-medium text-gray-700"
//                   >
//                     {brand}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* Furniture */}
//             <div className="p-4 md:p-6 rounded-xl bg-gradient-to-br from-blue-100 to-white shadow hover:shadow-md transition">
//               <h3 className="text-sm md:text-base lg:text-lg font-bold mb-3 text-blue-800">
//                 🛋️ Furniture Brands
//               </h3>
//               <div className="flex flex-wrap gap-2">
//                 {[
//                   "Godrej",
//                   "Urban Ladder",
//                   "Home Centre",
//                   "IKEA",
//                   "Durian",
//                   "Nilkamal",
//                 ].map((brand) => (
//                   <span
//                     key={brand}
//                     className="bg-white px-2 py-1 rounded shadow text-xs md:text-sm font-medium text-gray-700"
//                   >
//                     {brand}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* APP PROMO */}
//       <section className="bg-gradient-to-br from-indigo-700 via-purple-700 to-indigo-800 text-white py-8 md:py-14 px-4 sm:px-6 mt-8 md:mt-12">
//         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-10">
//           {/* Text + CTA */}
//           <div className="text-center md:text-left">
//             <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3 md:mb-4 leading-tight">
//               Shop Anytime, Anywhere
//             </h2>
//             <p className="text-sm sm:text-base md:text-lg text-indigo-100 mb-4 md:mb-6">
//               Download our mobile app and get exclusive offers, faster delivery,
//               and seamless shopping at your fingertips.
//             </p>

//             {/* Store Buttons */}
//             <div className="flex justify-center md:justify-start gap-3 md:gap-4 mb-4">
//               <button
//                 onClick={() => alert("Coming soon...")}
//                 className="focus:outline-none"
//               >
//                 <img
//                   src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png"
//                   alt="Play Store"
//                   className="h-8 sm:h-10 md:h-12 hover:scale-105 transition"
//                 />
//               </button>

//               <button
//                 onClick={() => alert("Coming soon...")}
//                 className="focus:outline-none"
//               >
//                 <img
//                   src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/1280px-Download_on_the_App_Store_Badge.svg.png"
//                   alt="App Store"
//                   className="h-8 sm:h-10 md:h-12 hover:scale-105 transition"
//                 />
//               </button>
//             </div>

//             {/* Optional CTA Button */}
//             <div className="text-center md:text-left">
//               <a
//                 href="/download"
//                 className="inline-block mt-2 px-4 md:px-6 py-1.5 md:py-2 bg-white text-indigo-700 font-semibold rounded shadow hover:bg-indigo-100 transition text-sm md:text-base"
//               >
//                 Learn More
//               </a>
//             </div>
//           </div>

//           {/* Glowing Mobile Image */}
//           <div className="flex justify-center order-first md:order-last">
//             <img
//               src={Banner}
//               className="w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[400px] drop-shadow-2xl"
//               alt="App Preview"
//             />
//           </div>
//         </div>
//       </section>

//       {/* TESTIMONIALS */}
//       <section className="bg-white py-6 md:py-10 px-4 sm:px-6 mt-8 md:mt-12">
//         <div className="max-w-7xl mx-auto text-center">
//           <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 md:mb-6">
//             What Our Customers Say
//           </h2>
//           <div className="flex flex-col md:flex-row gap-3 md:gap-6 justify-center">
//             {[
//               "Fast delivery and great products. Highly satisfied!",
//               "Best prices and excellent customer service!",
//               "Easy returns and quick refunds. Love shopping here!",
//             ].map((testimonial, i) => (
//               <div
//                 key={i}
//                 className="bg-gray-100 p-3 md:p-5 rounded-lg shadow w-full md:w-1/3"
//               >
//                 <p className="italic text-sm md:text-base mb-2">
//                   "{testimonial}"
//                 </p>
//                 <p className="text-xs md:text-sm font-semibold text-right text-gray-700">
//                   — Customer {i + 1}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <ChatBot />
//     </div>
//   );
// };

// export default Home;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaStar,
  FaArrowRight,
  FaTruck,
  FaShieldAlt,
  FaTag,
  FaMobileAlt,
  FaShoppingBag,
  FaLaptop,
  FaTv,
  FaHome,
  FaAppleAlt,
  FaBolt,
  FaTshirt,
  FaSearch,
  FaCrown,
  FaGift,
  FaFire,
  FaShoppingCart,
} from "react-icons/fa";
import SmartphoneDeals from "../Cards/SmartphoneDeals";
import FashionDeals from "../Cards/FashionsDeals";
import CategoryBar from "../Cards/CategoryBar";
import ChatBot from "../components/ChatBot";

const Home = () => {
  const [showAllCategories, setShowAllCategories] = useState(false);

  const features = [
    {
      icon: <FaTruck />,
      title: "Free Delivery",
      desc: "On orders above ₹499",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Payment",
      desc: "100% safe transactions",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: <FaTag />,
      title: "Best Price",
      desc: "Guaranteed lowest prices",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: <FaCrown />,
      title: "Premium Quality",
      desc: "Curated quality products",
      color: "from-purple-500 to-pink-500",
    },
  ];

  const categories = [
    {
      icon: <FaMobileAlt />,
      name: "Mobiles",
      color: "from-blue-500 to-cyan-500",
      items: "2k+ Products",
      route: "/electronic",
      gradient: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20",
    },
    {
      icon: <FaLaptop />,
      name: "Laptops",
      color: "from-purple-500 to-pink-500",
      items: "850+ Products",
      route: "/electronic",
      gradient: "bg-gradient-to-br from-purple-500/20 to-pink-500/20",
    },
    {
      icon: <FaTv />,
      name: "TVs",
      color: "from-amber-500 to-orange-500",
      items: "500+ Products",
      route: "/home&tv",
      gradient: "bg-gradient-to-br from-amber-500/20 to-orange-500/20",
    },
    {
      icon: <FaHome />,
      name: "Home",
      color: "from-emerald-500 to-teal-500",
      items: "1.5k+ Products",
      route: "/home&tv",
      gradient: "bg-gradient-to-br from-emerald-500/20 to-teal-500/20",
    },
    {
      icon: <FaTshirt />,
      name: "Fashion",
      color: "from-rose-500 to-pink-500",
      items: "3k+ Products",
      route: "/fashions",
      gradient: "bg-gradient-to-br from-rose-500/20 to-pink-500/20",
    },
    {
      icon: <FaAppleAlt />,
      name: "Grocery",
      color: "from-green-500 to-lime-500",
      items: "4k+ Products",
      route: "/grocery",
      gradient: "bg-gradient-to-br from-green-500/20 to-lime-500/20",
    },
  ];

  const trendingCategories = [
    {
      name: "Smartphones",
      route: "/electronic",
      image: "https://m.media-amazon.com/images/I/71xb2xOL5ZL._SX679_.jpg",
      count: "2,500+ products",
      tag: "🔥 Trending",
    },
    {
      name: "Laptops",
      route: "/electronic",
      image: "https://m.media-amazon.com/images/I/71TPda7cwUL._SX679_.jpg",
      count: "850+ products",
      tag: "💻 Premium",
    },
    {
      name: "Home Appliances",
      route: "/home&tv",
      image: "https://m.media-amazon.com/images/I/71p-8gPrQQL._SX679_.jpg",
      count: "1,200+ products",
      tag: "🏠 Essential",
    },
    {
      name: "Men's Fashion",
      route: "/fashions",
      image: "https://m.media-amazon.com/images/I/71Ae8RzM2BL._SX679_.jpg",
      count: "1,800+ products",
      tag: "👔 Style",
    },
    {
      name: "Women's Fashion",
      route: "/fashions",
      image: "https://m.media-amazon.com/images/I/61S9Br5qD-L._SX679_.jpg",
      count: "2,200+ products",
      tag: "👗 Trendy",
    },
    {
      name: "Groceries",
      route: "/grocery",
      image: "https://m.media-amazon.com/images/I/81b1Vf+-NQL._SX679_.jpg",
      count: "4,000+ products",
      tag: "🛒 Daily",
    },
    {
      name: "Televisions",
      route: "/home&tv",
      image: "https://m.media-amazon.com/images/I/81QpkIctqPL._SX679_.jpg",
      count: "500+ products",
      tag: "📺 Entertainment",
    },
    {
      name: "Kitchen Essentials",
      route: "/grocery",
      image: "https://m.media-amazon.com/images/I/71mCwOcJvpL._SX679_.jpg",
      count: "1,500+ products",
      tag: "🍳 Cookware",
    },
  ];

  const brandCategories = [
    {
      title: "📱 Mobile Brands",
      brands: [
        "Apple",
        "Samsung",
        "OnePlus",
        "Realme",
        "Xiaomi",
        "Vivo",
        "iQOO",
      ],
      color: "from-indigo-500 to-blue-500",
      iconColor: "text-blue-500",
    },
    {
      title: "💻 Laptop Brands",
      brands: ["HP", "Dell", "Lenovo", "Asus", "Acer", "Apple", "MSI"],
      color: "from-green-500 to-emerald-500",
      iconColor: "text-green-500",
    },
    {
      title: "📺 TV & Appliances",
      brands: ["Sony", "LG", "Samsung", "Panasonic", "Haier", "TCL"],
      color: "from-amber-500 to-orange-500",
      iconColor: "text-amber-500",
    },
    {
      title: "🛒 Grocery Brands",
      brands: [
        "Tata",
        "Fortune",
        "Patanjali",
        "Aashirvaad",
        "Dabur",
        "Surf Excel",
      ],
      color: "from-orange-500 to-red-500",
      iconColor: "text-orange-500",
    },
    {
      title: "🍕 Food & Snacks",
      brands: [
        "Maggie",
        "Kellogg's",
        "Lays",
        "CocaCola",
        "Pepsi",
        "Parle",
        "Nestle",
      ],
      color: "from-pink-500 to-rose-500",
      iconColor: "text-pink-500",
    },
    {
      title: "🛋️ Furniture Brands",
      brands: [
        "Godrej",
        "Urban Ladder",
        "Home Centre",
        "IKEA",
        "Durian",
        "Nilkamal",
      ],
      color: "from-blue-400 to-cyan-500",
      iconColor: "text-cyan-500",
    },
  ];

  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Premium Member",
      text: "Shopizo has completely transformed my shopping experience! The quality and delivery are absolutely exceptional.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Priya Patel",
      role: "Frequent Shopper",
      text: "From electronics to fashion, everything I've bought has been top-notch. Highly recommended to all my friends!",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Amit Kumar",
      role: "Verified Buyer",
      text: "The customer service is outstanding. They truly care about their customers' experience and satisfaction.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-amber-50/30 via-white to-amber-50/20 text-gray-800 font-sans overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-amber-600 via-orange-500 to-amber-600 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-lg text-white px-4 py-2 rounded-full text-sm mb-6 shadow-lg animate-fade-in">
                <FaCrown className="text-amber-200" />
                <span>Premium Shopping Experience</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight">
                Discover Amazing
                <span className="block bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent animate-gradient">
                  Products & Deals
                </span>
              </h1>

              <p className="text-lg md:text-xl text-amber-100/90 mb-6 md:mb-8 max-w-xl mx-auto lg:mx-0">
                Shop from thousands of premium products with exclusive
                discounts, lightning-fast delivery, and guaranteed quality.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/shop"
                  className="group relative bg-white text-amber-700 px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-amber-200/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg"
                >
                  <span>Start Shopping</span>
                  <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                </Link>

                <Link
                  to="/electronic"
                  className="group bg-transparent border-2 border-white/50 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 hover:border-white/80 backdrop-blur-sm transition-all duration-300"
                >
                  <span className="flex items-center gap-2">
                    <FaGift />
                    View Deals
                  </span>
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-8 md:mt-12 flex flex-wrap gap-4 justify-center lg:justify-start">
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl">
                  <div className="text-xl font-bold text-white">50K+</div>
                  <div className="text-sm text-amber-200">Happy Customers</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl">
                  <div className="text-xl font-bold text-white">10K+</div>
                  <div className="text-sm text-amber-200">Premium Products</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl">
                  <div className="text-xl font-bold text-white">4.9★</div>
                  <div className="text-sm text-amber-200">Rating</div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative">
                <img
                  src="https://img.freepik.com/free-psd/horizontal-banner-online-fashion-sale_23-2148585404.jpg?semt=ais_hybrid&w=1380"
                  alt="hero"
                  className="w-full max-w-2xl mx-auto rounded-3xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-500 border-4 border-white/20"
                />

                {/* Floating Badge */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white p-4 rounded-2xl shadow-2xl animate-bounce">
                  <div className="text-center">
                    <div className="text-2xl font-bold">50% OFF</div>
                    <div className="text-sm">Today Only</div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full blur-xl opacity-30"></div>
                <div className="absolute top-10 -right-6 w-16 h-16 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full blur-xl opacity-30"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES BAR */}
      <section className="relative -mt-12 md:-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-amber-100"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} text-white text-xl shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORY BAR SECTION */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-amber-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Shop By{" "}
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                Category
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Explore our carefully curated categories for the best shopping
              experience
            </p>
          </div>

          <div className="mb-8">
            <CategoryBar />
          </div>

          {/* Mobile View (Grid Cards) */}
          <div className="md:hidden">
            <div className="grid grid-cols-2 gap-3 mb-6">
              {categories.slice(0, 4).map((category, index) => (
                <Link
                  key={index}
                  to={category.route}
                  className={`group relative overflow-hidden rounded-xl p-4 ${category.gradient} shadow-md hover:shadow-lg transition-all duration-300 active:scale-[0.98]`}
                >
                  <div className="flex flex-col items-center text-center">
                    {/* Mobile Icon Circle */}
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center mb-2`}
                    >
                      <div className="text-white text-lg">
                        {React.cloneElement(category.icon, {
                          className: "w-5 h-5",
                        })}
                      </div>
                    </div>

                    <h3 className="text-sm font-semibold text-gray-900 mb-1">
                      {category.name}
                    </h3>
                    <p className="text-xs text-gray-600 mb-2">
                      {category.items}
                    </p>

                    {/* Mobile CTA */}
                    <div className="flex items-center gap-1 text-[10px] font-medium text-amber-600">
                      <span>Shop</span>
                      <FaArrowRight className="w-2 h-2 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Mobile Touch Feedback */}
                  <div
                    className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r ${category.color} group-active:w-full transition-all duration-200`}
                  ></div>
                </Link>
              ))}
            </div>

            {/* View More Button for Mobile */}
            {categories.length > 4 && (
              <div className="text-center">
                <button
                  onClick={() => setShowAllCategories(!showAllCategories)}
                  className="w-full py-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200 text-amber-700 font-medium text-sm flex items-center justify-center gap-2"
                >
                  <span>
                    {showAllCategories
                      ? "Show Less"
                      : `View All ${categories.length} Categories`}
                  </span>
                  <FaArrowRight
                    className={`transition-transform ${
                      showAllCategories ? "rotate-90" : ""
                    }`}
                  />
                </button>

                {/* Expanded Categories on Mobile */}
                {showAllCategories && (
                  <div className="mt-3 grid grid-cols-2 gap-3 animate-slideDown">
                    {categories.slice(4).map((category, index) => (
                      <Link
                        key={index + 4}
                        to={category.route}
                        className={`group relative overflow-hidden rounded-xl p-4 ${category.gradient} shadow-md hover:shadow-lg transition-all duration-300 active:scale-[0.98]`}
                      >
                        <div className="flex flex-col items-center text-center">
                          <div
                            className={`w-10 h-10 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center mb-2`}
                          >
                            <div className="text-white text-sm">
                              {React.cloneElement(category.icon, {
                                className: "w-4 h-4",
                              })}
                            </div>
                          </div>

                          <h3 className="text-xs font-semibold text-gray-900 mb-1 truncate w-full">
                            {category.name}
                          </h3>
                          <p className="text-[10px] text-gray-600 mb-1">
                            {category.items}
                          </p>

                          <div className="flex items-center gap-0.5 text-[9px] font-medium text-amber-600">
                            <span>Shop</span>
                            <FaArrowRight className="w-1.5 h-1.5" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Desktop View (Original Layout) */}
          <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.route}
                className={`group relative overflow-hidden rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${category.gradient}`}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white"></div>
                </div>

                <div className="relative flex items-center gap-6">
                  <div
                    className={`p-4 rounded-2xl bg-gradient-to-br ${category.color} text-white text-2xl shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    {category.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 mb-2">{category.items}</p>
                    <div className="flex items-center gap-2 text-sm font-medium text-amber-600">
                      <span>Shop Now</span>
                      <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Hover Effect Line */}
                <div
                  className={`absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r ${category.color} group-hover:w-full transition-all duration-500`}
                ></div>
              </Link>
            ))}
          </div>

          {/* Mobile Animation Styles */}
          <style jsx>{`
            @keyframes slideDown {
              from {
                opacity: 0;
                transform: translateY(-10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .animate-slideDown {
              animation: slideDown 0.3s ease-out;
            }
          `}</style>
        </div>
      </section>

      {/* TRENDING CATEGORIES */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-amber-50/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold mb-6 shadow-lg">
              <FaFire className="animate-pulse" />
              <span>Trending Now</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                Trending
              </span>
              <span className="text-gray-800"> Categories</span>
            </h2>

            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
              Discover the most popular categories among our shoppers
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {trendingCategories.map((category, index) => (
              <Link
                key={index}
                to={category.route}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Image Container */}
                <div className="relative h-56 md:h-64 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                  {/* Tag Badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg ${
                        index === 0
                          ? "bg-gradient-to-r from-red-500 to-pink-500 animate-pulse"
                          : "bg-gradient-to-r from-amber-500 to-orange-500"
                      }`}
                    >
                      {category.tag}
                    </span>
                  </div>

                  {/* Hot Badge for First Item */}
                  {index === 0 && (
                    <div className="absolute top-4 right-4 animate-bounce">
                      <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                        <span className="text-white text-xs font-bold flex items-center gap-1">
                          🔥 #1 Trending
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900">
                      {category.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      <FaStar className="w-4 h-4 text-amber-400" />
                      <span className="text-xs text-gray-500">4.8</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                      <span className="text-sm text-gray-600">
                        {category.count}
                      </span>
                    </div>
                    <span className="text-xs text-amber-600 font-medium">
                      30% OFF
                    </span>
                  </div>

                  {/* Shop Button */}
                  <div className="flex items-center justify-between">
                    <button className="group/btn flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium text-sm transition-colors">
                      <span>Shop Now</span>
                      <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>

                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((_, i) => (
                        <div
                          key={i}
                          className="w-6 h-6 rounded-full border-2 border-white bg-gradient-to-br from-amber-100 to-orange-100"
                        ></div>
                      ))}
                      <div className="w-6 h-6 rounded-full border-2 border-white bg-amber-500 flex items-center justify-center text-white text-xs">
                        +5
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500 group-hover:w-full transition-all duration-500"></div>
              </Link>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12 md:mt-16">
            <Link
              to="/categories"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-amber-200/50 hover:scale-105 transition-all duration-300"
            >
              <span>View All Categories</span>
              <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-100 text-center">
              <div className="text-2xl md:text-3xl font-bold text-amber-600">
                10K+
              </div>
              <div className="text-sm text-gray-600 mt-1">Daily Visitors</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-100 text-center">
              <div className="text-2xl md:text-3xl font-bold text-amber-600">
                50K+
              </div>
              <div className="text-sm text-gray-600 mt-1">Products Sold</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-100 text-center">
              <div className="text-2xl md:text-3xl font-bold text-amber-600">
                4.9★
              </div>
              <div className="text-sm text-gray-600 mt-1">Average Rating</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-100 text-center">
              <div className="text-2xl md:text-3xl font-bold text-amber-600">
                24/7
              </div>
              <div className="text-sm text-gray-600 mt-1">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* DEALS SECTIONS */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-amber-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16 md:space-y-20">
          <SmartphoneDeals />
          <FashionDeals />
        </div>
      </section>

      {/* TOP BRANDS */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Top{" "}
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                Brands
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Shop from the most trusted brands across all categories
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {brandCategories.map((category, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100`}
              >
                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${category.color} text-white text-xl mb-4`}
                >
                  {category.title.split(" ")[0]}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.brands.map((brand, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-2 rounded-lg bg-gradient-to-br from-white to-gray-50 shadow text-sm font-medium text-gray-700 hover:bg-gradient-to-br ${category.color} hover:text-white transition-all duration-300 cursor-pointer border border-gray-200 hover:border-transparent`}
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-amber-50 via-orange-50/30 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our{" "}
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                Customers
              </span>{" "}
              Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Join thousands of satisfied customers who love shopping with us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-amber-100"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full border-2 border-amber-200 shadow"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-amber-600">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, idx) => (
                    <FaStar key={idx} className="w-4 h-4 text-amber-400" />
                  ))}
                </div>

                <p className="text-gray-600 italic mb-2">
                  "{testimonial.text}"
                </p>

                <div className="mt-4 pt-4 border-t border-amber-100">
                  <div className="text-xs text-gray-500">
                    Verified Purchase • 2 days ago
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APP PROMO */}
      <section className="relative bg-gradient-to-br from-amber-600 via-orange-500 to-amber-600 overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-48 -translate-y-48 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-400/20 rounded-full translate-x-48 translate-y-48 blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-lg text-white px-4 py-2 rounded-full text-sm mb-6 shadow-lg">
                <FaMobileAlt />
                <span>Download Our App</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6">
                Shop On The Go
                <span className="block text-amber-100">
                  With Our Mobile App
                </span>
              </h2>

              <p className="text-lg text-amber-100/90 mb-6 md:mb-8 max-w-xl">
                Get exclusive app-only deals, faster checkout, personalized
                recommendations, and track your orders in real-time.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="group bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png"
                    alt="Play Store"
                    className="h-8"
                  />
                  <div className="text-left">
                    <div className="text-xs text-gray-500">GET IT ON</div>
                    <div className="text-sm">Google Play</div>
                  </div>
                </button>

                <button className="group bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/1280px-Download_on_the_App_Store_Badge.svg.png"
                    alt="App Store"
                    className="h-8"
                  />
                  <div className="text-left">
                    <div className="text-xs text-gray-500">Download on the</div>
                    <div className="text-sm">App Store</div>
                  </div>
                </button>
              </div>
            </div>

            <div className="relative flex justify-center">
              <div className="relative">
                <img
                  src="https://img.freepik.com/free-psd/blank-screen-smart-phone-mockup_125540-1169.jpg?t=st=1736663553~exp=1736667153~hmac=f23f6f13ffaf46a08f1f6a926d2cc99d54a14759476fde40a9df7fd00f4a2fd4&w=1060"
                  alt="App Preview"
                  className="w-full max-w-sm rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
                />
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white p-4 rounded-2xl shadow-2xl">
                  <div className="text-center">
                    <div className="text-xl font-bold">App Exclusive</div>
                    <div className="text-sm">Extra 10% OFF</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ChatBot />

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;

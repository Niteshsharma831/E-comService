// // src/pages/About.jsx
// import React from "react";
// import { motion } from "framer-motion";
// import {
//   FaCheckCircle,
//   FaShoppingCart,
//   FaShieldAlt,
//   FaShippingFast,
//   FaTags,
// } from "react-icons/fa";

// const About = () => {
//   return (
//     <div className="w-full bg-gray-50 text-gray-800 min-h-screen mt-20">
//       {/* HERO SECTION */}
//       <section className="w-full bg-blue-600 text-white py-16 px-6 md:px-20">
//         <motion.h1
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-4xl md:text-5xl font-bold text-center"
//         >
//           About <span className="text-yellow-300">Shopizo</span>
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7 }}
//           className="mt-4 max-w-3xl mx-auto text-center text-lg md:text-xl"
//         >
//           Your trusted shopping destination where high-quality products,
//           affordable prices, and great customer experience come together.
//         </motion.p>
//       </section>

//       {/* ABOUT SECTION */}
//       <section className="max-w-6xl mx-auto py-14 px-6 md:px-10">
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.6 }}
//           className="bg-white shadow-xl rounded-2xl p-8 md:p-12"
//         >
//           <h2 className="text-3xl font-bold mb-4 text-gray-900">Who We Are</h2>
//           <p className="text-gray-700 text-lg leading-relaxed">
//             Shopizo is a modern e-commerce platform built with one goal in
//             mind—providing the smoothest and most reliable online shopping
//             experience. We offer a wide variety of products including
//             electronics, fashion, accessories, and home essentials.
//             <br />
//             <br />
//             Our selection is carefully curated to ensure quality, durability,
//             and affordability. From trending gadgets to everyday items, Shopizo
//             is your one-stop destination for all your needs.
//           </p>
//         </motion.div>
//       </section>

//       {/* FEATURES SECTION */}
//       <section className="w-full bg-white py-16 px-6 md:px-20">
//         <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
//           What Makes Shopizo Different?
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
//           <div className="bg-gray-100 p-8 rounded-xl shadow">
//             <FaShoppingCart className="text-blue-600 text-4xl mb-4" />
//             <h3 className="text-xl font-semibold mb-2">Huge Product Range</h3>
//             <p className="text-gray-600">
//               Explore thousands of products across multiple categories.
//             </p>
//           </div>

//           <div className="bg-gray-100 p-8 rounded-xl shadow">
//             <FaShieldAlt className="text-blue-600 text-4xl mb-4" />
//             <h3 className="text-xl font-semibold mb-2">Secure Shopping</h3>
//             <p className="text-gray-600">
//               Your payments and personal data are 100% safe and encrypted.
//             </p>
//           </div>

//           <div className="bg-gray-100 p-8 rounded-xl shadow">
//             <FaShippingFast className="text-blue-600 text-4xl mb-4" />
//             <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
//             <p className="text-gray-600">
//               Quick doorstep delivery with real-time order tracking.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* MISSION SECTION */}
//       <section className="bg-gray-100 py-16 px-6 md:px-20">
//         <div className="max-w-6xl mx-auto">
//           <h2 className="text-3xl font-bold mb-5 text-gray-900">Our Mission</h2>
//           <p className="text-gray-700 text-lg">
//             Our mission is to make online shopping affordable, accessible, and
//             trustworthy. We focus on quality products, smooth delivery, and
//             exceptional customer support.
//           </p>
//         </div>
//       </section>
//       {/* VALUES SECTION */}
//       <section className="bg-white py-16 px-6 md:px-20">
//         <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
//           Our Core Values
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
//           <div className="bg-gray-100 p-8 rounded-xl shadow">
//             <FaCheckCircle className="text-green-600 text-4xl mb-4" />
//             <h3 className="text-xl font-semibold mb-2">Quality First</h3>
//             <p className="text-gray-600">
//               We never compromise on product quality and customer satisfaction.
//             </p>
//           </div>

//           <div className="bg-gray-100 p-8 rounded-xl shadow">
//             <FaTags className="text-yellow-600 text-4xl mb-4" />
//             <h3 className="text-xl font-semibold mb-2">Affordable Prices</h3>
//             <p className="text-gray-600">
//               We offer the most competitive pricing across all categories.
//             </p>
//           </div>

//           <div className="bg-gray-100 p-8 rounded-xl shadow">
//             <FaShieldAlt className="text-blue-600 text-4xl mb-4" />
//             <h3 className="text-xl font-semibold mb-2">Trusted & Secure</h3>
//             <p className="text-gray-600">
//               100% secure payments, encrypted data, and verified sellers.
//             </p>
//           </div>
//         </div>
//       </section>
//       {/* STATS SECTION */}
//       <section className="bg-blue-600 text-white py-16 px-6 md:px-20">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-6xl mx-auto text-center">
//           <div>
//             <h3 className="text-4xl font-bold">10K+</h3>
//             <p className="text-lg">Happy Customers</p>
//           </div>

//           <div>
//             <h3 className="text-4xl font-bold">50K+</h3>
//             <p className="text-lg">Orders Delivered</p>
//           </div>

//           <div>
//             <h3 className="text-4xl font-bold">500+</h3>
//             <p className="text-lg">Verified Sellers</p>
//           </div>

//           <div>
//             <h3 className="text-4xl font-bold">4.9★</h3>
//             <p className="text-lg">Average Rating</p>
//           </div>
//         </div>
//       </section>
//       {/* TESTIMONIALS SECTION */}
//       <section className="bg-gray-50 py-16 px-6 md:px-20">
//         <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
//           What Our Customers Say
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           <div className="bg-white p-8 rounded-xl shadow">
//             <p className="text-gray-700 mb-4">
//               "Amazing service! Products were exactly as described and delivered
//               on time."
//             </p>
//             <h4 className="font-semibold text-gray-900">Rahul Sharma</h4>
//             <p className="text-yellow-500">★★★★★</p>
//           </div>

//           <div className="bg-white p-8 rounded-xl shadow">
//             <p className="text-gray-700 mb-4">
//               "Shopizo has become my go-to shopping site for electronics!"
//             </p>
//             <h4 className="font-semibold text-gray-900">Priya Verma</h4>
//             <p className="text-yellow-500">★★★★★</p>
//           </div>

//           <div className="bg-white p-8 rounded-xl shadow">
//             <p className="text-gray-700 mb-4">
//               "Customer support is super helpful. Highly recommended!"
//             </p>
//             <h4 className="font-semibold text-gray-900">Amit Kumar</h4>
//             <p className="text-yellow-500">★★★★★</p>
//           </div>
//         </div>
//       </section>

//       {/* VISION SECTION */}
//       <section className="bg-white py-16 px-6 md:px-20">
//         <div className="max-w-6xl mx-auto">
//           <h2 className="text-3xl font-bold mb-5 text-gray-900">Our Vision</h2>
//           <p className="text-gray-700 text-lg">
//             We aim to become the most reliable and customer-friendly e-commerce
//             brand by consistently offering value and convenience.
//           </p>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default About;

import React from "react";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaShoppingCart,
  FaShieldAlt,
  FaShippingFast,
  FaTags,
  FaStar,
  FaUsers,
  FaBoxOpen,
  FaHeart,
  FaAward,
  FaGlobeAmericas,
  FaLeaf,
  FaHeadset,
  FaClock,
  FaGift,
  FaShoppingBag, // Added this import
} from "react-icons/fa";

const About = () => {
  const features = [
    {
      icon: <FaShoppingCart />,
      title: "Curated Collection",
      desc: "Handpicked premium products across all categories",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Shopping",
      desc: "256-bit SSL encryption & secure payment gateways",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: <FaShippingFast />,
      title: "Fast Delivery",
      desc: "Same-day & next-day delivery options available",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <FaTags />,
      title: "Best Prices",
      desc: "Price match guarantee & exclusive member deals",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      desc: "Round-the-clock customer service & assistance",
      color: "from-indigo-500 to-blue-500",
    },
    {
      icon: <FaLeaf />,
      title: "Eco-Friendly",
      desc: "Sustainable packaging & eco-conscious delivery",
      color: "from-green-500 to-emerald-500",
    },
  ];

  const values = [
    {
      icon: <FaHeart />,
      title: "Customer First",
      desc: "Your satisfaction is our top priority",
      color: "text-rose-500",
    },
    {
      icon: <FaAward />,
      title: "Quality Excellence",
      desc: "Premium quality products guaranteed",
      color: "text-amber-500",
    },
    {
      icon: <FaGlobeAmericas />,
      title: "Global Standards",
      desc: "International quality & service standards",
      color: "text-blue-500",
    },
    {
      icon: <FaClock />,
      title: "Timely Delivery",
      desc: "On-time delivery promise",
      color: "text-emerald-500",
    },
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers", icon: <FaUsers /> },
    { number: "10K+", label: "Products", icon: <FaBoxOpen /> },
    { number: "500+", label: "Brand Partners", icon: <FaShoppingCart /> },
    { number: "4.9★", label: "Average Rating", icon: <FaStar /> },
  ];

  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Premium Member",
      text: "Shopizo has transformed my shopping experience! The quality and delivery are exceptional.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Priya Patel",
      role: "Frequent Shopper",
      text: "From electronics to fashion, everything I've bought has been top-notch. Highly recommended!",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Amit Kumar",
      role: "Verified Buyer",
      text: "The customer service is outstanding. They truly care about their customers' experience.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-amber-50/50 to-white text-gray-800 min-h-screen pt-24">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-amber-600 via-orange-500 to-amber-600 overflow-hidden py-20 px-4 sm:px-6">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-400/20 rounded-full -translate-x-48 translate-y-48"></div>

        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm mb-6"
          >
            <FaShoppingBag />
            <span>Premium Shopping Experience</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight"
          >
            About{" "}
            <span className="bg-gradient-to-r from-white to-amber-100 bg-clip-text text-transparent">
              Shopizo
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto"
          >
            Where premium shopping meets exceptional experience
          </motion.p>
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Redefining Online Shopping
                </h2>
                <div className="space-y-4 text-gray-700 text-lg">
                  <p>
                    Shopizo is more than just an e-commerce platform - it's a
                    premium shopping experience designed for the modern
                    consumer. We combine cutting-edge technology with
                    human-centered design to create a seamless, enjoyable
                    shopping journey.
                  </p>
                  <p>
                    From our carefully curated product selection to our
                    exceptional customer service, every aspect of Shopizo is
                    crafted to exceed your expectations. We believe that
                    shopping should be effortless, secure, and delightful.
                  </p>
                  <div className="flex items-center gap-4 pt-4">
                    <FaGift className="text-amber-500 text-xl" />
                    <span className="font-semibold text-gray-900">
                      Exclusive Member Benefits
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <img
                  src="https://img.freepik.com/free-vector/online-shopping-concept-illustration_114360-1084.jpg?t=st=1736662819~exp=1736666419~hmac=921170579a9a14b66378c4bde99691596684aa5357a17b209c2c7d9e922d1ebc&w=1380"
                  alt="Shopizo Experience"
                  className="w-full max-w-md rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-b from-white to-amber-50/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                Shopizo
              </span>
              ?
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Discover the features that make us your preferred shopping
              destination
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} text-white text-xl mb-4`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl shadow-xl p-8 md:p-12 text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Our Journey in Numbers
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
                    <div className="text-3xl md:text-4xl font-bold mb-2">
                      {stat.number}
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-amber-200">{stat.icon}</span>
                      <div className="text-sm md:text-base text-amber-100">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-b from-white to-amber-50/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core{" "}
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                Values
              </span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at Shopizo
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className={`text-3xl mb-4 ${value.color}`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Loved by{" "}
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                Thousands
              </span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Hear what our valued customers have to say about their experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full border-2 border-amber-200"
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
                    <FaStar
                      key={idx}
                      className={`w-4 h-4 ${
                        idx < testimonial.rating
                          ? "text-amber-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-gray-600 italic mb-2">
                  "{testimonial.text}"
                </p>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="text-xs text-gray-500">Verified Purchase</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VISION SECTION */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-br from-amber-600 via-orange-500 to-amber-600 text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6">
              <FaGlobeAmericas />
              <span>Our Vision for the Future</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Building Tomorrow's Shopping Experience
            </h2>

            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-amber-100 mb-6">
                We envision a future where shopping is not just a transaction,
                but an experience that brings joy, convenience, and value to
                every customer.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                  <h4 className="font-bold mb-2">Global Expansion</h4>
                  <p className="text-sm text-amber-100">
                    Bringing Shopizo to every corner of the world
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                  <h4 className="font-bold mb-2">AI-Powered Shopping</h4>
                  <p className="text-sm text-amber-100">
                    Personalized recommendations using AI
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                  <h4 className="font-bold mb-2">Sustainable Future</h4>
                  <p className="text-sm text-amber-100">
                    100% sustainable operations by 2030
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl shadow-xl p-8 md:p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Experience Premium Shopping?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Join thousands of satisfied customers and discover why Shopizo is
              the preferred choice for online shopping
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-300">
                Start Shopping Now
              </button>
              <button className="bg-white text-amber-600 border border-amber-200 px-8 py-3 rounded-xl font-bold hover:bg-amber-50 transition-all duration-300">
                Learn More About Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;

// import React from "react";
// import {
//   FaFacebookF,
//   FaInstagram,
//   FaTwitter,
//   FaLinkedinIn,
//   FaYoutube,
// } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const Footer = () => {
//   return (
//     <footer className="bg-gray-900 text-gray-200 pt-10 pb-6">
//       <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
//         {/* About */}
//         <div>
//           <h2 className="text-xl font-semibold mb-4">About Us</h2>
//           <p className="text-sm">
//             Sharma Furniture House is your trusted destination for high-quality
//             smartphones, electronics, and accessories at the best prices.
//           </p>
//         </div>

//         {/* Quick Links */}
//         <div>
//           <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
//           <ul className="space-y-2 text-sm">
//             <li>
//               <a href="/shop" className="hover:text-white">
//                 Shop
//               </a>
//             </li>
//             <li>
//               <Link to="/about" className="hover:text-white">
//                 About
//               </Link>
//             </li>
//             <li>
//               <a href="/contact" className="hover:text-white">
//                 Contact
//               </a>
//             </li>
//             <li>
//               <a href="/faq" className="hover:text-white">
//                 FAQ
//               </a>
//             </li>
//             <li>
//               <a href="/returns" className="hover:text-white">
//                 Returns & Refunds
//               </a>
//             </li>
//           </ul>
//         </div>

//         {/* Newsletter */}
//         <div>
//           <h2 className="text-xl font-semibold mb-4">Newsletter</h2>
//           <p className="text-sm mb-2">
//             Subscribe to get updates on offers & deals
//           </p>
//           <form className="flex flex-col sm:flex-row">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="p-2 text-white rounded sm:rounded-r-none mb-2 sm:mb-0 sm:mr-0 sm:flex-1"
//             />
//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-4 py-2 rounded sm:rounded-l-none hover:bg-blue-700"
//             >
//               Subscribe
//             </button>
//           </form>
//         </div>

//         {/* Contact & Social */}
//         <div>
//           <h2 className="text-xl font-semibold mb-4">Contact</h2>
//           <p className="text-sm mb-2">Phone: +91 9572861917</p>
//           <p className="text-sm mb-4">Email: niteshkumarsharma831@gmail.com</p>

//           <div className="flex gap-4 text-xl">
//             <a
//               href="https://facebook.com"
//               target="_blank"
//               rel="noreferrer"
//               className="hover:text-blue-500"
//             >
//               <FaFacebookF />
//             </a>
//             <a
//               href="https://instagram.com"
//               target="_blank"
//               rel="noreferrer"
//               className="hover:text-pink-500"
//             >
//               <FaInstagram />
//             </a>
//             <a
//               href="https://twitter.com"
//               target="_blank"
//               rel="noreferrer"
//               className="hover:text-sky-400"
//             >
//               <FaTwitter />
//             </a>
//             <a
//               href="https://linkedin.com"
//               target="_blank"
//               rel="noreferrer"
//               className="hover:text-blue-400"
//             >
//               <FaLinkedinIn />
//             </a>
//             <a
//               href="https://youtube.com"
//               target="_blank"
//               rel="noreferrer"
//               className="hover:text-red-500"
//             >
//               <FaYoutube />
//             </a>
//           </div>
//           <p className="mt-5">
//             <a
//               href="/admin/dashboard"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-600 underline"
//             >
//               Admin Login
//             </a>
//           </p>
//         </div>
//       </div>

//       {/* Divider */}
//       <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-600">
//         <p>
//           © {new Date().getFullYear()}{" "}
//           <span className="font-semibold text-yellow-500">🛍️ Shopizo</span>. All
//           rights reserved.
//         </p>
//         <p className="mt-1">
//           Portfolio:
//           <a
//             href="https://devcraftnitesh.vercel.app/"
//             // href="https://myportfolio-ui-2pab.onrender.com/"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-600 hover:underline mx-1"
//           >
//             Devloper Profile I
//           </a>
//           |
//           <a
//             href="https://niteshsharma831.github.io/portfolio/index.html"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-green-500 hover:underline mx-1"
//           >
//             Devloper Profile II
//           </a>
//         </p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaHeart,
  FaShieldAlt,
  FaTruck,
  FaHeadset,
  FaArrowRight,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-gray-200 pt-12 pb-8">
      {/* Top Features Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <FaTruck className="text-xl" />,
              title: "Free Shipping",
              desc: "On orders above ₹499",
              color: "from-blue-500 to-cyan-500",
            },
            {
              icon: <FaShieldAlt className="text-xl" />,
              title: "Secure Payment",
              desc: "100% safe & secure",
              color: "from-emerald-500 to-teal-500",
            },
            {
              icon: <FaHeadset className="text-xl" />,
              title: "24/7 Support",
              desc: "Dedicated customer care",
              color: "from-amber-500 to-orange-500",
            },
            {
              icon: <FaHeart className="text-xl" />,
              title: "Satisfaction",
              desc: "30-day return policy",
              color: "from-rose-500 to-pink-500",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div
                className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${feature.color} text-white mb-4`}
              >
                {feature.icon}
              </div>
              <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand & Description */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-3 rounded-xl">
              <span className="text-2xl font-bold">🛍️</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Shopizo</h2>
              <p className="text-sm text-gray-400">
                Premium Shopping Experience
              </p>
            </div>
          </div>
          <p className="text-gray-400 mb-6 max-w-md">
            Your one-stop destination for premium smartphones, electronics,
            fashion, and home essentials. Experience seamless shopping with
            exclusive deals, lightning-fast delivery, and guaranteed quality.
          </p>
          <div className="flex gap-4 text-xl">
            {[
              {
                icon: <FaFacebookF />,
                color: "hover:text-blue-500",
                link: "https://facebook.com",
              },
              {
                icon: <FaInstagram />,
                color: "hover:text-pink-500",
                link: "https://instagram.com",
              },
              {
                icon: <FaTwitter />,
                color: "hover:text-sky-400",
                link: "https://twitter.com",
              },
              {
                icon: <FaLinkedinIn />,
                color: "hover:text-blue-400",
                link: "https://linkedin.com",
              },
              {
                icon: <FaYoutube />,
                color: "hover:text-red-500",
                link: "https://youtube.com",
              },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.link}
                target="_blank"
                rel="noreferrer"
                className={`bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all duration-300 ${social.color}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-white/10">
            Quick Links
          </h3>
          <ul className="space-y-3">
            {[
              { name: "Home", path: "/" },
              { name: "Shop", path: "/shop" },
              { name: "Categories", path: "/categories" },
              { name: "Today's Deals", path: "/deals" },
              { name: "Best Sellers", path: "/best-sellers" },
              { name: "New Arrivals", path: "/new-arrivals" },
            ].map((link, idx) => (
              <li key={idx}>
                <Link
                  to={link.path}
                  className="flex items-center gap-2 text-gray-400 hover:text-white group transition-colors"
                >
                  <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Help & Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-white/10">
            Help & Support
          </h3>
          <ul className="space-y-3">
            {[
              { name: "Contact Us", path: "/contact" },
              { name: "About", path: "/about" },
              { name: "Shipping Policy", path: "/shipping" },
              { name: "Return Policy", path: "/returns" },
              { name: "Privacy Policy", path: "/privacy" },
              { name: "Terms of Service", path: "/terms" },
            ].map((link, idx) => (
              <li key={idx}>
                <Link
                  to={link.path}
                  className="flex items-center gap-2 text-gray-400 hover:text-white group transition-colors"
                >
                  <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-white/10">
            Stay Updated
          </h3>
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-lg">
                  <FaPhone className="text-amber-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Call Us</p>
                  <p className="text-white font-medium">+91 9572861917</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-lg">
                  <FaEnvelope className="text-amber-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white font-medium">
                    niteshkumarsharma831@gmail.com
                  </p>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <p className="text-sm text-gray-400 mb-3">
                Subscribe for exclusive offers
              </p>
              <form className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1.5 rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 pt-8 border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()}{" "}
              <span className="text-white font-semibold">Shopizo</span>. All
              rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Made with <FaHeart className="inline text-red-500" /> by Nitesh
              Sharma
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a
              href="/admin/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 transition-colors"
            >
              Admin Dashboard
            </a>
            <span className="text-gray-600">•</span>
            <a
              href="https://devcraftnitesh.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Portfolio I
            </a>
            <span className="text-gray-600">•</span>
            <a
              href="https://niteshsharma831.github.io/portfolio/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Portfolio II
            </a>
            <span className="text-gray-600">•</span>
            <Link
              to="/sitemap"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Sitemap
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm">Accepted Payments:</span>
            <div className="flex gap-2">
              <div className="w-8 h-5 bg-white/20 rounded"></div>
              <div className="w-8 h-5 bg-white/20 rounded"></div>
              <div className="w-8 h-5 bg-white/20 rounded"></div>
              <div className="w-8 h-5 bg-white/20 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 z-50"
      >
        <FaArrowRight className="rotate-90" />
      </button>
    </footer>
  );
};

export default Footer;

import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* About */}
        <div>
          <h2 className="text-xl font-semibold mb-4">About Us</h2>
          <p className="text-sm">
            Sharma Furniture House is your trusted destination for high-quality
            smartphones, electronics, and accessories at the best prices.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/shop" className="hover:text-white">
                Shop
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white">
                Contact
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:text-white">
                FAQ
              </a>
            </li>
            <li>
              <a href="/returns" className="hover:text-white">
                Returns & Refunds
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Newsletter</h2>
          <p className="text-sm mb-2">
            Subscribe to get updates on offers & deals
          </p>
          <form className="flex flex-col sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 text-white rounded sm:rounded-r-none mb-2 sm:mb-0 sm:mr-0 sm:flex-1"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded sm:rounded-l-none hover:bg-blue-700"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Contact & Social */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Contact</h2>
          <p className="text-sm mb-2">Phone: +91 9572861917</p>
          <p className="text-sm mb-4">Email: niteshkumarsharma831@gmail.com</p>

          <div className="flex gap-4 text-xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-500"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-pink-500"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-sky-400"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-red-500"
            >
              <FaYoutube />
            </a>
          </div>
          <p className="mt-5">
            <a
              href="/admin/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Admin Login
            </a>
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-600">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-yellow-500">🛍️ Shopizo</span>. All
          rights reserved.
        </p>
        <p className="mt-1">
          Portfolio:
          <a
            href="https://myportfolio-ui-2pab.onrender.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline mx-1"
          >
            Devloper Profile I
          </a>
          |
          <a
            href="https://niteshsharma831.github.io/portfolio/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 hover:underline mx-1"
          >
            Devloper Profile II
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

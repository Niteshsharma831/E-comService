import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaCartPlus, FaFilter, FaTimes } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import FilterPage from "../components/FilterPage";

const HomeAndTv = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);

  const handleAddToCart = async (productId) => {
    try {
      await axios.post(
        "http://localhost:3000/api/users/cart/add",
        { productId, quantity: 1 },
        { withCredentials: true }
      );
      toast.success("✅ Added to cart");
    } catch (err) {
      if (err.response?.status === 401) {
        toast.warning("⚠️ Please login to add items");
      } else {
        toast.error("❌ Failed to add to cart");
      }
    }
  };

  const config = {
    price: { min: 0, max: 100000 },
    subcategories: {
      tv: ["samsung", "sony", "lg", "mi", "oneplus"],
      ac: ["voltas", "blue star", "daikin", "hitachi"],
      refrigerator: ["whirlpool", "samsung", "lg", "haier", "godrej"],
      fan: ["usha", "havells", "orient", "crompton"],
      microwave: ["ifb", "samsung", "lg", "bosch", "panasonic"],
    },
    ratings: [4, 3],
  };

  const applyFilters = ({ sub, maxPrice, ratings }) => {
    let temp = [...products];

    Object.entries(sub).forEach(([cat, arr]) => {
      if (arr.length > 0) {
        temp = temp.filter((p) =>
          p.tags?.some((tag) => arr.includes(tag.toLowerCase()))
        );
      }
    });

    temp = temp.filter((p) => p.price <= maxPrice);

    if (ratings.length > 0) {
      temp = temp.filter((p) => ratings.some((r) => p.rating >= r));
    }

    setFiltered(temp);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/products/getallproducts"
        );
        const all = res.data.products || [];

        const filtered = all.filter((product) => {
          const name = product.name?.toLowerCase() || "";
          const category = product.category?.toLowerCase() || "";

          return (
            category.includes("tv") ||
            category.includes("appliance") ||
            name.includes("tv") ||
            name.includes("ac") ||
            name.includes("washing machine") ||
            name.includes("microwave") ||
            name.includes("refrigerator") ||
            name.includes("fan")
          );
        });

        setProducts(filtered);
        setFiltered(filtered);
        setTimeout(() => setLoading(false), 1000);
      } catch (err) {
        console.error("Error fetching TV & Appliances:", err.message);
        toast.error("❌ Failed to load TV & Appliances");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-50 pt-20 mt-10">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setShowFilter(true)}
          className="flex items-center gap-1 bg-indigo-600 text-white px-3 py-1 text-sm rounded shadow hover:bg-[#5a3ee6] lg:hidden"
        >
          <FaFilter size={14} /> Filter
        </button>
        <h2 className="text-xl sm:text-2xl font-bold">TV & Appliances</h2>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <img
            src="/loader.gif"
            alt="Loading..."
            className="w-40 h-40 animate-pulse"
          />
        </div>
      ) : (
        <div className="flex h-[calc(100vh-150px)] overflow-hidden">
          {/* Sidebar Filter - Desktop */}
          <div className="w-64 hidden lg:block sticky top-24 h-full overflow-y-auto p-4 bg-white shadow">
            <FilterPage categoriesConfig={config} onApply={applyFilters} />
          </div>

          {/* Product Area */}
          <div className="flex-1 overflow-y-auto p-2">
            {filtered.length === 0 ? (
              <div className="flex items-center justify-center min-h-[400px]">
                <p className="text-center text-gray-500 text-lg font-medium">
                  No TV & Appliance products found.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white rounded-lg shadow hover:shadow-md transition duration-300 relative"
                  >
                    <Link to={`/buy/${product._id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-48 w-full object-contain p-4"
                      />
                    </Link>

                    <div className="px-4 pb-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 capitalize">
                        {product.category}
                      </p>
                      <ul className="text-sm text-gray-500 mb-3 list-disc ml-5">
                        {(Array.isArray(product.description)
                          ? product.description
                          : [product.description]
                        )
                          .slice(0, 4)
                          .map((point, i) => (
                            <li key={i}>{point}</li>
                          ))}
                      </ul>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-green-700">
                          ₹{product.price}
                        </span>
                        {product.discount && (
                          <span className="text-sm text-red-600 font-medium">
                            {product.discount}% off
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      title="Add to Cart"
                      onClick={() => handleAddToCart(product._id)}
                      className="absolute top-2 right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 hover:scale-110 transition-transform duration-200 ease-in-out shadow-md hover:shadow-lg group"
                    >
                      <FaCartPlus
                        size={18}
                        className="group-hover:animate-pulse"
                      />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Filter Drawer */}
      {showFilter && (
        <div className="fixed inset-0 z-50 flex">
          {/* Filter Panel */}
          <div className="w-72 bg-white shadow-lg p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Filters</h2>
              <button
                onClick={() => setShowFilter(false)}
                className="text-red-600"
              >
                <FaTimes size={20} />
              </button>
            </div>
            <FilterPage categoriesConfig={config} onApply={applyFilters} />
          </div>

          {/* Overlay */}
          <div
            className="flex-1 bg-black bg-opacity-30"
            onClick={() => setShowFilter(false)}
          />
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default HomeAndTv;

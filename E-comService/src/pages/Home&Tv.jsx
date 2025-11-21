import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCartPlus, FaFilter, FaTimes } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import FilterPage from "../components/FilterPage";
import API from "../api";

const HomeAndTv = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);

  // Add to Cart (API auto changes between live + localhost)
  const handleAddToCart = async (productId) => {
    try {
      await API.post("/users/cart/add", {
        productId,
        quantity: 1,
      });

      toast.success("✅ Added to cart");
    } catch (err) {
      if (err.response?.status === 401) {
        toast.warning("⚠️ Please login to add items");
      } else {
        toast.error("❌ Failed to add to cart");
      }
    }
  };

  // Filter Sidebar Config
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

  // Apply Filters Function
  const applyFilters = ({ sub, maxPrice, ratings }) => {
    let temp = [...products];

    Object.entries(sub).forEach(([category, arr]) => {
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

  // Fetch Products from API.js (auto: localhost + live)
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await API.get("/products/getallproducts");
        const all = res.data.products || [];

        const selected = all.filter((product) => {
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

        setProducts(selected);
        setFiltered(selected);

        setTimeout(() => setLoading(false), 500);
      } catch (err) {
        console.error("Product Load Error:", err);
        toast.error("❌ Unable to load products");
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-50 pt-20 mt-10">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setShowFilter(true)}
          className="flex items-center gap-1 bg-indigo-600 text-white px-3 py-1 text-sm rounded shadow lg:hidden"
        >
          <FaFilter size={14} /> Filter
        </button>
        <h2 className="text-xl sm:text-2xl font-bold">TV & Appliances</h2>
      </div>

      {/* Loading Animation */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <img
            src="/loader.gif"
            className="w-40 h-40 animate-pulse"
            alt="Loading"
          />
        </div>
      ) : (
        <div className="flex h-[calc(100vh-150px)] overflow-hidden">
          {/* Desktop Filter */}
          <div className="w-64 hidden lg:block sticky top-24 h-full overflow-y-auto p-4 bg-white shadow">
            <FilterPage categoriesConfig={config} onApply={applyFilters} />
          </div>

          {/* Product List */}
          <div className="flex-1 overflow-y-auto p-2">
            {filtered.length === 0 ? (
              <div className="flex items-center justify-center min-h-[300px]">
                <p className="text-gray-500 text-lg">No products found</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white rounded-lg shadow hover:shadow-md transition relative"
                  >
                    <Link to={`/buy/${product._id}`}>
                      <img
                        src={product.image}
                        className="h-48 w-full object-contain p-4"
                        alt={product.name}
                      />
                    </Link>

                    <div className="px-4 pb-4">
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      <p className="text-sm text-gray-600 capitalize">
                        {product.category}
                      </p>

                      <ul className="text-sm text-gray-500 ml-5 list-disc">
                        {(Array.isArray(product.description)
                          ? product.description
                          : [product.description]
                        )
                          .slice(0, 3)
                          .map((point, idx) => (
                            <li key={idx}>{point}</li>
                          ))}
                      </ul>

                      <div className="flex justify-between items-center mt-2">
                        <span className="text-lg text-green-700 font-bold">
                          ₹{product.price}
                        </span>
                        {product.discount && (
                          <span className="text-sm text-red-600 font-medium">
                            {product.discount}% off
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => handleAddToCart(product._id)}
                      className="absolute top-2 right-2 bg-blue-600 text-white p-2 rounded-full shadow hover:bg-blue-700 hover:scale-110 transition"
                    >
                      <FaCartPlus size={18} />
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
          <div className="w-72 bg-white shadow-lg p-4">
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

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCartPlus, FaFilter, FaTimes, FaStar } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import FilterPage from "../components/FilterPage";
import API from "../api";

const HomeAndTv = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [isSmall, setIsSmall] = useState(false);

  const navigate = useNavigate();

  // ➤ ADD TO CART
  const handleAddToCart = async (productId) => {
    try {
      await API.post("/users/cart/add", { productId, quantity: 1 });
      toast.success("✅ Added to cart");
    } catch (err) {
      if (err.response?.status === 401) toast.warning("⚠️ Please login");
      else toast.error("❌ Failed to add to cart");
    }
  };

  // ➤ FILTER CONFIG
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

  // ➤ APPLY FILTERS
  const applyFilters = ({ sub, maxPrice, ratings }) => {
    let temp = [...products];
    Object.entries(sub).forEach(([category, arr]) => {
      if (arr.length)
        temp = temp.filter((p) =>
          p.tags?.some((tag) => arr.includes(tag.toLowerCase()))
        );
    });
    temp = temp.filter((p) => p.price <= maxPrice);
    if (ratings.length)
      temp = temp.filter((p) => ratings.some((r) => p.rating >= r));
    setFiltered(temp);
    setShowFilter(false); // close drawer after apply
  };

  // ➤ FETCH PRODUCTS
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

    const handleResize = () => setIsSmall(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-50 pt-20">
      {/* MOBILE FILTER BUTTON */}
      {isSmall && !showFilter && (
        <div className="fixed top-24 left-4 z-50">
          <button
            onClick={() => setShowFilter(true)}
            className="flex items-center gap-1 bg-indigo-600 text-white px-3 py-2 text-sm rounded shadow hover:bg-indigo-700"
          >
            <FaFilter size={14} /> Filter
          </button>
        </div>
      )}

      {/* PAGE HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl sm:text-2xl font-bold">TV & Appliances</h2>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <img
            src="/loader.gif"
            className="w-40 h-40 animate-pulse"
            alt="Loading"
          />
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-150px)] overflow-hidden">
          {/* DESKTOP SIDEBAR */}
          <div className="w-full lg:w-64 sticky top-24 hidden lg:block h-full overflow-y-auto p-4 bg-white shadow rounded">
            <FilterPage categoriesConfig={config} onApply={applyFilters} />
          </div>

          {/* PRODUCT GRID */}
          <div
            className={`flex-1 overflow-y-auto grid gap-4 ${
              isSmall
                ? "grid-cols-2"
                : "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
            }`}
          >
            {filtered.length === 0 ? (
              <p className="text-center text-gray-500 col-span-full mt-20 text-lg">
                No products found.
              </p>
            ) : (
              filtered.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition relative flex flex-col"
                >
                  <Link to={`/buy/${product._id}`}>
                    <img
                      src={product.image}
                      className="h-48 w-full object-contain p-4"
                      alt={product.name}
                    />
                  </Link>

                  <div className="px-4 pb-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      <p className="text-sm text-gray-600 capitalize">
                        {product.category}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            size={12}
                            className={`mr-1 ${
                              i < product.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="text-xs text-gray-500 ml-1">
                          ({product.rating})
                        </span>
                      </div>

                      {/* Description */}
                      <ul className="text-sm text-gray-500 mb-2 list-disc ml-5">
                        {isSmall ? (
                          <li>
                            {Array.isArray(product.description)
                              ? product.description[0]
                              : product.description?.split(".")[0]}
                            ...
                          </li>
                        ) : (
                          (Array.isArray(product.description)
                            ? product.description
                            : [product.description]
                          )
                            .slice(0, 4)
                            .map((point, idx) => <li key={idx}>{point}</li>)
                        )}
                      </ul>

                      {isSmall && (
                        <button
                          onClick={() => navigate(`/buy/${product._id}`)}
                          className="text-blue-600 hover:underline mb-2"
                        >
                          More Details
                        </button>
                      )}
                    </div>

                    {/* Price & Discount */}
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

                  {/* Add to Cart */}
                  <button
                    onClick={() => handleAddToCart(product._id)}
                    className="absolute top-2 right-2 bg-blue-600 text-white p-2 rounded-full shadow hover:bg-blue-700 hover:scale-110 transition"
                  >
                    <FaCartPlus size={18} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* MOBILE FILTER DRAWER */}
      {showFilter && (
        <div className="fixed inset-0 z-50 flex">
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

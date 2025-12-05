import React, { useEffect, useState } from "react";
import API from "../api";
import { Link, useNavigate } from "react-router-dom";
import { FaCartPlus, FaFilter, FaTimes } from "react-icons/fa";
import FilterPage from "../components/FilterPage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ElectronicPage = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSmall, setIsSmall] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = async (productId) => {
    try {
      await API.post("/users/cart/add", { productId, quantity: 1 });
      toast.success("✅ Added to cart");
    } catch (err) {
      if (err.response?.status === 401) toast.warning("⚠️ Please login");
      else toast.error("❌ Failed to add to cart");
    }
  };

  const config = {
    price: { min: 0, max: 150000 },
    subcategories: {
      smartphone: ["samsung", "apple", "redmi", "realme", "vivo", "oppo"],
      laptop: ["gaming", "business", "macbook", "lenovo", "hp", "dell"],
      headsets: ["wired", "wireless", "bluetooth", "over-ear", "in-ear"],
      accessories: ["charger", "cable", "adapter", "powerbank", "mouse"],
    },
    ratings: [4, 3],
  };

  const applyFilters = ({ sub, maxPrice, ratings }) => {
    let temp = [...products];
    Object.entries(sub).forEach(([cat, arr]) => {
      if (arr.length > 0)
        temp = temp.filter((p) =>
          p.tags?.some((tag) => arr.includes(tag.toLowerCase()))
        );
    });
    temp = temp.filter((p) => p.price <= maxPrice);
    if (ratings.length > 0)
      temp = temp.filter((p) => ratings.some((r) => p.rating >= r));
    setFiltered(temp);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products/getallproducts");
        const all = res.data.products || [];
        const electronicItems = all.filter((product) => {
          const cat = product.category?.toLowerCase() || "";
          return (
            cat.includes("electronic") ||
            cat.includes("smartphone") ||
            cat.includes("laptop") ||
            cat.includes("headset") ||
            cat.includes("tv") ||
            cat.includes("appliance")
          );
        });
        setProducts(electronicItems);
        setFiltered(electronicItems);
        setTimeout(() => setLoading(false), 1000);
      } catch (err) {
        console.error(err);
        toast.error("❌ Failed to load products");
        setLoading(false);
      }
    };
    fetchProducts();

    const handleResize = () => setIsSmall(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <img src="/loader.gif" alt="Loading..." className="w-40 h-40" />
        </div>
      ) : (
        <div className="flex h-[calc(100vh-80px)] overflow-hidden relative">
          {/* Desktop Filter */}
          <div className="w-64 hidden lg:block sticky top-20 h-full overflow-y-auto p-4 bg-white shadow">
            <FilterPage categoriesConfig={config} onApply={applyFilters} />
          </div>

          {/* Mobile Filter Button */}
          {isSmall && (
            <button
              className="fixed top-24 left-2 z-50 flex items-center gap-2 bg-indigo-600 text-white px-3 py-2 rounded-md shadow-md"
              onClick={() => setShowFilter(true)}
            >
              <FaFilter /> Filter
            </button>
          )}

          {/* Mobile Filter Drawer */}
          {showFilter && (
            <div className="fixed inset-0 z-50 flex">
              <div className="w-72 bg-white h-full p-4 relative shadow-xl">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Filters</h2>
                  <button
                    className="text-red-600"
                    onClick={() => setShowFilter(false)}
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

          {/* Product Grid */}
          <div className="flex-1 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 px-2 sm:px-4">
              Electronic Products
            </h2>

            {filtered.length === 0 ? (
              <div className="text-gray-500 text-lg font-medium px-2 sm:px-4">
                No electronic products found.
              </div>
            ) : (
              <div
                className={`grid gap-4 sm:gap-6 ${
                  isSmall ? "grid-cols-2 px-2" : "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 px-4"
                }`}
              >
                {filtered.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white rounded-lg shadow hover:shadow-md transition relative"
                  >
                    <Link to={`/buy/${product._id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-48 w-full object-contain p-2 sm:p-4"
                      />
                    </Link>

                    <div className="px-3 sm:px-4 py-2">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 capitalize">
                        {product.category}
                      </p>

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
                            .map((point, i) => <li key={i}>{point}</li>)
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

                      <div className="flex justify-between items-center mt-2">
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
                      className="absolute top-2 right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
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

      <ToastContainer />
    </div>
  );
};

export default ElectronicPage;

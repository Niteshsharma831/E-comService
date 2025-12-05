import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCartPlus, FaFilter, FaTimes, FaStar } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import FilterPage from "../components/FilterPage";
import API from "../api"; // API instance
import "react-toastify/dist/ReactToastify.css";

const GroceryPage = () => {
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
    price: { min: 0, max: 10000 },
    subcategories: {
      staples: ["rice", "atta", "dal", "flour", "oil"],
      snacks: ["biscuits", "chips", "namkeen", "noodles"],
      beverages: ["tea", "coffee", "juice", "soft drinks"],
      spices: ["turmeric", "chili", "coriander", "garam masala"],
      dairy: ["milk", "paneer", "butter", "curd"],
    },
    ratings: [4, 3],
  };

  // ➤ APPLY FILTERS
  const applyFilters = ({ sub, maxPrice, ratings }) => {
    let temp = [...products];
    Object.entries(sub).forEach(([cat, arr]) => {
      if (arr.length)
        temp = temp.filter((p) =>
          p.tags?.some((tag) => arr.includes(tag.toLowerCase()))
        );
    });
    temp = temp.filter((p) => p.price <= maxPrice);
    if (ratings.length)
      temp = temp.filter((p) => ratings.some((r) => p.rating >= r));
    setFiltered(temp);
    setShowFilter(false); // close drawer on apply
  };

  // ➤ FETCH PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products/getallproducts");
        const allProducts = res.data.products || [];
        const groceryFiltered = allProducts.filter((product) => {
          const category = product.category?.toLowerCase() || "";
          const name = product.name?.toLowerCase() || "";
          return (
            category.includes("grocery") ||
            category.includes("food") ||
            category.includes("daily needs") ||
            ["rice", "atta", "dal", "oil", "grocery"].some((keyword) =>
              name.includes(keyword)
            )
          );
        });
        setProducts(groceryFiltered);
        setFiltered(groceryFiltered);
        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error("❌ Failed to load grocery products");
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
    <div className="min-h-screen bg-gray-50 pt-[84px] px-4">
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">🛒 Grocery Items</h2>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <img
            src="/loader.gif"
            alt="Loading..."
            className="w-32 h-32 animate-pulse"
          />
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* DESKTOP SIDEBAR */}
          <div className="w-full lg:w-64 sticky top-24 hidden lg:block h-fit bg-white p-4 rounded shadow">
            <FilterPage categoriesConfig={config} onApply={applyFilters} />
          </div>

          {/* PRODUCTS GRID */}
          <div
            className={`flex-1 grid gap-4 ${
              isSmall
                ? "grid-cols-2"
                : "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
            }`}
          >
            {filtered.length === 0 ? (
              <p className="text-center text-gray-500 col-span-full mt-20 text-lg">
                No Grocery products found.
              </p>
            ) : (
              filtered.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300 relative flex flex-col"
                >
                  <Link to={`/buy/${product._id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-48 w-full object-contain p-4"
                    />
                  </Link>

                  <div className="px-4 pb-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2 capitalize">
                        {product.category}
                      </p>

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

                      <ul className="text-sm text-gray-500 mb-3 list-disc ml-5">
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
                    </div>

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
                    onClick={() => handleAddToCart(product._id)}
                    title="Add to Cart"
                    className="absolute top-2 right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 hover:scale-110 transition-transform shadow-md"
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
          <div className="w-72 bg-white shadow-lg p-4 overflow-y-auto animate-slideIn">
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

export default GroceryPage;

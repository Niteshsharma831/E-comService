import React, { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";
import { FaCartPlus, FaFilter, FaTimes, FaStar } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FilterPage from "../components/FilterPage";

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);

  const handleAddToCart = async (productId) => {
    try {
      await API.post("/users/cart/add", { productId, quantity: 1 });
      toast.success("Added to cart ✔", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (err) {
      if (err.response?.status === 401) {
        toast.warning("Please login to add items", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.error("Failed to add to cart ❌", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  const config = {
    price: { min: 0, max: 100000 },
    subcategories: {
      electronic: [
        "mobile",
        "smartphone",
        "laptop",
        "tab",
        "headphones",
        "camera",
        "smartwatch",
        "router",
        "printer",
        "monitor",
        "keyboard",
      ],
      furniture: [
        "sofa",
        "table",
        "chair",
        "bed",
        "wardrobe",
        "bookshelf",
        "dining table",
      ],
      grocery: [
        "vegetables",
        "fruits",
        "rice",
        "flour",
        "oil",
        "snacks",
        "dry fruits",
      ],
      beauty: ["facewash", "cream", "makeup", "lipstick", "shampoo", "beauty"],
      fashion: [
        "tops",
        "kurti",
        "cap",
        "jeans",
        "tshirt",
        "hoodie",
        "jacket",
        "fashion",
      ],
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
    if (ratings.length > 0)
      temp = temp.filter((p) => ratings.some((r) => p.rating >= r));
    setFiltered(temp);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products/getallproducts");
        const all = res.data.products || [];
        setProducts(all);
        setFiltered(all);
        setTimeout(() => setLoading(false), 700);
      } catch (err) {
        toast.error("Failed to load products");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <img src="/loader.gif" alt="Loading..." className="w-32 h-32" />
        </div>
      ) : (
        <div className="flex h-[calc(100vh-90px)] overflow-hidden">
          {/* Desktop Filter */}
          <div className="hidden lg:block w-64 border-r bg-white shadow-sm">
            <div className="sticky top-24 h-[calc(100vh-96px)] overflow-y-auto">
              <FilterPage categoriesConfig={config} onApply={applyFilters} />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-y-auto p-3 sm:p-5">
            {/* Header Row */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl sm:text-2xl font-bold">
                Explore Products
              </h2>

              {/* Mobile Filter Button */}
              <button
                className="lg:hidden flex items-center gap-1 bg-indigo-600 text-white px-3 py-2 rounded-md shadow-md"
                onClick={() => setShowFilter(true)}
              >
                <FaFilter /> Filter
              </button>
            </div>

            {/* Mobile Filter Drawer */}
            {showFilter && (
              <div className="fixed inset-0 bg-black/50 z-50 flex">
                <div className="w-72 bg-white h-full p-4 relative shadow-xl">
                  <button
                    className="absolute top-3 right-3 text-red-600"
                    onClick={() => setShowFilter(false)}
                  >
                    <FaTimes size={20} />
                  </button>
                  <FilterPage
                    categoriesConfig={config}
                    onApply={applyFilters}
                  />
                </div>
                <div className="flex-1" onClick={() => setShowFilter(false)} />
              </div>
            )}

            {/* Product Grid */}
            {filtered.length === 0 ? (
              <p className="text-gray-600 text-lg">No products found.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {filtered.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-200 overflow-hidden relative border border-gray-200"
                  >
                    <Link to={`/buy/${product._id}`}>
                      <div className="bg-gray-100 p-3 sm:p-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-32 sm:h-48 w-full object-contain"
                        />
                      </div>
                    </Link>

                    <div className="px-3 sm:px-4 py-3">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 capitalize">
                        {product.category}
                      </p>
                      <div className="flex items-center gap-1 mt-1 text-yellow-500">
                        {Array(4)
                          .fill()
                          .map((_, i) => (
                            <FaStar key={i} size={12} />
                          ))}
                      </div>
                      <ul className="text-xs sm:text-sm text-gray-600 mt-2 list-disc ml-4">
                        {(Array.isArray(product.description)
                          ? product.description
                          : [product.description]
                        )
                          .slice(0, 2)
                          .map((point, i) => (
                            <li key={i}>{point}</li>
                          ))}
                      </ul>

                      {/* Small screen "More Details" link */}
                      <div className="sm:hidden">
                        <Link
                          to={`/buy/${product._id}`}
                          className="text-indigo-600 mt-2 text-sm font-medium underline block"
                        >
                          More Details
                        </Link>
                      </div>

                      <div className="flex justify-between items-center mt-3">
                        <span className="text-lg font-bold text-green-700">
                          ₹{product.price}
                        </span>
                        {product.discount && (
                          <span className="text-sm text-red-500 font-medium">
                            {product.discount}% off
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      title="Add to Cart"
                      onClick={() => handleAddToCart(product._id)}
                      className="absolute top-2 right-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9"
                    >
                      <FaCartPlus className="text-[15px] sm:text-[18px]" />
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

export default ShopPage;

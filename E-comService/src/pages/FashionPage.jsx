import React, { useEffect, useState } from "react";
import API from "../api";
import { Link, useNavigate } from "react-router-dom";
import { FaCartPlus, FaFilter, FaTimes } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import FilterPage from "../components/FilterPage";
import "react-toastify/dist/ReactToastify.css";

const FashionPage = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [isSmall, setIsSmall] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = async (productId) => {
    try {
      await API.post("/users/cart/add", { productId, quantity: 1 });
      toast.success("✅ Added to cart");
    } catch (err) {
      if (err.response?.status === 401)
        toast.warning("⚠️ Please login to add items");
      else toast.error("❌ Failed to add to cart");
    }
  };

  const config = {
    price: { min: 0, max: 5000 },
    subcategories: {
      fashion: [
        "tops",
        "kurti",
        "cap",
        "jeans",
        "tshirt",
        "hoodie",
        "formal",
        "casual",
        "shirt",
        "jacket",
        "sweater",
        "leggings",
        "blazer",
        "trousers",
        "shorts",
        "skirt",
        "tanktop",
        "innerwear",
        "suit",
      ],
      accessories: [
        "belt",
        "watch",
        "bag",
        "wallet",
        "sunglasses",
        "hat",
        "scarf",
        "gloves",
        "necklace",
        "bracelet",
        "earrings",
        "ring",
        "cap",
        "hairband",
        "clutch",
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

        const filteredProducts = all.filter((product) => {
          const name = product.name?.toLowerCase() || "";
          const category = product.category?.toLowerCase() || "";
          return (
            category.includes("fashion") ||
            category.includes("clothing") ||
            ["shirt", "jeans", "tshirt", "kurti", "dress", "hoodie"].some(
              (keyword) => name.includes(keyword)
            )
          );
        });

        setProducts(filteredProducts);
        setFiltered(filteredProducts);
        setLoading(false);
      } catch (err) {
        toast.error("❌ Failed to load fashion products");
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
    <div className="min-h-screen bg-gray-50 pt-24">
      {/* MOBILE FILTER BUTTON */}
      {isSmall && !showFilter && (
        <div className="fixed top-24 left-4 z-50">
          <button
            onClick={() => setShowFilter(true)}
            className="flex items-center gap-1 bg-indigo-600 text-white px-3 py-2 text-sm rounded shadow-md hover:bg-indigo-700"
          >
            <FaFilter size={14} /> Filter
          </button>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <img src="/loader.gif" alt="Loading..." className="w-40 h-40" />
        </div>
      ) : (
        <div className="flex h-[calc(100vh-96px)] overflow-hidden">
          {/* DESKTOP FILTER */}
          <div className="w-64 hidden lg:block sticky top-24 h-full overflow-y-auto p-4 bg-white shadow">
            <FilterPage categoriesConfig={config} onApply={applyFilters} />
          </div>

          {/* PRODUCT GRID */}
          <div
            className={`flex-1 overflow-y-auto ${
              isSmall ? "px-0 mt-0" : "px-4 sm:px-6"
            }`}
          >
            <h2 className="text-2xl font-bold mb-4 px-2 sm:px-4">
              Fashion Collection
            </h2>

            {filtered.length === 0 ? (
              <div className="text-gray-500 text-lg font-medium px-2 sm:px-4">
                No products found.
              </div>
            ) : (
              <div
                className={`grid gap-4 sm:gap-6 ${
                  isSmall
                    ? "grid-cols-2 px-2 mt-2"
                    : "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 px-4"
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

export default FashionPage;

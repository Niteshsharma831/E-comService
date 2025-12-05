import React, { useEffect, useState } from "react";
import API from "../api";
import { Link, useNavigate } from "react-router-dom";
import { FaCartPlus, FaFilter, FaTimes } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import FilterPage from "../components/FilterPage";

const FashionPage = () => {
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
      if (err.response?.status === 401)
        toast.warning("⚠️ Please login to add items");
      else toast.error("❌ Failed to add to cart");
    }
  };

  // ➤ FILTER CONFIG
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

  // ➤ APPLY FILTERS
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

  // ➤ FETCH PRODUCTS
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
            name.includes("shirt") ||
            name.includes("jeans") ||
            name.includes("tshirt") ||
            name.includes("kurti") ||
            name.includes("dress") ||
            name.includes("hoodie")
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

    // Detect small screen
    const handleResize = () => setIsSmall(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4">
      {/* MOBILE FILTER BUTTON */}
      <div className="fixed top-22 left-4 z-50 lg:hidden">
        <button
          onClick={() => setShowFilter(true)}
          className="flex items-center gap-1 bg-[#6B46FF] text-white px-3 py-2 text-sm rounded shadow-md hover:bg-[#5a3ee6]"
        >
          <FaFilter size={14} />
          Filter
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <img src="/loader.gif" alt="Loading..." className="w-40 h-40" />
        </div>
      ) : (
        <div className="flex h-[calc(100vh-150px)] overflow-hidden">
          {/* DESKTOP SIDEBAR */}
          <div className="w-64 hidden lg:block sticky top-20 h-full overflow-y-auto p-4 bg-white shadow">
            <FilterPage categoriesConfig={config} onApply={applyFilters} />
          </div>

          {/* PRODUCT LISTING */}
          <div className="flex-1 overflow-y-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Fashion Collection</h2>

            {filtered.length === 0 ? (
              <div className="text-gray-500 text-lg font-medium">
                No products found.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white rounded-lg shadow hover:shadow-md transition relative"
                  >
                    {/* IMAGE LINK */}
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

                      {/* DESCRIPTION */}
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

                      {/* MORE DETAILS BUTTON */}
                      {isSmall && (
                        <button
                          onClick={() => navigate(`/buy/${product._id}`)}
                          className="text-blue-600 hover:underline mb-2"
                        >
                          More Details
                        </button>
                      )}

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

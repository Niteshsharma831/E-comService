import React, { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";
import { FaCartPlus, FaFilter, FaTimes } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FilterPage from "../components/FilterPage";

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);

  // ---------------- Add to Cart --------------------
  const handleAddToCart = async (productId) => {
    try {
      await API.post("/users/cart/add", {
        productId,
        quantity: 1,
      });

      toast.success("✅ Added to cart", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (err) {
      if (err.response?.status === 401) {
        toast.warning("⚠️ Please login to add items", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.error("❌ Failed to add to cart", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  // ---------------- Filter Config --------------------
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
        "electronics",
      ],
      "tv and appliance": [
        "led tv",
        "washing machine",
        "refrigerator",
        "ac",
        "oven",
        "geyser",
        "microwave",
        "vacuum cleaner",
        "dishwasher",
        "air purifier",
        "electronics",
      ],
      furniture: [
        "sofa",
        "table",
        "chair",
        "bed",
        "wardrobe",
        "bookshelf",
        "dining table",
        "tv unit",
        "recliner",
        "storage box",
        "shoe rack",
      ],
      grocery: [
        "vegetables",
        "fruits",
        "rice",
        "flour",
        "oil",
        "spices",
        "dairy",
        "pulses",
        "snacks",
        "dry fruits",
        "beverages",
      ],
      beauty: [
        "facewash",
        "cream",
        "perfume",
        "makeup",
        "lipstick",
        "body lotion",
        "shampoo",
        "conditioner",
        "nail polish",
        "eyeliner",
        "beauty",
      ],
      fashion: [
        "tops",
        "kurti",
        "cap",
        "jeans",
        "tshirt",
        "hoodie",
        "formal",
        "casual",
        "jacket",
        "dress",
        "fashion",
      ],
    },
    ratings: [4, 3],
  };

  // ---------------- Filter Apply Function --------------------
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

  // ---------------- Fetch Products --------------------
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products/getallproducts");

        const all = res.data.products || [];
        setProducts(all);
        setFiltered(all);

        setTimeout(() => setLoading(false), 1000);
      } catch (err) {
        console.error("Error fetching products:", err.message);
        toast.error("❌ Failed to load products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-20 mt-10">
      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <img src="/loader.gif" alt="Loading..." className="w-40 h-40" />
        </div>
      ) : (
        <div className="flex h-[calc(100vh-80px)] overflow-hidden">
          {/* Sidebar: Desktop */}
          <div className="sticky top-20 h-full overflow-y-auto hidden lg:block w-64 shrink-0 bg-white border-r shadow-sm">
            <FilterPage categoriesConfig={config} onApply={applyFilters} />
          </div>

          {/* Mobile Filter Button */}
          <div className="lg:hidden p-4 fixed top-20 left-4 z-50">
            <button
              onClick={() => setShowFilter(true)}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700"
            >
              <FaFilter /> Filter
            </button>
          </div>

          {/* Mobile Drawer Filter Sidebar */}
          {showFilter && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
              <div className="w-64 bg-white h-full p-4 overflow-y-auto relative shadow-lg">
                <button
                  className="absolute top-3 right-3 text-red-600"
                  onClick={() => setShowFilter(false)}
                >
                  <FaTimes size={20} />
                </button>
                <h2 className="text-xl font-bold mb-4">Filters</h2>
                <FilterPage categoriesConfig={config} onApply={applyFilters} />
              </div>
              <div
                className="flex-1"
                onClick={() => setShowFilter(false)}
              ></div>
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1 overflow-y-auto p-4">
            <h2 className="text-2xl font-bold mb-4">All Products</h2>

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

export default ShopPage;

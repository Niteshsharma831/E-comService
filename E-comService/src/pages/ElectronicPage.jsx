import React, { useEffect, useState } from "react";
import API from "../api"; // ⬅ use axios instance
import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import FilterPage from "../components/FilterPage";
import { toast, ToastContainer } from "react-toastify";

const ElectronicPage = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  // ----------------------------
  // ADD TO CART
  // ----------------------------
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

  // ----------------------------
  // FILTER CONFIG
  // ----------------------------
  const config = {
    price: { min: 0, max: 150000 },
    subcategories: {
      smartphone: [
        "samsung",
        "apple",
        "redmi",
        "realme",
        "vivo",
        "oppo",
        "motorola",
        "oneplus",
        "iqoo",
        "infinix",
        "nothing",
      ],
      laptop: [
        "gaming",
        "business",
        "student",
        "macbook",
        "lenovo",
        "hp",
        "dell",
        "acer",
        "msi",
        "asus",
        "chromebook",
      ],
      headsets: [
        "wired",
        "wireless",
        "bluetooth",
        "over-ear",
        "in-ear",
        "neckband",
        "noise-cancelling",
        "gaming",
        "true wireless",
        "headphones",
        "earbuds",
      ],
      accessories: [
        "charger",
        "cable",
        "adapter",
        "powerbank",
        "screen guard",
        "phone case",
        "mouse",
        "keyboard",
        "usb hub",
        "stylus",
        "webcam",
      ],
    },
    ratings: [4, 3],
  };

  // ----------------------------
  // APPLY FILTERS
  // ----------------------------
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

  // ----------------------------
  // FETCH ELECTRONICS
  // ----------------------------
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products/getallproducts");

        const all = res.data.products || [];

        const electronicItems = all.filter((product) => {
          const category = product.category?.toLowerCase() || "";
          return (
            category.includes("electronic") ||
            category.includes("smartphone") ||
            category.includes("laptop") ||
            category.includes("headset") ||
            category.includes("tv") ||
            category.includes("appliance")
          );
        });

        setProducts(electronicItems);
        setFiltered(electronicItems);

        setTimeout(() => setLoading(false), 1000);
      } catch (err) {
        console.error("Error fetching electronic products:", err.message);
        toast.error("❌ Failed to load products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ----------------------------
  // UI
  // ----------------------------
  return (
    <div className="min-h-screen bg-gray-50 pt-20 mt-10">
      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <img src="/loader.gif" alt="Loading..." className="w-40 h-40" />
        </div>
      ) : (
        <div className="flex h-[calc(100vh-80px)] overflow-hidden">
          {/* LEFT FILTER SIDEBAR */}
          <div className="w-64 hidden lg:block sticky top-20 h-full overflow-y-auto p-4 bg-white shadow">
            <FilterPage categoriesConfig={config} onApply={applyFilters} />
          </div>

          {/* PRODUCT LISTING */}
          <div className="flex-1 overflow-y-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Electronic Products</h2>

            {filtered.length === 0 ? (
              <div className="text-gray-500 text-lg font-medium">
                No electronic products found.
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

export default ElectronicPage;

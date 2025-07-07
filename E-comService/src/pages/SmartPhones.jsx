import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useIsDesktop from "../hooks/useIsDesktop";

const SmartPhones = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [showFilters, setShowFilters] = useState(false);

  const isDesktop = useIsDesktop();

  const allBrands = ["realme", "samsung", "poco", "vivo", "motorola"];
  const allRatings = ["4", "3"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "https://e-comservice.onrender.com/api/products/getallproducts"
        );
        const phones = res.data.products.filter(
          (product) =>
            product.category.toLowerCase() === "smartphones" &&
            product.isActive !== false
        );
        setProducts(phones);
        setFilteredProducts(phones);
      } catch (err) {
        console.error("Error fetching products:", err.message);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesBrand =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const matchesRating =
        selectedRatings.length === 0 ||
        selectedRatings.some((r) => (product.rating || 0) >= parseFloat(r));
      const matchesPrice = product.price <= maxPrice;
      return matchesBrand && matchesRating && matchesPrice;
    });
    setFilteredProducts(filtered);
  }, [selectedBrands, selectedRatings, maxPrice, products]);

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleRatingChange = (rating) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    );
  };

  return (
    <div className="flex flex-col lg:flex-row w-full bg-gray-50 mt-24">
      {/* Mobile Toggle Filter */}
      <div className="lg:hidden p-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Sidebar */}
      {(showFilters || isDesktop) && (
        <aside
          className="w-full lg:w-1/5 p-4 bg-white border-b lg:border-b-0 lg:border-r 
          lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] overflow-y-auto"
        >
          <h2 className="text-xl font-semibold mb-4">Filters</h2>

          {/* Price Filter */}
          <div className="mb-4">
            <label className="font-medium block mb-2">PRICE</label>
            <input
              type="range"
              min={0}
              max={100000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm">
              <span>Min</span>
              <span>₹{maxPrice}</span>
            </div>
          </div>

          {/* Brand Filter */}
          <div className="mb-4">
            <label className="font-medium block mb-2">BRAND</label>
            {allBrands.map((b, i) => (
              <div key={i}>
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(b)}
                  onChange={() => handleBrandChange(b)}
                  className="mr-2"
                />
                {b}
              </div>
            ))}
          </div>

          {/* Rating Filter */}
          <div>
            <label className="font-medium block mb-2">CUSTOMER RATINGS</label>
            {allRatings.map((r, i) => (
              <div key={i}>
                <input
                  type="checkbox"
                  checked={selectedRatings.includes(r)}
                  onChange={() => handleRatingChange(r)}
                  className="mr-2"
                />
                {r}★ & above
              </div>
            ))}
          </div>
        </aside>
      )}

      {/* Product List */}
      <main className="flex-1 p-4 overflow-y-auto lg:h-[calc(100vh-4rem)]">
        <h2 className="text-2xl font-bold mb-4">Smartphones</h2>

        {filteredProducts.length === 0 ? (
          <p>No products match your filters.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Link
                to={`/buy/${product._id}`}
                key={product._id}
                className="bg-white p-4 shadow-sm rounded-lg hover:shadow-md transition block"
              >
                <div className="flex flex-col items-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-36 w-28 object-contain mb-4"
                  />

                  <h3 className="text-lg font-semibold text-center">
                    {product.name}
                  </h3>
                  <div className="text-sm text-gray-600 mt-1">
                    <span className="text-green-600 font-bold mr-2">
                      {product.rating ? `${product.rating}★` : ""}
                    </span>
                  </div>
                  <ul className="text-sm text-gray-700 list-disc ml-4 mt-2 text-left">
                    {(Array.isArray(product.description)
                      ? product.description
                      : [product.description]
                    ).map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                  <div className="text-xs text-gray-500 mt-2 text-center">
                    1 Year Warranty for Device & 6 Months for Inbox Accessories
                  </div>

                  <div className="mt-4 text-center">
                    <div className="text-lg font-bold text-gray-800">
                      ₹{product.price}
                    </div>
                    {product.originalPrice && (
                      <>
                        <div className="text-sm text-gray-500 line-through">
                          ₹{product.originalPrice}
                        </div>
                        <div className="text-sm text-green-600">
                          {product.discount}% off
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default SmartPhones;

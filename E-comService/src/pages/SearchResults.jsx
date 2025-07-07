// pages/SearchResults.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const query = new URLSearchParams(useLocation().search).get("q");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(
          `https://e-comservice.onrender.com/api/products/search?query=${query}`
        );
        setResults(res.data.products);
      } catch (err) {
        console.error("Search error:", err.message);
      }
    };

    if (query) fetchResults();
  }, [query]);

  return (
    <div className="mt-24 px-4">
      <h2 className="text-xl font-bold mb-4">Search Results for: "{query}"</h2>

      {results.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((product) => (
            <div key={product._id} className="bg-white p-4 shadow rounded">
              <img
                src={product.image}
                alt={product.name}
                className="h-40 object-contain w-full"
              />
              <h3 className="mt-2 font-semibold">{product.name}</h3>
              <p className="text-green-700 font-bold">₹{product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;

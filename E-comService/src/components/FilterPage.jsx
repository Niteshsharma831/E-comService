// src/components/FilterPage.jsx
import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FilterPage = ({ categoriesConfig, onApply }) => {
  const [expandedCat, setExpandedCat] = useState("");
  const [selectedSub, setSelectedSub] = useState({});
  const [maxPrice, setMaxPrice] = useState(categoriesConfig.price.max);
  const [selectedRatings, setSelectedRatings] = useState([]);

  useEffect(() => {
    onApply({ sub: selectedSub, maxPrice, ratings: selectedRatings });
  }, [selectedSub, maxPrice, selectedRatings]);

  const toggleSub = (cat, sub) => {
    setSelectedSub((prev) => {
      const arr = prev[cat] || [];
      return {
        ...prev,
        [cat]: arr.includes(sub) ? arr.filter((s) => s !== sub) : [...arr, sub],
      };
    });
  };

  const toggleRating = (r) =>
    setSelectedRatings((prev) =>
      prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]
    );

  return (
    <aside className="bg-white p-4 space-y-6 rounded shadow w-full lg:w-64 ">
      <h2 className="text-xl font-bold">Filters</h2>

      {/* Price slider */}
      <div>
        <label className="font-semibold">Max Price: ₹{maxPrice}</label>
        <input
          type="range"
          min={categoriesConfig.price.min}
          max={categoriesConfig.price.max}
          value={maxPrice}
          onChange={(e) => setMaxPrice(+e.target.value)}
          className="w-full mt-2"
        />
      </div>

      {/* Categories and subcategories */}
      {Object.entries(categoriesConfig.subcategories).map(([cat, subs]) => (
        <div key={cat}>
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setExpandedCat(expandedCat === cat ? "" : cat)}
          >
            <span className="font-semibold capitalize">{cat}</span>
            {expandedCat === cat ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {expandedCat === cat && (
            <div className="pl-4 mt-2 space-y-1">
              {subs.map((sub) => (
                <div key={sub} className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 accent-blue-600"
                    checked={(selectedSub[cat] || []).includes(sub)}
                    onChange={() => toggleSub(cat, sub)}
                  />
                  <label className="capitalize">{sub}</label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Ratings */}
      <div>
        <label className="font-semibold">Customer Ratings</label>
        <div className="mt-2 space-y-1">
          {categoriesConfig.ratings.map((r) => (
            <div key={r} className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 accent-blue-600"
                checked={selectedRatings.includes(r)}
                onChange={() => toggleRating(r)}
              />
              <label>{r}★ & above</label>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default FilterPage;

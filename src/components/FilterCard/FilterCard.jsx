import React, { useState } from "react";

function FilterCard() {
  const [priceRange, setPriceRange] = useState(0);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumSignificantDigits: 3,
    }).format(price);
  };

  const handlePriceChange = (event) => {
    setPriceRange(event.target.value);
  };

  return (
    <div className="border border-solid border-gray-200 rounded-lg p-4 w-full">
      <h2 className="text-lg font-semibold mb-2">Filter</h2>
      <div className="mb-4">
        <label
          htmlFor="size"
          className="block text-sm font-medium text-gray-700"
        >
          Size:
        </label>
        <select
          id="size"
          name="size"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option>S</option>
          <option>M</option>
          <option>L</option>
          <option>XL</option>
          <option>XXL</option>
        </select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="color"
          className="block text-sm font-medium text-gray-700"
        >
          Color:
        </label>
        <select
          id="color"
          name="color"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option>All</option>
          <option>Red</option>
          <option>Blue</option>
          <option>Green</option>
          <option>Yellow</option>
          <option>Black</option>
          <option>White</option>
        </select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Price Range: {formatPrice(priceRange)}
        </label>
        <input
          type="range"
          id="price"
          name="price"
          min="0"
          max="50000"
          value={priceRange}
          onChange={handlePriceChange}
          className="mt-1 block w-full"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="sort"
          className="block text-sm font-medium text-gray-700"
        >
          Sort By:
        </label>
        <select
          id="sort"
          name="sort"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option>Relevance</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Rating</option>
        </select>
      </div>
    </div>
  );
}

export default FilterCard;

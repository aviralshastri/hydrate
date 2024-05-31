import { useState,useEffect } from "react";
import { AiFillCloseSquare } from "react-icons/ai";

const SmallScreenFilterCard = ({ isOpen, onClose }) => {
  const [priceRange, setPriceRange] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);


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
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-center md:items-center bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-md p-4 rounded-none md:rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Filters</h1>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <AiFillCloseSquare size={40} color="red" />
              </button>
            </div>
            <div className="mt-4 w-full">
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
                  Price Range upto: <h1 className="text-xl">{formatPrice(priceRange)}</h1>
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
              <div className="rounded-lg w-full mt-8 mb-4 flex items-center justify-center">
                <button className="p-2 w-full font-bold text-white bg-blue-600 rounded-full hover:bg-blue-500">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SmallScreenFilterCard;

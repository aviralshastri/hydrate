import React, { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "@/assets/logo.jpg";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { IoSearchCircle } from "react-icons/io5";
import { BiSolidCategory } from "react-icons/bi";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useRouter } from "next/router";

export function CategoryDropdown({ onCategoryChange, markedCategory }) {
  const col1 = ["All", "T-Shirt", "Shirts", "Hoodies"];
  const col2 = ["Oversized", "Sweatshirts", "Jeans", "Cargos"];

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    onCategoryChange(selectedCategory);
  };

  return (
    <div className="flex flex-col space-y-2 py-2 items-center justify-center">
      <div className="text-center items-center justify-center flex flex-row space-x-2">
        <BiSolidCategory size={20} />
        <h1 className="font-bold text-center text-xl">Categories</h1>
      </div>
      <div className="border border-solid w-full border-black"></div>
      <div className="flex flex-row">
        <div className="flex flex-col">
          {col1.map((item, index) => (
            <div key={index} className="flex flex-row">
              <input
                type="radio"
                className="mr-1"
                name="clothing"
                value={item.toLowerCase()}
                onChange={handleCategoryChange}
                checked={markedCategory === item.toLowerCase()}
              />
              <h1 className="font-semibold">{item}</h1>
            </div>
          ))}
        </div>
        <div className="flex flex-col">
          {col2.map((item, index) => (
            <div key={index} className="flex flex-row ml-2">
              <input
                type="radio"
                className="mr-1"
                name="clothing"
                value={item.toLowerCase()}
                onChange={handleCategoryChange}
                checked={markedCategory === item.toLowerCase()}
              />
              <h1 className="font-semibold">{item}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Navbar() {
  const suggestions = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Elderberry",
    "Fig",
    "Grapes",
    "Honeydew",
    "Ice cream",
    "Jackfruit",
    "Kiwi",
    "Lemon",
    "Mango",
    "Nectarine",
    "Orange",
    "Papaya",
    "Quince",
    "Raspberry",
    "Strawberry",
    "Tomato",
    "Ugli fruit",
    "Vanilla",
    "Watermelon",
    "Xigua",
    "Yam",
    "Zucchini",
  ];
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dropdownState, setDropdownState] = useState(false);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setDropdownState(false);
  };
  const DropdownState = () => {
    setDropdownState(!dropdownState);
  };

  useEffect(() => {
    if (query) {
      setFilteredSuggestions(
        suggestions.filter((item) =>
          item.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setFilteredSuggestions([]);
    }
  }, [query]);

  return (
    <div className="flex items-center justify-center py-4 sticky top-0 z-50">
      <div className="sticky top-0 z-50 flex items-center justify-center space-x-8 px-10 shadow-xl rounded-full py-4 xl:w-2/3 w-full md:w-4/5 bg-white">
        <Link href={'/'}>
        <Image
          src={Logo}
          alt="Logo"
          width={70}
          height={70}
          className="rounded-xl"
        /></Link>
        <div className="relative w-full">
          <div className="border border-solid border-black rounded-full flex flex-row w-full bg-gray-50">
            <Popup
              open={dropdownState}
              closeOnEscape
              trigger={
                <button onClick={DropdownState}>
                  <BiSolidCategory
                    color="white"
                    size={40}
                    className="rounded-tl-full rounded-bl-full h-full px-2 py-1 bg-black"
                  />
                </button>
              }
              position="bottom center"
            >
              <CategoryDropdown
                onCategoryChange={handleCategoryChange}
                markedCategory={selectedCategory}
              />
            </Popup>
            <input
              value={query}
              onChange={(e) => {setQuery(e.target.value);
                setSuggestionsOpen(true);
              }}
              type="text"
              placeholder="Search product, brand or category"
              className="bg-gray-50 w-full focus:outline-none px-2"
            />
            <button
              onClick={() => {
                router.push({
                  pathname: "/products",
                  query: { data: query, category: selectedCategory},
                });
              }}
            >
              <IoSearchCircle
                color="white"
                size={50}
                className="rounded-tr-full rounded-br-full h-full px-2 py-1 bg-black"
              />
            </button>
          </div>
          {filteredSuggestions.length > 0 && suggestionsOpen && (
            <div className="absolute mt-1 border border-gray-300 rounded-lg bg-white w-full z-10 max-h-48 overflow-y-auto">
              {filteredSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setQuery(suggestion);
                    setFilteredSuggestions([]);
                    router.push({
                      pathname: "/products",
                      query: { data: suggestion, category: selectedCategory},
                    });
                    setSuggestionsOpen(false);
                  }}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
        <Link href="/profile">
          <FaCircleUser size={35} />
        </Link>
        <Link href="/cart">
          <FaShoppingCart size={35} />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;

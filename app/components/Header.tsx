// components/Header.tsx
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

interface Category {
  name: string;
}

const Header: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);

  // Fetch categories from API
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/category-list")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <header className="w-full bg-white py-4 shadow-md">
      <div className="container mx-auto">
        <h2 className="text-center text-2xl font-semibold mb-4">Shop All</h2>
        <div className="flex justify-center items-center space-x-4 overflow-x-scroll no-scrollbar">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={`/category/${category}`}
              className="flex flex-col items-center space-y-2"
            >
              <div className="w-40 h-16 bg-orange-200 flex items-center justify-center">
                <span className="text-sm font-semibold text-gray-700">
                  {category}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;

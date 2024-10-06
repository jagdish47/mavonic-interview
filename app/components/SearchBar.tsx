"use client";
import React from "react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  return (
    <div className="mb-4 flex justify-center">
      <input
        type="text"
        value={searchTerm}
        onChange={onSearchChange}
        placeholder="Search for products..."
        className="border border-gray-300 p-3 rounded-lg shadow-lg w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
      />
    </div>
  );
};

export default SearchBar;

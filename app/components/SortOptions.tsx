"use client";
import React from "react";

interface SortOptionsProps {
  sortOrder: "asc" | "desc";
  onSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SortOptions: React.FC<SortOptionsProps> = ({
  sortOrder,
  onSortChange,
}) => {
  return (
    <div className="mb-6 flex justify-center space-x-4">
      <div>
        <label htmlFor="sortOrder" className="mr-2 text-lg font-semibold">
          Sort by:
        </label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={onSortChange}
          className="border border-gray-300 p-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
};

export default SortOptions;

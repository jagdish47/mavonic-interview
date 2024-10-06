"use client";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import Header from "@/app/components/Header";

const CategoryPage = ({ params }) => {
  const { slug } = params; // Access the slug from the params

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");

  let debounceTimer;

  // Fetch products based on the category (slug), search term, sorting
  const fetchProducts = async (
    query = "",
    sortBy = "title",
    sortOrder = "asc"
  ) => {
    setLoading(true);
    try {
      let url = `https://dummyjson.com/products/category/${slug}?sortBy=${sortBy}&order=${sortOrder}`;
      if (query) {
        url = `https://dummyjson.com/products/search?q=${query}&limit=100`; // search term and fetch up to 100 products
      }
      const response = await axios.get(url);
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  // Initial fetch on component mount and when slug changes
  useEffect(() => {
    fetchProducts("", sortBy, sortOrder);
  }, [slug, sortBy, sortOrder]);

  // Debounce search function
  const debounceSearch = useCallback(
    (query) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        fetchProducts(query, sortBy, sortOrder);
      }, 500); // 500ms debounce
    },
    [sortBy, sortOrder]
  );

  // Handle search input changes
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    debounceSearch(value);
  };

  // Handle sort change
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  // Handle sort order change
  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  if (loading) {
    return <p className="text-center mt-6">Loading...</p>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center capitalize">
        {slug} Products
      </h1>

      {/* Search Input */}
      <div className="mt-6 flex justify-center">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for products..."
          className="border border-gray-300 rounded-lg shadow-md p-3 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>

      {/* Sorting Options */}
      <div className="mb-6 flex justify-center space-x-6 mt-6">
        <div className="flex items-center">
          <label htmlFor="sortBy" className="mr-3 text-lg font-medium">
            Sort by:
          </label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={handleSortChange}
            className="border border-gray-300 rounded-lg p-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            <option value="title">Title</option>
            <option value="price">Price</option>
          </select>
        </div>

        <div className="flex items-center">
          <label htmlFor="sortOrder" className="mr-3 text-lg font-medium">
            Order:
          </label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={handleSortOrderChange}
            className="border border-gray-300 rounded-lg p-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="border border-gray-300 rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow"
          >
            <div className="flex flex-col items-center">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-32 h-32 object-cover rounded-lg"
              />
              <h2 className="text-xl font-semibold mt-4">{product.title}</h2>
              <p className="text-gray-500 mt-2">${product.price}</p>
            </div>
            <p className="mt-4 text-gray-700">{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;

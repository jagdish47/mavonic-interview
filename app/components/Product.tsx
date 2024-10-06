"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import SortOptions from "./SortOptions";
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";

const Products: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const limit = 10;
  const totalPages = Math.ceil(totalProducts / limit);
  let debounceTimer: NodeJS.Timeout;

  const fetchProducts = async (
    query = "",
    skip = 0,
    sortBy = "title",
    order = "asc"
  ) => {
    setLoading(true);
    try {
      let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}&select=title,price,description,category,thumbnail,discountPercentage,rating,tags,stock`;
      if (query) {
        url = `https://dummyjson.com/products/search?q=${query}&limit=${limit}&skip=${skip}`;
      }
      const response = await axios.get(url);
      setProducts(response.data.products);
      setTotalProducts(response.data.total || response.data.products.length);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts(searchTerm, (page - 1) * limit, "title", sortOrder);
  }, [page, sortOrder]);

  const debounceSearch = (query: string) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      fetchProducts(query, 0);
    }, 500);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    debounceSearch(event.target.value);
    setPage(1); // Reset to first page on search
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value as "asc" | "desc");
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Product List</h1>

      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />

      <SortOptions sortOrder={sortOrder} onSortChange={handleSortChange} />

      {loading ? (
        <p className="text-center text-lg">Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default Products;

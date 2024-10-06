"use client";
import React from "react";
import Image from "next/image";

interface ProductCardProps {
  product: any; // You can define a proper type for your product object
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="border border-gray-200 rounded-lg shadow-lg p-6 bg-white hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full h-40 mb-4">
        <Image
          src={product.thumbnail}
          alt={product.title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
      <p className="text-gray-700 mb-1">Category: {product.category}</p>
      <p className="text-gray-500 mb-2">{product.description}</p>
      <div className="flex justify-between items-center mb-4">
        <span className="text-green-600 font-bold">${product.price}</span>
        <span className="text-red-500 font-semibold">
          -{product.discountPercentage}%
        </span>
        <span className="text-yellow-500 font-semibold">
          Rating: {product.rating}
        </span>
      </div>
      <div
        className={`text-sm ${
          product.stock < 10 ? "text-red-500" : "text-gray-700"
        }`}
      >
        {product.stock < 10 ? "Low Stock" : `In Stock: ${product.stock}`}
      </div>
    </div>
  );
};

export default ProductCard;

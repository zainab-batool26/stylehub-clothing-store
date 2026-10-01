"use client";

import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { products } from "@/data/products";
import { useCart } from "@/components/CartContext";

export default function ShopPage() {
  const { addToCart } = useCart();

const searchParams = useSearchParams();

const [search, setSearch] = useState("");

const categoryFromUrl = searchParams.get("category");

const [category, setCategory] = useState(
  categoryFromUrl || "All"
);

  const categories = ["All", "Women", "Men", "New Arrivals"];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-pink-600">
            StyleHub
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            Shop Our Collection
          </h1>

          <p className="mt-3 text-gray-600">
            Find something you love.
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-pink-500"
          />
        </div>

        {/* Categories */}
        <div className="mb-10 flex flex-wrap gap-3">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition ${
                category === item
                  ? "bg-pink-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Products */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center">
            <h2 className="text-2xl font-semibold text-gray-900">
              No products found
            </h2>

            <p className="mt-2 text-gray-500">
              Try another search or category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Image */}
                <Link href={`/shop/${product.id}`}>
                  <div className="h-80 overflow-hidden bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>

                {/* Information */}
                <div className="p-5">
                  <p className="text-sm text-pink-600">
                    {product.category}
                  </p>

                  <Link href={`/shop/${product.id}`}>
                    <h2 className="mt-1 text-lg font-semibold text-gray-900 hover:text-pink-600">
                      {product.name}
                    </h2>
                  </Link>

                  <p className="mt-2 text-lg font-bold text-gray-900">
                    Rs. {product.price.toLocaleString()}
                  </p>

                  <button
                    onClick={() => addToCart(product, "M", 1)}
                    className="mt-4 w-full rounded-lg bg-gray-900 py-3 text-sm font-semibold text-white transition hover:bg-pink-600"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/CartContext";
import { products } from "@/data/products";

export default function ProductPage() {
  const params = useParams();
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const product = products.find(
    (item) => item.id === Number(params.id)
  );

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Product Not Found
          </h1>

          <Link
            href="/shop"
            className="mt-5 inline-block text-pink-600 underline"
          >
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }

    addToCart(product, selectedSize, quantity);
  };

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12 md:px-12 lg:px-20">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">

            {/* Product Image */}
      <div className="h-[500px] overflow-hidden rounded-2xl bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain"
        />
      </div>

        {/* Product Information */}
        <div className="flex flex-col justify-center">

          <p className="text-sm font-semibold uppercase tracking-widest text-pink-600">
            {product.category}
          </p>

          <h1 className="mt-3 text-4xl font-bold text-gray-900">
            {product.name}
          </h1>

          <p className="mt-5 text-2xl font-bold text-gray-900">
            Rs. {product.price.toLocaleString()}
          </p>

          <p className="mt-6 leading-7 text-gray-600">
            {product.description}
          </p>

          {/* Size */}
          <div className="mt-8">
            <h3 className="font-semibold text-gray-900">
              Select Size
            </h3>

            <div className="mt-3 flex gap-3">
              {["S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`rounded-lg border px-5 py-3 text-sm font-medium transition ${
                    selectedSize === size
                      ? "border-pink-600 bg-pink-600 text-white"
                      : "hover:border-pink-600 hover:text-pink-600"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-8">
            <h3 className="font-semibold text-gray-900">
              Quantity
            </h3>

            <div className="mt-3 flex w-fit items-center rounded-lg border bg-white">
              <button
                onClick={() =>
                  setQuantity((current) =>
                    Math.max(1, current - 1)
                  )
                }
                className="px-5 py-3 text-lg hover:bg-gray-100"
              >
                −
              </button>

              <span className="w-12 text-center font-semibold">
                {quantity}
              </span>

              <button
                onClick={() =>
                  setQuantity((current) => current + 1)
                }
                className="px-5 py-3 text-lg hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="mt-8 rounded-lg bg-gray-900 py-4 font-semibold text-white transition hover:bg-pink-600"
          >
            Add to Cart
          </button>

          <Link
            href="/shop"
            className="mt-4 text-center text-sm text-gray-600 underline"
          >
            ← Continue Shopping
          </Link>

        </div>
      </div>
    </main>
  );
}
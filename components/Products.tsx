"use client";

import Link from "next/link";
import { useCart } from "./CartContext";
import { products } from "@/data/products";

export default function Products() {
  const { addToCart } = useCart();

  return (
    <section className="bg-gray-50 px-6 py-16 md:px-12 lg:px-20">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-pink-600">
            Our Collection
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
            Featured Products
          </h2>
        </div>

        <button className="hidden text-sm font-semibold text-gray-900 underline underline-offset-4 md:block">
          View All →
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="group overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
                  {/* Product Image */}
                  <Link href={`/shop/${product.id}`}>
        <div className="h-72 overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

            {/* Product Information */}
            <div className="p-5">
                        <Link href={`/shop/${product.id}`}>
            <h3 className="text-lg font-semibold text-gray-900 hover:text-pink-600">
              {product.name}
            </h3>
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
    </section>
  );
}
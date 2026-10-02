"use client";

import Link from "next/link";
import { useCart } from "./CartContext";
import { products } from "@/data/products";

export default function Products() {
  const { addToCart } = useCart();

  return (
    <section className="bg-[#111111] px-6 py-20 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
              Curated For You
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
              Featured pieces
            </h2>
          </div>
          <Link href="/shop" className="hidden text-sm font-semibold text-zinc-300 transition hover:text-[#d4af37] md:block">
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <article key={product.id} className="group overflow-hidden rounded-2xl border border-white/10 bg-[#171717] transition duration-300 hover:-translate-y-1 hover:border-white/20">
              <Link href={`/shop/${product.id}`}>
                <div className="h-80 overflow-hidden bg-zinc-900">
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
              </Link>

              <div className="p-5">
                <p className="text-xs uppercase tracking-wider text-[#d4af37]">{product.category}</p>
                <Link href={`/shop/${product.id}`}>
                  <h3 className="mt-2 text-lg font-semibold text-white transition hover:text-[#d4af37]">{product.name}</h3>
                </Link>
                <p className="mt-2 font-semibold text-zinc-200">Rs. {product.price.toLocaleString()}</p>
                <button
                  onClick={() => addToCart(product, "M", 1)}
                  className="mt-5 w-full rounded-full border border-white/15 py-3 text-sm font-semibold text-white transition hover:border-[#d4af37] hover:bg-[#d4af37] hover:text-black"
                >
                  Quick Add
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
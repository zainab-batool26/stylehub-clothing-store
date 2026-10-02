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
  const [category, setCategory] = useState(categoryFromUrl || "All");
  const categories = ["All", "Women", "Men", "New Arrival"];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-[#0b0b0b] px-6 py-12 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#d4af37]">StyleHub</p>
          <h1 className="mt-3 text-4xl font-semibold text-white md:text-5xl">Shop the collection</h1>
          <p className="mt-3 text-zinc-500">Timeless pieces, curated for everyday wear.</p>
        </div>

        <div className="mb-5">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#151515] px-5 py-3.5 text-white outline-none placeholder:text-zinc-600 focus:border-[#d4af37]"
          />
        </div>

        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${category === item ? "bg-[#d4af37] text-black" : "border border-white/10 bg-[#151515] text-zinc-400 hover:border-white/25 hover:text-white"}`}
            >
              {item === "New Arrival" ? "New Arrivals" : item}
            </button>
          ))}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-[#151515] py-20 text-center">
            <h2 className="text-2xl font-semibold text-white">No products found</h2>
            <p className="mt-2 text-zinc-500">Try another search or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <article key={product.id} className="group overflow-hidden rounded-2xl border border-white/10 bg-[#151515] transition hover:-translate-y-1 hover:border-white/20">
                <Link href={`/shop/${product.id}`}>
                  <div className="h-80 overflow-hidden bg-zinc-900">
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                </Link>
                <div className="p-5">
                  <p className="text-xs uppercase tracking-wider text-[#d4af37]">{product.category}</p>
                  <Link href={`/shop/${product.id}`}>
                    <h2 className="mt-2 text-lg font-semibold text-white hover:text-[#d4af37]">{product.name}</h2>
                  </Link>
                  <p className="mt-2 font-semibold text-zinc-200">Rs. {product.price.toLocaleString()}</p>
                  <button onClick={() => addToCart(product, "M", 1)} className="mt-5 w-full rounded-full border border-white/15 py-3 text-sm font-semibold text-white transition hover:border-[#d4af37] hover:bg-[#d4af37] hover:text-black">
                    Quick Add
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
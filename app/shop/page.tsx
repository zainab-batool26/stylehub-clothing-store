"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getProducts, type Product } from "@/lib/products";
import { useCart } from "@/components/CartContext";

export default function ShopPage() {
  const { addToCart } = useCart();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const categoryFromUrl = searchParams.get("category");
  const [category, setCategory] = useState(categoryFromUrl || "All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const categories = ["All", "Women", "Men", "New Arrival"];

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((loadError) => setError(loadError.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (categoryFromUrl) setCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-white px-4 pb-16 pt-6 text-[#202020] sm:px-6 sm:pt-8 lg:px-8 lg:pt-10">
      <div className="mx-auto max-w-7xl">
        <div className="border-b border-black/15 pb-8">
          <p className="text-xs uppercase tracking-[0.25em] text-[#b85d32]">StyleHub / Shop</p>
          <div className="mt-4 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <h1 className="text-4xl font-semibold leading-none tracking-tight sm:text-5xl lg:text-6xl">The collection</h1>
            <p className="max-w-sm text-sm leading-6 text-[#77736d]">Browse the pieces currently available. Search if you already know what you want.</p>
          </div>
        </div>

        <div className="mt-7 grid gap-4 lg:grid-cols-[1fr_auto]">
          <input
            type="text"
            placeholder="Search by product name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-black/20 bg-[#f4f3f0] px-4 py-3 text-sm text-[#202020] outline-none placeholder:text-[#99979a] focus:border-[#b85d32]"
          />
          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={"border px-4 py-2.5 text-xs font-semibold transition " + (
                  category === item
                    ? "border-[#202020] bg-[#202020] text-white"
                    : "border-black/20 bg-transparent text-[#55534f] hover:border-[#202020]/50"
                )}
              >
                {item === "New Arrival" ? "New Arrivals" : item}
              </button>
            ))}
          </div>
        </div>

        {loading && <p className="mt-8 text-sm text-[#77736d]">Loading collection...</p>}
        {error && <p className="mt-8 border border-[#b85c45]/30 bg-[#f1ddd6] p-4 text-sm text-[#8d4635]">{error}</p>}

        {!loading && !error && (
          <>
            <p className="mt-8 text-xs text-[#88868a]">{filteredProducts.length} {filteredProducts.length === 1 ? "piece" : "pieces"}</p>
            {filteredProducts.length === 0 ? (
              <div className="mt-4 border border-black/15 bg-[#f4f3f0] py-20 text-center">
                <h2 className="text-3xl font-semibold tracking-tight">Nothing matched that search.</h2>
                <p className="mt-2 text-sm text-[#77736d]">Try another name or category.</p>
              </div>
            ) : (
              <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-5 sm:gap-y-10 lg:grid-cols-4">
                {filteredProducts.map((product) => (
                  <article key={product.id} className="group">
                    <Link href={"/shop/" + product.id} className="block">
                      <div className="aspect-[4/5] overflow-hidden bg-[#c4c3be]">
                        <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]" />
                      </div>
                    </Link>
                    <div className="pt-4">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-[#b85d32]">{product.category}</p>
                      <Link href={"/shop/" + product.id}>
                        <h2 className="mt-1 text-base font-semibold hover:text-[#b85d32]">{product.name}</h2>
                      </Link>
                      <div className="mt-2 flex items-center justify-between gap-3">
                        <p className="text-sm text-[#55545a]">Rs. {product.price.toLocaleString()}</p>
                        <button onClick={() => addToCart(product, "M", 1)} className="border-b border-[#202020]/30 text-xs font-semibold hover:border-[#b85d32] hover:text-[#b85d32]">Quick add</button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}

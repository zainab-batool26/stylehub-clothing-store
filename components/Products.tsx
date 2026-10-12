"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import { getProducts, type Product } from "@/lib/products";

export default function Products() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts).catch(() => {});
  }, []);

  return (
    <section className="bg-[#f4f3f0] px-4 py-11 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-6 flex items-end justify-between gap-4 border-b border-black/15 pb-4 sm:mb-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b85d32]">The latest</p>
            <h2 className="mt-2 text-2xl font-bold uppercase tracking-[-0.04em] text-[#202020] sm:text-3xl lg:text-4xl">Fresh finds</h2>
          </div>
          <Link href="/shop" className="shrink-0 border-b border-black pb-1 text-xs font-bold uppercase tracking-wide text-[#202020] transition hover:text-[#b85d32]">
            View all
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="py-12 text-sm text-[#77736d]">
            Products are taking a moment to load. <Link href="/shop" className="font-semibold underline underline-offset-4">Browse the shop</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-10 lg:grid-cols-4">
            {products.slice(0, 8).map((product, index) => (
              <article key={product.id} className="group min-w-0">
                <Link href={"/shop/" + product.id} className="block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#e4e2dd]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
                    />
                    {index < 2 && (
                      <span className="absolute left-2 top-2 bg-white px-2 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#202020] sm:left-3 sm:top-3">
                        New in
                      </span>
                    )}
                  </div>
                </Link>
                <div className="pt-3 sm:pt-4">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#77736d]">{product.category}</p>
                  <Link href={"/shop/" + product.id}>
                    <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-[#202020] transition hover:text-[#a6532e] sm:text-base">{product.name}</h3>
                  </Link>
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-[#202020]">Rs. {product.price.toLocaleString()}</p>
                    <button
                      onClick={() => addToCart(product, "M", 1)}
                      className="border-b border-black/40 pb-0.5 text-[10px] font-bold uppercase tracking-wide text-[#202020] transition hover:border-[#a6532e] hover:text-[#a6532e] sm:text-xs"
                    >
                      Quick add +
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

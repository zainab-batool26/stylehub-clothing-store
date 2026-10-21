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
    <section className="border-y border-[#dfe4e8] bg-[#f4f6f8] px-4 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-14">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-6 flex items-end justify-between gap-4 border-b border-[#dfe4e8] pb-4 sm:mb-8">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#294f82]">The current selection</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-[#20252b] sm:text-3xl lg:text-4xl">New & noteworthy</h2>
            <p className="mt-2 max-w-md text-xs leading-5 text-[#626b75] sm:text-sm">A small edit of pieces worth a closer look.</p>
          </div>
          <Link href="/shop" className="shrink-0 border-b border-[#294f82] pb-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#294f82] transition hover:border-[#20252b] hover:text-[#20252b] sm:text-xs">
            View all <span aria-hidden="true">↗</span>
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="border border-[#dfe4e8] bg-white px-4 py-8 text-sm text-[#626b75]">
            Products are taking a moment to load. <Link href="/shop" className="font-semibold text-[#294f82] underline underline-offset-4">Browse the shop</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-10 lg:grid-cols-4">
            {products.slice(0, 8).map((product, index) => (
              <article key={product.id} className="group min-w-0">
                <Link href={"/shop/" + product.id} className="block">
                  <div className="relative aspect-[4/5] overflow-hidden border border-[#dfe4e8] bg-[#e9edf1]">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
                    />
                    {index < 2 && (
                      <span className="absolute left-2 top-2 border border-[#dfe4e8] bg-white px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#294f82] sm:left-3 sm:top-3">
                        New in
                      </span>
                    )}
                  </div>
                </Link>
                <div className="pt-3 sm:pt-4">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#626b75]">{product.category}</p>
                  <Link href={"/shop/" + product.id}>
                    <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-5 text-[#20252b] transition hover:text-[#294f82] sm:text-base">{product.name}</h3>
                  </Link>
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-semibold tabular-nums text-[#20252b]">Rs. {product.price.toLocaleString()}</p>
                    <button
                      onClick={() => addToCart(product, "M", 1)}
                      className="border-b border-[#aab4bf] pb-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#294f82] transition hover:border-[#20252b] hover:text-[#20252b] sm:text-xs"
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

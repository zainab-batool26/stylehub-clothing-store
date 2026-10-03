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
    <section className="bg-[#deddd8] px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-end justify-between border-b border-[#303038]/15 pb-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#ee8a4a]">The edit</p>
            <h2 className="mt-2 font-serif text-3xl text-[#303038] sm:text-4xl lg:text-5xl">A few favourites</h2>
          </div>
          <Link href="/shop" className="text-sm text-[#55545a] hover:text-[#ee6f32]">See everything →</Link>
        </div>
        {products.length === 0 ? (
          <p className="py-12 text-sm text-[#77767a]">Loading products...</p>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-5 sm:gap-y-10 lg:grid-cols-4">
            {products.map((product, index) => (
              <article key={product.id} className="group">
                <Link href={"/shop/" + product.id} className="block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#b9b8b3]">
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]" />
                    {index < 2 && <span className="absolute left-3 top-3 bg-[#303038] px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-white">Pick</span>}
                  </div>
                </Link>
                <div className="pt-4">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#ee6f32]">{product.category}</p>
                  <Link href={"/shop/" + product.id}>
                    <h3 className="mt-1 text-base font-semibold text-[#303038] hover:text-[#ee6f32]">{product.name}</h3>
                  </Link>
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <p className="text-sm text-[#55545a]">Rs. {product.price.toLocaleString()}</p>
                    <button onClick={() => addToCart(product, "M", 1)} className="border-b border-[#303038]/30 pb-0.5 text-xs font-semibold text-[#303038] hover:border-[#ee6f32] hover:text-[#ee6f32]">Quick add</button>
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

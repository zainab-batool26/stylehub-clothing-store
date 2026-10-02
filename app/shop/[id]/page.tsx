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
  const [added, setAdded] = useState(false);

  const product = products.find((item) => item.id === Number(params.id));

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0b0b0b] px-6 text-center text-white">
        <div>
          <h1 className="text-3xl font-semibold">Product Not Found</h1>
          <Link href="/shop" className="mt-5 inline-block text-[#d4af37] underline">Back to Shop</Link>
        </div>
      </main>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart(product, selectedSize, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <main className="min-h-screen bg-[#0b0b0b] px-6 py-12 text-white md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <Link href="/shop" className="text-sm text-zinc-500 transition hover:text-[#d4af37]">← Back to Shop</Link>

        <div className="mt-8 grid gap-12 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#151515]">
            <img src={product.image} alt={product.name} className="h-[560px] w-full object-contain" />
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af37]">{product.category}</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">{product.name}</h1>
            <p className="mt-5 text-2xl font-semibold">Rs. {product.price.toLocaleString()}</p>
            <p className="mt-6 max-w-xl leading-7 text-zinc-400">{product.description}</p>

            <div className="mt-8">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Select Size</h3>
                <span className="text-xs text-zinc-500">Required</span>
              </div>
              <div className="mt-3 flex gap-2">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-11 w-14 rounded-full border text-sm font-semibold transition ${selectedSize === size ? "border-[#d4af37] bg-[#d4af37] text-black" : "border-white/15 text-zinc-300 hover:border-white/40"}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-semibold">Quantity</h3>
              <div className="mt-3 flex w-fit items-center rounded-full border border-white/15 bg-[#151515]">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-5 py-3 text-lg text-zinc-300 hover:text-white">−</button>
                <span className="w-10 text-center font-semibold">{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)} className="px-5 py-3 text-lg text-zinc-300 hover:text-white">+</button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className={`mt-8 rounded-full py-4 font-semibold transition ${selectedSize ? "bg-[#d4af37] text-black hover:bg-[#e2c35c]" : "cursor-not-allowed bg-zinc-800 text-zinc-500"}`}
            >
              {added ? "Added to Cart ✓" : selectedSize ? "Add to Cart" : "Select a Size"}
            </button>

            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-white/10 pt-6 text-center text-xs text-zinc-500">
              <span>Premium quality</span>
              <span>Easy checkout</span>
              <span>Secure shopping</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
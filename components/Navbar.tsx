"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "./CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/90 px-6 py-4 backdrop-blur-md md:px-12 lg:px-20">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-semibold tracking-[0.2em] text-white"
          onClick={() => setMenuOpen(false)}
        >
          STYLEHUB
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-sm text-zinc-300 transition hover:text-white">Home</Link>
          <Link href="/shop" className="text-sm text-zinc-300 transition hover:text-white">Shop</Link>
          <Link href="/categories" className="text-sm text-zinc-300 transition hover:text-white">Categories</Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/cart"
            className="relative rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:border-[#d4af37] hover:text-[#d4af37]"
          >
            Cart
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#d4af37] text-xs font-bold text-black">
                {totalItems}
              </span>
            )}
          </Link>

          <button
            aria-label="Toggle navigation menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-full border border-white/15 px-3 py-2 text-lg text-white md:hidden"
          >
            ☰
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mx-auto mt-4 flex max-w-7xl flex-col gap-4 border-t border-white/10 pt-4 md:hidden">
          <Link href="/" onClick={() => setMenuOpen(false)} className="text-zinc-300">Home</Link>
          <Link href="/shop" onClick={() => setMenuOpen(false)} className="text-zinc-300">Shop</Link>
          <Link href="/categories" onClick={() => setMenuOpen(false)} className="text-zinc-300">Categories</Link>
        </div>
      )}
    </nav>
  );
}
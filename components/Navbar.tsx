"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "./CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="relative z-50 px-4 pt-4 sm:px-6 sm:pt-5 lg:px-8 lg:pt-6">
      <div className="mx-auto max-w-7xl bg-[#303038] px-4 py-3.5 sm:px-6 lg:px-7 lg:py-4 text-[#f1efe9] shadow-sm md:px-8">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="text-lg font-bold tracking-tight"
          >
            StyleHub
          </Link>

          <div className="hidden items-center gap-6 lg:gap-8 md:flex">
            <Link href="/" className="text-sm text-white/75 transition hover:text-white">
              Home
            </Link>
            <Link href="/shop" className="text-sm text-white/75 transition hover:text-white">
              Shop
            </Link>
            <Link href="/categories" className="text-sm text-white/75 transition hover:text-white">
              Categories
            </Link>
            <Link href="/admin" className="text-sm text-white/75 transition hover:text-white">Admin</Link>
            <Link href="/cart" className="relative text-sm text-white/75 transition hover:text-white">
              Cart
              {totalItems > 0 && (
                <span className="ml-2 inline-flex min-w-5 items-center justify-center rounded-full bg-[#ee8a4a] px-1.5 py-0.5 text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          <button
            aria-label="Toggle navigation menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className="border border-white/20 px-3 py-1.5 text-sm md:hidden"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>

        {menuOpen && (
          <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4 md:hidden">
            <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
            <Link href="/categories" onClick={() => setMenuOpen(false)}>Categories</Link>
            <Link href="/admin" onClick={() => setMenuOpen(false)}>Admin</Link>
            <Link href="/cart" onClick={() => setMenuOpen(false)}>Cart ({totalItems})</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

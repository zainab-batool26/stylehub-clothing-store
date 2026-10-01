"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "./CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="border-b bg-white px-6 py-4 md:px-12 lg:px-20">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-gray-900"
          onClick={() => setMenuOpen(false)}
        >
          StyleHub
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-gray-700 hover:text-pink-600"
          >
            Home
          </Link>

          <Link
            href="/shop"
            className="text-sm font-medium text-gray-700 hover:text-pink-600"
          >
            Shop
          </Link>

          <Link
            href="/categories"
            className="text-sm font-medium text-gray-700 hover:text-pink-600"
          >
            Categories
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Cart */}
          <Link
            href="/cart"
            className="relative rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-600"
          >
            🛒 Cart

            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-pink-600 text-xs text-white">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg border px-3 py-2 text-xl md:hidden"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="mt-4 flex flex-col gap-4 border-t pt-4 md:hidden">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="font-medium text-gray-700"
          >
            Home
          </Link>

          <Link
            href="/shop"
            onClick={() => setMenuOpen(false)}
            className="font-medium text-gray-700"
          >
            Shop
          </Link>

          <Link
            href="/categories"
            onClick={() => setMenuOpen(false)}
            className="font-medium text-gray-700"
          >
            Categories
          </Link>
        </div>
      )}
    </nav>
  );
}
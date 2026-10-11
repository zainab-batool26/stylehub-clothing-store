"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "./CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const linkClass = (href: string) =>
    `text-sm transition hover:text-white ${pathname === href ? "text-white font-semibold" : "text-white/70"}`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#303038] text-[#f1efe9] shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex h-[68px] items-center justify-between">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="text-xl font-bold tracking-tight"
          >
            StyleHub<span className="text-[#ee8a4a]">.</span>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            <Link href="/" className={linkClass("/")}>Home</Link>
            <Link href="/shop" className={linkClass("/shop")}>Shop</Link>
            <Link href="/categories" className={linkClass("/categories")}>Categories</Link>
            <Link href="/admin" className={linkClass("/admin")}>Admin</Link>
            <Link href="/cart" className={`relative ${linkClass("/cart")}`}>
              Cart
              {totalItems > 0 && (
                <span className="ml-2 inline-flex min-w-5 items-center justify-center rounded-full bg-[#ee8a4a] px-1.5 py-0.5 text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          <button
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="border border-white/25 px-3 py-2 text-sm md:hidden"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>

        {menuOpen && (
          <div className="flex flex-col gap-4 border-t border-white/10 py-4 md:hidden">
            <Link href="/" onClick={() => setMenuOpen(false)} className={linkClass("/")}>Home</Link>
            <Link href="/shop" onClick={() => setMenuOpen(false)} className={linkClass("/shop")}>Shop</Link>
            <Link href="/categories" onClick={() => setMenuOpen(false)} className={linkClass("/categories")}>Categories</Link>
            <Link href="/admin" onClick={() => setMenuOpen(false)} className={linkClass("/admin")}>Admin</Link>
            <Link href="/cart" onClick={() => setMenuOpen(false)} className={linkClass("/cart")}>Cart ({totalItems})</Link>
          </div>
        )}
      </nav>
    </header>
  );
}

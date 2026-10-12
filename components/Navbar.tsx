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
    `text-[11px] font-bold uppercase tracking-[0.12em] transition hover:text-[#a6532e] ${pathname === href ? "text-[#a6532e]" : "text-[#202020]"}`;

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="relative z-50 bg-white text-[#202020]">
      <div className="flex min-h-8 items-center justify-center bg-[#202020] px-3 py-2 text-center text-[9px] font-semibold uppercase tracking-[0.13em] text-white sm:text-[10px]">
        New season, new favourites — explore the StyleHub collection
      </div>

      <nav className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10" aria-label="Main navigation">
        <div className="flex h-[68px] items-center justify-between gap-4 border-b border-black/10 sm:h-[78px]">
          <Link href="/" onClick={closeMenu} className="shrink-0 text-[25px] font-black uppercase leading-none tracking-[-0.08em] sm:text-[29px]">
            STYLEHUB<span className="text-[#b85d32]">.</span>
          </Link>

          <div className="hidden items-center gap-6 lg:flex xl:gap-8">
            <Link href="/shop?category=Men" className={linkClass("/shop")}>Men</Link>
            <Link href="/shop?category=Women" className={linkClass("/shop")}>Women</Link>
            <Link href="/shop?category=New%20Arrival" className={linkClass("/shop")}>New in</Link>
            <Link href="/categories" className={linkClass("/categories")}>Shop by category</Link>
          </div>

          <div className="flex shrink-0 items-center gap-4 sm:gap-5">
            <Link href="/admin" className="hidden text-[10px] font-semibold uppercase tracking-wide text-black/55 transition hover:text-[#a6532e] sm:inline">
              Admin
            </Link>
            <Link href="/cart" className="relative flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide hover:text-[#a6532e]" aria-label={`Cart, ${totalItems} items`}>
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[21px] w-[21px]" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M3 4h2l2.1 10.1a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L20.5 8H6" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="9.5" cy="19" r="1.2" />
                <circle cx="17.5" cy="19" r="1.2" />
              </svg>
              <span className="hidden sm:inline">Bag</span>
              {totalItems > 0 && <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#b85d32] px-1 text-[10px] text-white">{totalItems}</span>}
            </Link>
            <button
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
              className="border border-black/20 px-3 py-2 text-[10px] font-bold uppercase tracking-wide lg:hidden"
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="flex flex-col border-b border-black/10 py-2 lg:hidden">
            <Link href="/shop?category=Men" onClick={closeMenu} className="border-b border-black/10 py-4 text-xs font-bold uppercase tracking-[0.12em]">Men</Link>
            <Link href="/shop?category=Women" onClick={closeMenu} className="border-b border-black/10 py-4 text-xs font-bold uppercase tracking-[0.12em]">Women</Link>
            <Link href="/shop?category=New%20Arrival" onClick={closeMenu} className="border-b border-black/10 py-4 text-xs font-bold uppercase tracking-[0.12em]">New in</Link>
            <Link href="/categories" onClick={closeMenu} className="border-b border-black/10 py-4 text-xs font-bold uppercase tracking-[0.12em]">Shop by category</Link>
            <Link href="/admin" onClick={closeMenu} className="py-4 text-xs font-bold uppercase tracking-[0.12em]">Admin</Link>
          </div>
        )}
      </nav>
    </header>
  );
}

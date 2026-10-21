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
    `relative py-2 text-[11px] font-semibold uppercase tracking-[0.1em] transition-colors hover:text-[#294f82] ${pathname === href ? "text-[#294f82]" : "text-[#626b75]"}`;

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="relative z-50 border-b border-[#dfe4e8] bg-white text-[#20252b]">
      <div className="flex min-h-8 items-center justify-center border-b border-white/10 bg-[#20252b] px-3 py-2 text-center text-[9px] font-medium tracking-[0.08em] text-white sm:text-[10px]">
        Considered everyday clothing · Explore the latest collection
      </div>

      <nav className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10" aria-label="Main navigation">
        <div className="flex min-h-[68px] items-center justify-between gap-4 sm:min-h-[76px]">
          <Link href="/" onClick={closeMenu} className="shrink-0 text-[24px] font-extrabold uppercase leading-none tracking-[-0.075em] sm:text-[27px]">
            STYLEHUB<span className="text-[#294f82]">.</span>
          </Link>

          <div className="hidden items-center gap-6 lg:flex xl:gap-8">
            <Link href="/shop?category=Men" className={linkClass("/shop")}>Men</Link>
            <Link href="/shop?category=Women" className={linkClass("/shop")}>Women</Link>
            <Link href="/shop?category=New%20Arrival" className={linkClass("/shop")}>New in</Link>
            <Link href="/categories" className={linkClass("/categories")}>Categories</Link>
          </div>

          <div className="flex shrink-0 items-center gap-3 sm:gap-5">
            <Link href="/admin" className="hidden min-h-10 items-center border-r border-[#dfe4e8] pr-4 text-[10px] font-medium uppercase tracking-[0.08em] text-[#626b75] transition hover:text-[#294f82] sm:inline-flex">
              Admin
            </Link>
            <Link href="/cart" className="relative flex min-h-10 items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] transition hover:text-[#294f82]" aria-label={`Shopping bag, ${totalItems} items`}>
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 4h2l2.1 10.1a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L20.5 8H6" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="9.5" cy="19" r="1.2" />
                <circle cx="17.5" cy="19" r="1.2" />
              </svg>
              <span className="hidden sm:inline">Bag</span>
              {totalItems > 0 && <span className="flex h-5 min-w-5 items-center justify-center rounded-sm bg-[#294f82] px-1 text-[10px] text-white">{totalItems}</span>}
            </Link>
            <button
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
              className="min-h-10 border border-[#dfe4e8] px-3 text-[10px] font-semibold uppercase tracking-[0.08em] transition hover:border-[#294f82] hover:text-[#294f82] lg:hidden"
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-[#dfe4e8] py-1 lg:hidden">
            <Link href="/shop?category=Men" onClick={closeMenu} className="block border-b border-[#dfe4e8] py-4 text-xs font-semibold uppercase tracking-[0.1em]">Men</Link>
            <Link href="/shop?category=Women" onClick={closeMenu} className="block border-b border-[#dfe4e8] py-4 text-xs font-semibold uppercase tracking-[0.1em]">Women</Link>
            <Link href="/shop?category=New%20Arrival" onClick={closeMenu} className="block border-b border-[#dfe4e8] py-4 text-xs font-semibold uppercase tracking-[0.1em]">New in</Link>
            <Link href="/categories" onClick={closeMenu} className="block border-b border-[#dfe4e8] py-4 text-xs font-semibold uppercase tracking-[0.1em]">Categories</Link>
            <Link href="/admin" onClick={closeMenu} className="block py-4 text-xs font-semibold uppercase tracking-[0.1em]">Admin</Link>
          </div>
        )}
      </nav>
    </header>
  );
}

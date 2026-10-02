"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartContext";

export default function CheckoutPage() {
  const { cart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [payment, setPayment] = useState("Cash on Delivery");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (orderPlaced) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0b0b0b] px-6 text-white">
        <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#151515] p-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#d4af37] text-2xl font-bold text-black">✓</div>
          <h1 className="mt-6 text-3xl font-semibold">Order placed</h1>
          <p className="mt-3 text-zinc-500">Thank you for shopping with StyleHub.</p>
          <Link href="/shop" className="mt-8 inline-block rounded-full bg-[#d4af37] px-8 py-3 font-semibold text-black hover:bg-[#e2c35c]">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0b0b0b] px-6 text-center text-white">
        <div>
          <h1 className="text-3xl font-semibold">Your cart is empty</h1>
          <Link href="/shop" className="mt-6 inline-block text-[#d4af37] underline">Go to Shop</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] px-6 py-12 text-white md:px-12 lg:px-20">
      <div className="mx-auto max-w-5xl">
        <Link href="/cart" className="text-sm text-zinc-500 hover:text-[#d4af37]">← Back to Cart</Link>
        <h1 className="mt-6 text-4xl font-semibold">Checkout</h1>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-[#151515] p-6">
            <h2 className="text-xl font-semibold">Delivery details</h2>
            <div className="mt-6 space-y-4">
              <input type="text" placeholder="Full Name" className="w-full rounded-xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-white outline-none placeholder:text-zinc-600 focus:border-[#d4af37]" />
              <input type="email" placeholder="Email Address" className="w-full rounded-xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-white outline-none placeholder:text-zinc-600 focus:border-[#d4af37]" />
              <input type="tel" placeholder="Phone Number" className="w-full rounded-xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-white outline-none placeholder:text-zinc-600 focus:border-[#d4af37]" />
              <textarea placeholder="Delivery Address" rows={4} className="w-full rounded-xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-white outline-none placeholder:text-zinc-600 focus:border-[#d4af37]" />
              <select value={payment} onChange={(e) => setPayment(e.target.value)} className="w-full rounded-xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-white outline-none focus:border-[#d4af37]">
                <option>Cash on Delivery</option>
                <option>Bank Transfer</option>
              </select>
            </div>
          </div>

          <div className="h-fit rounded-2xl border border-white/10 bg-[#151515] p-6">
            <h2 className="text-xl font-semibold">Order summary</h2>
            <div className="mt-6 space-y-5">
              {cart.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex justify-between border-b border-white/10 pb-4">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="mt-1 text-sm text-zinc-500">Size {item.size} × {item.quantity}</p>
                  </div>
                  <p className="font-semibold">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-between border-t border-white/10 pt-6 text-xl font-semibold">
              <span>Total</span>
              <span>Rs. {total.toLocaleString()}</span>
            </div>
            <p className="mt-3 text-xs text-zinc-600">Payment: {payment}</p>
            <button onClick={() => setOrderPlaced(true)} className="mt-6 w-full rounded-full bg-[#d4af37] py-4 font-semibold text-black transition hover:bg-[#e2c35c]">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
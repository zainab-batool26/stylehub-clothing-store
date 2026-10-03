"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartContext";

export default function CheckoutPage() {
  const { cart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [payment, setPayment] = useState("Cash on Delivery");
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 250 : 0;
  const total = subtotal + shipping;

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const validPhone = /^[0-9+\-\s]{10,15}$/.test(form.phone.trim());
  const isValid =
    form.name.trim().length >= 2 &&
    /\S+@\S+\.\S+/.test(form.email) &&
    validPhone &&
    form.address.trim().length >= 10;

  if (orderPlaced) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#eeece6] px-6 text-[#303038]">
        <div className="w-full max-w-lg bg-[#303038] p-10 text-center text-[#f1efe9]">
          <div className="mx-auto flex h-14 w-14 items-center justify-center bg-[#ee8a4a] text-xl font-bold">
            ✓
          </div>
          <h1 className="mt-6 font-serif text-4xl">Order placed.</h1>
          <p className="mt-3 text-sm text-white/60">Thank you for shopping with StyleHub.</p>
          <Link href="/shop" className="mt-7 inline-block bg-[#ee8a4a] px-7 py-3 text-sm font-semibold text-white hover:bg-[#d86f35]">
            Continue shopping
          </Link>
        </div>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#eeece6] px-6 text-center text-[#303038]">
        <div>
          <h1 className="font-serif text-4xl">Your cart is empty.</h1>
          <Link href="/shop" className="mt-6 inline-block text-[#ee6f32] underline">Go to shop</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#eeece6] px-4 pb-16 pt-6 text-[#303038] sm:px-6 sm:pt-8 lg:px-8 lg:pt-10">
      <div className="mx-auto max-w-7xl">
        <Link href="/cart" className="text-xs uppercase tracking-[0.15em] text-[#77767a] hover:text-[#ee6f32]">
          ← Back to cart
        </Link>

        <div className="mt-6 border-b border-[#303038]/15 pb-8">
          <p className="text-xs uppercase tracking-[0.25em] text-[#ee8a4a]">StyleHub / Checkout</p>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl">Almost yours.</h1>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="bg-[#deddd8] p-6 md:p-8">
            <h2 className="font-serif text-3xl">Delivery details</h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <input value={form.name} onChange={(e) => updateField("name", e.target.value)} type="text" placeholder="Full name" className="border border-[#303038]/15 bg-[#f4f2ec] px-4 py-3 text-sm outline-none focus:border-[#ee8a4a]" />
              <input value={form.email} onChange={(e) => updateField("email", e.target.value)} type="email" placeholder="Email address" className="border border-[#303038]/15 bg-[#f4f2ec] px-4 py-3 text-sm outline-none focus:border-[#ee8a4a]" />
              <input value={form.phone} onChange={(e) => updateField("phone", e.target.value)} type="tel" placeholder="Phone number" inputMode="tel" className="border border-[#303038]/15 bg-[#f4f2ec] px-4 py-3 text-sm outline-none focus:border-[#ee8a4a]" />
              <select value={payment} onChange={(e) => setPayment(e.target.value)} className="border border-[#303038]/15 bg-[#f4f2ec] px-4 py-3 text-sm outline-none focus:border-[#ee8a4a]">
                <option>Cash on Delivery</option>
                <option>Bank Transfer</option>
              </select>
              <textarea value={form.address} onChange={(e) => updateField("address", e.target.value)} placeholder="Delivery address" rows={5} className="border border-[#303038]/15 bg-[#f4f2ec] px-4 py-3 text-sm outline-none focus:border-[#ee8a4a] sm:col-span-2" />
            </div>

            <p className="mt-4 text-xs text-[#77767a]">
              Please enter a valid phone number using digits, spaces, + or -.
            </p>
          </div>

          <aside className="h-fit bg-[#303038] p-6 text-[#f1efe9]">
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">Order</p>
            <div className="mt-5 space-y-4">
              {cart.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <p className="text-sm">{item.name}</p>
                    <p className="mt-1 text-xs text-white/45">Size {item.size} × {item.quantity}</p>
                  </div>
                  <p className="text-sm">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-3 border-t border-white/10 pt-5 text-sm">
              <div className="flex justify-between text-white/60"><span>Subtotal</span><span>Rs. {subtotal.toLocaleString()}</span></div>
              <div className="flex justify-between text-white/60"><span>Delivery</span><span>Rs. {shipping.toLocaleString()}</span></div>
              <div className="flex justify-between border-t border-white/10 pt-4 font-semibold"><span>Total</span><span>Rs. {total.toLocaleString()}</span></div>
            </div>

            <button
              disabled={!isValid}
              onClick={() => setOrderPlaced(true)}
              className={`mt-7 w-full py-3.5 text-sm font-semibold transition ${
                isValid
                  ? "bg-[#ee8a4a] text-white hover:bg-[#d86f35]"
                  : "cursor-not-allowed bg-white/10 text-white/35"
              }`}
            >
              Place order
            </button>

            {!isValid && (
              <p className="mt-3 text-xs leading-5 text-white/40">
                Fill in your name, email, phone and complete delivery address to continue.
              </p>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}

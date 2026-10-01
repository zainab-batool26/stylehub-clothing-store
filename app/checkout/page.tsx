"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartContext";

export default function CheckoutPage() {
  const { cart } = useCart();

  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (orderPlaced) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-lg rounded-2xl bg-white p-10 text-center shadow-sm">
          <div className="text-5xl">✓</div>

          <h1 className="mt-5 text-3xl font-bold text-gray-900">
            Order Placed!
          </h1>

          <p className="mt-3 text-gray-600">
            Thank you for shopping with StyleHub.
          </p>

          <Link
            href="/shop"
            className="mt-8 inline-block rounded-lg bg-gray-900 px-8 py-3 font-semibold text-white hover:bg-pink-600"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Your cart is empty
          </h1>

          <Link
            href="/shop"
            className="mt-6 inline-block text-pink-600 underline"
          >
            Go to Shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12 md:px-12 lg:px-20">
      <div className="mx-auto max-w-5xl">

        <h1 className="text-4xl font-bold text-gray-900">
          Checkout
        </h1>

        <div className="mt-10 grid gap-10 md:grid-cols-2">

          {/* Customer Information */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">
              Customer Information
            </h2>

            <div className="mt-6 space-y-4">

              <input
                type="text"
                placeholder="Full Name"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-pink-500"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-pink-500"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-pink-500"
              />

              <textarea
                placeholder="Delivery Address"
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-pink-500"
              />

              <select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-pink-500">
                <option>Cash on Delivery</option>
                <option>Bank Transfer</option>
              </select>

            </div>
          </div>

          {/* Order Summary */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">
              Order Summary
            </h2>

            <div className="mt-6 space-y-5">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div>
                    <p className="font-semibold text-gray-900">
                      {item.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      Size: {item.size} × {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold">
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between border-t pt-6 text-xl font-bold">
              <span>Total</span>
              <span>Rs. {total.toLocaleString()}</span>
            </div>

            <button
              onClick={() => setOrderPlaced(true)}
              className="mt-6 w-full rounded-lg bg-gray-900 py-4 font-semibold text-white transition hover:bg-pink-600"
            >
              Place Order
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}
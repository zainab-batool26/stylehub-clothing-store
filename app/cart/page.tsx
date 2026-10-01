"use client";

import Link from "next/link";
import { useCart } from "@/components/CartContext";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

 const total = cart.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
);

const totalItems = cart.reduce(
  (sum, item) => sum + item.quantity,
  0
);

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">

        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-pink-600">
            Your Shopping Bag
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            Shopping Cart
          </h1>
        </div>

        {cart.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">

            <div className="text-6xl">
              🛒
            </div>

            <h2 className="mt-6 text-2xl font-bold text-gray-900">
              Your cart is empty
            </h2>

            <p className="mt-2 text-gray-500">
              Add something from our collection to get started.
            </p>

            <Link
              href="/shop"
              className="mt-6 inline-block rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white hover:bg-pink-600"
            >
              Continue Shopping
            </Link>

          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">

            {/* Cart Items */}
            <div className="space-y-4 lg:col-span-2">

              {cart.map((product) => (
                <div
                  key={`${product.id}-${product.size}`}
                  className="rounded-2xl bg-white p-5 shadow-sm"
                >

                  <div className="flex gap-5">

                    {/* Image */}
                    <div
                      className={`${product.bg} flex h-32 w-28 shrink-0 items-center justify-center rounded-lg`}
                    >
                      <span className="text-5xl opacity-20">
                        ✦
                      </span>
                    </div>

                    {/* Details */}
                    <div className="flex-1">

                      <p className="text-sm text-pink-600">
                        {product.category}
                      </p>

                      <h2 className="mt-1 text-lg font-semibold text-gray-900">
                        {product.name}
                      </h2>

                      <p className="mt-2 text-sm text-gray-500">
                        Size: {product.size}
                      </p>

                      <p className="mt-2 font-bold text-gray-900">
                        Rs. {product.price.toLocaleString()}
                      </p>

                      {/* Quantity */}
                      <div className="mt-4 flex items-center gap-3">

                        <button
                          onClick={() =>
                            decreaseQuantity(
                              product.id,
                              product.size
                            )
                          }
                          className="h-8 w-8 rounded border hover:bg-gray-100"
                        >
                          −
                        </button>

                        <span className="w-6 text-center font-semibold">
                          {product.quantity}
                        </span>

                        <button
                          onClick={() =>
                            increaseQuantity(
                              product.id,
                              product.size
                            )
                          }
                          className="h-8 w-8 rounded border hover:bg-gray-100"
                        >
                          +
                        </button>

                      </div>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() =>
                        removeFromCart(
                          product.id,
                          product.size
                        )
                      }
                      className="text-sm text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>

                  </div>
                </div>
              ))}

            </div>

            {/* Summary */}
            <div className="h-fit rounded-2xl bg-white p-6 shadow-sm">

              <h2 className="text-xl font-bold text-gray-900">
                Order Summary
              </h2>

              <div className="mt-6 flex justify-between border-b pb-4 text-gray-600">
                <span>Items</span>
                <span>{totalItems}</span>
              </div>

              <div className="mt-4 flex justify-between border-b pb-4 text-gray-600">
                <span>Subtotal</span>
                <span>
                  Rs. {total.toLocaleString()}
                </span>
              </div>

              <div className="mt-4 flex justify-between text-xl font-bold text-gray-900">
                <span>Total</span>
                <span>
                  Rs. {total.toLocaleString()}
                </span>
              </div>

              <Link
                href="/checkout"
                className="block w-full rounded-lg bg-gray-900 py-4 text-center font-semibold text-white transition hover:bg-pink-600"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/shop"
                className="mt-4 block text-center text-sm text-gray-500 underline"
              >
                Continue Shopping
              </Link>

            </div>
          </div>
        )}
      </div>
    </main>
  );
}
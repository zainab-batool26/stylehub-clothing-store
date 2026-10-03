"use client";

import Link from "next/link";
import { useCart } from "@/components/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const shipping = subtotal > 0 ? 250 : 0;
  const total = subtotal + shipping;

  return (
    <main className="min-h-screen bg-[#eeece6] px-5 pb-20 pt-8 text-[#303038] md:px-10 md:pt-12">
      <div className="mx-auto max-w-6xl">
        <div className="border-b border-[#303038]/15 pb-8">
          <p className="text-xs uppercase tracking-[0.25em] text-[#ee8a4a]">StyleHub / Your bag</p>
          <h1 className="mt-3 font-serif text-5xl md:text-6xl">Shopping cart</h1>
        </div>

        {cart.length === 0 ? (
          <div className="mt-10 max-w-xl border border-[#303038]/15 bg-[#deddd8] p-10">
            <p className="text-xs uppercase tracking-[0.2em] text-[#77767a]">Nothing here yet</p>
            <h2 className="mt-4 font-serif text-4xl">Your cart is empty.</h2>
            <p className="mt-3 text-sm leading-6 text-[#77767a]">
              Have a look through the collection and add something you like.
            </p>
            <Link href="/shop" className="mt-7 inline-block bg-[#303038] px-6 py-3 text-sm font-semibold text-white hover:bg-[#44444c]">
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_330px]">
            <div className="space-y-3">
              {cart.map((product) => (
                <div key={`${product.id}-${product.size}`} className="grid gap-5 border-b border-[#303038]/15 py-5 sm:grid-cols-[120px_1fr_auto]">
                  <div className="h-36 bg-[#d1cfca]">
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#ee6f32]">{product.category}</p>
                    <h2 className="mt-1 text-lg font-semibold">{product.name}</h2>
                    <p className="mt-2 text-sm text-[#77767a]">Size: {product.size}</p>
                    <p className="mt-2 text-sm">Rs. {product.price.toLocaleString()}</p>

                    <div className="mt-5 flex items-center gap-3">
                      <div className="flex border border-[#303038]/20">
                        <button onClick={() => decreaseQuantity(product.id, product.size)} className="h-8 w-8 hover:bg-[#deddd8]">−</button>
                        <span className="flex h-8 w-9 items-center justify-center border-x border-[#303038]/20 text-xs">{product.quantity}</span>
                        <button onClick={() => increaseQuantity(product.id, product.size)} className="h-8 w-8 hover:bg-[#deddd8]">+</button>
                      </div>
                      <button
                        onClick={() => removeFromCart(product.id, product.size)}
                        className="text-xs text-[#77767a] underline hover:text-[#ee6f32]"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <p className="text-sm font-semibold sm:text-right">
                    Rs. {(product.price * product.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <aside className="h-fit bg-[#303038] p-6 text-[#f1efe9]">
              <p className="text-xs uppercase tracking-[0.2em] text-white/50">Summary</p>
              <h2 className="mt-2 font-serif text-3xl">Your order</h2>

              <div className="mt-7 space-y-3 border-t border-white/10 pt-5 text-sm">
                <div className="flex justify-between text-white/65">
                  <span>Items</span><span>{totalItems}</span>
                </div>
                <div className="flex justify-between text-white/65">
                  <span>Subtotal</span><span>Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-white/65">
                  <span>Delivery</span><span>Rs. {shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-4 text-base font-semibold">
                  <span>Total</span><span>Rs. {total.toLocaleString()}</span>
                </div>
              </div>

              <Link href="/checkout" className="mt-7 block bg-[#ee8a4a] py-3.5 text-center text-sm font-semibold text-white hover:bg-[#d86f35]">
                Proceed to checkout
              </Link>
              <Link href="/shop" className="mt-4 block text-center text-xs text-white/55 hover:text-white">
                Continue shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/components/CartContext";
import { getProduct, type Product } from "@/lib/products";

export default function ProductPage() {
  const params = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = Number(params.id);
    if (!Number.isFinite(id)) {
      setLoading(false);
      return;
    }
    getProduct(id).then(setProduct).finally(() => setLoading(false));
  }, [params.id]);

  if (loading) return <main className="min-h-screen bg-[#eeece6] px-6 py-20 text-[#303038]">Loading product...</main>;

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#eeece6] px-6 text-center text-[#303038]">
        <div>
          <h1 className="font-serif text-4xl">Product not found</h1>
          <Link href="/shop" className="mt-5 inline-block text-[#ee6f32] underline">Back to shop</Link>
        </div>
      </main>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart(product, selectedSize, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <main className="min-h-screen bg-[#eeece6] px-4 pb-16 pt-6 text-[#303038] sm:px-6 sm:pt-8 lg:px-8 lg:pt-10">
      <div className="mx-auto max-w-7xl">
        <Link href="/shop" className="text-xs uppercase tracking-[0.15em] text-[#77767a] hover:text-[#ee6f32]">← Back to shop</Link>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div className="bg-[#d1cfca]"><img src={product.image} alt={product.name} className="aspect-[4/5] w-full object-cover lg:max-h-[620px]" /></div>
          <div className="flex flex-col justify-center lg:px-5">
            <p className="text-xs uppercase tracking-[0.2em] text-[#ee6f32]">{product.category}</p>
            <h1 className="mt-3 font-serif text-4xl leading-[0.95] sm:text-5xl lg:text-6xl">{product.name}</h1>
            <p className="mt-5 text-lg">Rs. {product.price.toLocaleString()}</p>
            <p className="mt-6 max-w-md text-sm leading-6 text-[#77767a]">{product.description}</p>
            <div className="mt-9 border-t border-[#303038]/15 pt-6">
              <div className="flex items-center justify-between"><span className="text-xs font-semibold uppercase tracking-[0.15em]">Size</span><span className="text-xs text-[#99979a]">Choose one</span></div>
              <div className="mt-3 flex gap-2">
                {["S", "M", "L", "XL"].map((size) => (
                  <button key={size} onClick={() => setSelectedSize(size)} className={"h-11 w-12 border text-sm transition " + (selectedSize === size ? "border-[#303038] bg-[#303038] text-white" : "border-[#303038]/20 hover:border-[#ee8a4a]")}>{size}</button>
                ))}
              </div>
            </div>
            <div className="mt-6 flex items-center gap-5">
              <span className="text-xs font-semibold uppercase tracking-[0.15em]">Quantity</span>
              <div className="flex border border-[#303038]/20">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="h-10 w-10 hover:bg-[#deddd8]">−</button>
                <span className="flex h-10 w-10 items-center justify-center border-x border-[#303038]/20 text-sm">{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)} className="h-10 w-10 hover:bg-[#deddd8]">+</button>
              </div>
            </div>
            <button onClick={handleAddToCart} className={"mt-8 w-full py-4 text-sm font-semibold transition " + (selectedSize ? "bg-[#ee8a4a] text-white hover:bg-[#d86f35]" : "cursor-not-allowed bg-[#d5d3ce] text-[#99979a]")}>
              {added ? "Added to cart ✓" : selectedSize ? "Add to cart" : "Select a size"}
            </button>
            <div className="mt-5 border-t border-[#303038]/15 pt-4 text-xs text-[#77767a]">Easy checkout · Cash on delivery available</div>
          </div>
        </div>
      </div>
    </main>
  );
}

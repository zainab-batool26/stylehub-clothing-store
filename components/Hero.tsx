import Link from "next/link";
import { products } from "@/data/products";

export default function Hero() {
  const heroProduct = products[0];

  return (
    <section className="px-5 pb-14 pt-5 md:px-10 md:pb-20 md:pt-7">
      <div className="mx-auto grid max-w-6xl overflow-hidden bg-[#303038] md:grid-cols-[0.72fr_1.28fr]">
        <div className="relative flex min-h-[560px] flex-col justify-between overflow-hidden px-7 py-10 text-[#f1efe9] md:px-10 md:py-12">
          <div className="absolute -left-16 top-28 text-[190px] font-bold leading-none text-white/[0.035]">
            01
          </div>

          <div className="relative">
            <p className="text-xs uppercase tracking-[0.25em] text-white/60">
              StyleHub / New season
            </p>

            <h1 className="mt-14 max-w-md font-serif text-6xl leading-[0.9] tracking-[-0.04em] md:text-8xl">
              Wear
              <br />
              what
              <br />
              feels right.
            </h1>

            <p className="mt-8 max-w-xs text-sm leading-6 text-white/65">
              Simple pieces, everyday outfits and a few things you will want
              to keep wearing.
            </p>
          </div>

          <div className="relative flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="bg-[#ee8a4a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#d86f35]"
            >
              Shop now
            </Link>
            <Link
              href="/categories"
              className="border border-white/25 px-5 py-3 text-sm text-white/85 transition hover:bg-white/10"
            >
              Browse categories
            </Link>
          </div>
        </div>

        <div className="relative min-h-[420px] bg-[#44444c] md:min-h-[560px]">
          <img
            src={heroProduct.image}
            alt={heroProduct.name}
            className="h-full w-full object-cover"
          />

          <div className="absolute left-5 top-5 max-w-xs bg-[#eeece6]/90 px-4 py-3 text-[#303038] md:left-8 md:top-8">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#77767a]">
              Featured piece
            </p>
            <p className="mt-1 text-sm font-semibold">{heroProduct.name}</p>
            <p className="mt-1 text-xs">Rs. {heroProduct.price.toLocaleString()}</p>
          </div>

          <Link
            href={`/shop/${heroProduct.id}`}
            className="absolute bottom-5 right-5 flex h-14 w-14 items-center justify-center bg-[#ee8a4a] text-2xl text-white transition hover:bg-[#d86f35] md:bottom-8 md:right-8"
            aria-label={`View ${heroProduct.name}`}
          >
            +
          </Link>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between border-b border-[#303038]/15 py-5 text-xs uppercase tracking-[0.18em] text-[#77767a]">
        <span>Everyday clothing</span>
        <span className="hidden sm:block">Women / Men / New arrivals</span>
        <span>Scroll to explore ↓</span>
      </div>
    </section>
  );
}

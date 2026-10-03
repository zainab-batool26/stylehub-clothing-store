import Link from "next/link";
import { products } from "@/data/products";

export default function Hero() {
  const heroProduct = products[0];

  return (
    <section className="px-4 pb-10 pt-4 sm:px-6 sm:pb-14 lg:px-8 lg:pb-16 lg:pt-6">
      <div className="mx-auto grid max-w-7xl overflow-hidden bg-[#303038] lg:grid-cols-[0.78fr_1.22fr]">
        <div className="relative flex min-h-[470px] flex-col justify-between overflow-hidden px-7 py-10 text-[#f1efe9] sm:px-8 sm:py-9 lg:min-h-[520px] lg:px-10 lg:py-11">
          <div className="absolute -left-16 top-28 text-[150px] font-bold leading-none text-white/[0.035]">
            01
          </div>

          <div className="relative">
            <p className="text-xs uppercase tracking-[0.25em] text-white/60">
              StyleHub / New season
            </p>

            <h1 className="mt-10 max-w-md font-serif text-5xl leading-[0.92] tracking-[-0.04em] sm:text-6xl lg:mt-12 lg:text-7xl">
              Wear
              <br />
              what
              <br />
              feels right.
            </h1>

            <p className="mt-6 max-w-sm text-sm leading-6 text-white/65">
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

        <div className="relative min-h-[360px] bg-[#44444c] sm:min-h-[430px] lg:min-h-[520px]">
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

      <div className="mx-auto flex max-w-7xl items-center justify-between border-b border-[#303038]/15 py-5 text-xs uppercase tracking-[0.18em] text-[#77767a]">
        <span>Everyday clothing</span>
        <span className="hidden sm:block">Women / Men / New arrivals</span>
        <span>Scroll to explore ↓</span>
      </div>
    </section>
  );
}

import Link from "next/link";
import { products } from "@/data/products";

export default function Hero() {
  const heroProduct = products[0];

  return (
    <section className="px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100svh-108px)] max-w-7xl overflow-hidden bg-[#303038] lg:grid-cols-[0.88fr_1.12fr]">
        <div className="relative flex flex-col justify-center overflow-hidden px-6 py-8 text-[#f1efe9] sm:px-9 sm:py-10 lg:px-12 lg:py-8">
          <div className="pointer-events-none absolute -left-8 top-1/2 -translate-y-1/2 select-none font-serif text-[180px] font-bold leading-none text-white/[0.035] lg:text-[220px]">
            S
          </div>

          <div className="relative">
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/60 sm:text-xs">
              StyleHub / New season
            </p>

            <h1 className="mt-6 max-w-lg font-serif text-5xl leading-[0.96] tracking-[-0.04em] sm:text-6xl lg:mt-8 lg:text-7xl xl:text-[5.5rem]">
              Wear what
              <br />
              feels right.
            </h1>

            <p className="mt-5 max-w-sm text-sm leading-6 text-white/65 sm:mt-6">
              Simple pieces, everyday outfits and a few things you will want
              to keep wearing.
            </p>

            <div className="mt-7 flex flex-wrap gap-3 sm:mt-8">
              <Link
                href="/shop"
                className="bg-[#ee8a4a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#d86f35]"
              >
                Shop the collection <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/categories"
                className="border border-white/25 px-5 py-3 text-sm text-white/85 transition hover:bg-white/10"
              >
                Browse categories
              </Link>
            </div>
          </div>

          <div className="relative mt-8 flex items-center gap-5 border-t border-white/15 pt-5 text-[10px] uppercase tracking-[0.16em] text-white/45 sm:mt-10">
            <span>Everyday clothing</span>
            <span className="h-1 w-1 rounded-full bg-[#ee8a4a]" />
            <span>Women / Men / New arrivals</span>
          </div>
        </div>

        <div className="relative min-h-[280px] bg-[#44444c] sm:min-h-[360px] lg:min-h-0">
          <img
            src={heroProduct.image}
            alt={heroProduct.name}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#17171b]/40 via-transparent to-transparent" />

          <div className="absolute left-4 top-4 max-w-[calc(100%-2rem)] bg-[#eeece6]/95 px-4 py-3 text-[#303038] sm:left-7 sm:top-7">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#77767a]">
              Featured piece
            </p>
            <p className="mt-1 text-sm font-semibold">{heroProduct.name}</p>
            <p className="mt-1 text-xs">Rs. {heroProduct.price.toLocaleString()}</p>
          </div>

          <Link
            href={`/shop/${heroProduct.id}`}
            className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center bg-[#ee8a4a] text-2xl text-white transition hover:bg-[#d86f35] sm:bottom-7 sm:right-7 sm:h-14 sm:w-14"
            aria-label={`View ${heroProduct.name}`}
          >
            +
          </Link>
        </div>
      </div>
    </section>
  );
}

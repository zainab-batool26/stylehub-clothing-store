import Link from "next/link";
import { products } from "@/data/products";

export default function Hero() {
  const heroProduct = products[0];

  return (
    <section className="px-3 pt-3 sm:px-5 sm:pt-5 lg:px-6">
      <div className="mx-auto grid max-w-[1600px] overflow-hidden bg-[#eceae5] md:min-h-[570px] md:grid-cols-[0.88fr_1.12fr] lg:min-h-[650px]">
        <div className="relative flex flex-col items-start justify-center px-6 py-10 sm:px-10 sm:py-14 lg:px-14 xl:px-20">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#a6532e] sm:text-xs">
            StyleHub / New season
          </p>
          <h1 className="mt-5 max-w-xl text-5xl font-bold uppercase leading-[0.92] tracking-[-0.06em] text-[#202020] sm:text-6xl lg:text-7xl xl:text-[5.8rem]">
            Your style.
            <br />
            Your rules.
          </h1>
          <p className="mt-5 max-w-sm text-sm leading-6 text-[#55534f] sm:mt-6 sm:text-base">
            New-season favourites and everyday pieces made to work with your wardrobe.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/shop?category=Women" className="inline-flex min-h-12 items-center justify-center bg-[#202020] px-6 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-[#a6532e]">
              Shop women
            </Link>
            <Link href="/shop?category=Men" className="inline-flex min-h-12 items-center justify-center border border-[#202020]/40 px-6 text-xs font-bold uppercase tracking-wide text-[#202020] transition hover:border-[#202020] hover:bg-white/60">
              Shop men
            </Link>
          </div>
          <div className="mt-10 flex items-center gap-3 border-t border-black/15 pt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#77736d] sm:mt-14">
            <span>Everyday essentials</span>
            <span className="h-1 w-1 rounded-full bg-[#a6532e]" />
            <span>New arrivals</span>
          </div>
        </div>

        <div className="relative min-h-[360px] overflow-hidden bg-[#d3d0c9] sm:min-h-[480px] md:min-h-full">
          <img
            src={heroProduct.image}
            alt={heroProduct.name}
            className="absolute inset-0 h-full w-full object-cover object-center transition duration-700 hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 text-white sm:bottom-7 sm:left-7 sm:right-7">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80">
                Featured piece
              </p>
              <p className="mt-1 text-lg font-semibold sm:text-xl">{heroProduct.name}</p>
              <p className="mt-1 text-sm">Rs. {heroProduct.price.toLocaleString()}</p>
            </div>
            <Link
              href={`/shop/${heroProduct.id}`}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-2xl text-black transition hover:bg-[#ee8a4a] hover:text-white sm:h-14 sm:w-14"
              aria-label={`View ${heroProduct.name}`}
            >
              ↗
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

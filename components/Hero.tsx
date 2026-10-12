import Link from "next/link";
import { products } from "@/data/products";

export default function Hero() {
  const heroProduct = products[0];

  return (
    <section className="px-3 pt-3 sm:px-5 sm:pt-4 lg:px-6">
      <div className="campaign-hero relative mx-auto min-h-[560px] max-w-[1600px] overflow-hidden bg-[#d9d5ce] sm:min-h-[640px] lg:min-h-[min(760px,78vh)]">
        <img
          src={heroProduct.image}
          alt={heroProduct.name}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />
        <div className="relative z-10 flex min-h-[560px] max-w-2xl flex-col items-start justify-center px-6 py-12 text-white sm:min-h-[640px] sm:px-12 lg:min-h-[min(760px,78vh)] lg:px-16 xl:px-20">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/85 sm:text-xs">
            StyleHub / New season
          </p>
          <h1 className="mt-5 max-w-xl text-5xl font-semibold uppercase leading-[0.94] tracking-[-0.055em] sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
            Dress for
            <br />
            your everyday.
          </h1>
          <p className="mt-5 max-w-sm text-sm leading-6 text-white/85 sm:text-base">
            The pieces you'll reach for again and again.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/shop?category=Women" className="inline-flex min-h-12 items-center justify-center bg-white px-6 text-[11px] font-bold uppercase tracking-[0.1em] text-[#202020] transition hover:bg-[#e9e5dd]">
              Shop women
            </Link>
            <Link href="/shop?category=Men" className="inline-flex min-h-12 items-center justify-center border border-white/80 px-6 text-[11px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-white hover:text-[#202020]">
              Shop men
            </Link>
          </div>
        </div>
        <Link
          href={`/shop/${heroProduct.id}`}
          className="absolute bottom-5 right-5 z-10 flex items-center gap-3 border border-white/60 bg-black/20 px-4 py-3 text-white backdrop-blur-sm transition hover:bg-white hover:text-[#202020] sm:bottom-8 sm:right-8"
        >
          <span className="text-left">
            <span className="block text-[9px] font-semibold uppercase tracking-[0.16em]">In focus</span>
            <span className="mt-1 block text-xs font-semibold">{heroProduct.name}</span>
          </span>
          <span aria-hidden="true" className="text-lg">↗</span>
        </Link>
      </div>
    </section>
  );
}

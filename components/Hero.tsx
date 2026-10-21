import Link from "next/link";
import { products } from "@/data/products";

export default function Hero() {
  const heroProduct = products[0];

  return (
    <section className="px-4 pt-4 sm:px-6 sm:pt-6 lg:px-10">
      <div className="campaign-hero relative mx-auto min-h-[500px] max-w-[1440px] overflow-hidden bg-[#e9edf1] sm:min-h-[580px] lg:min-h-[min(680px,76vh)]">
        <img
          src={heroProduct.image}
          alt={heroProduct.name}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#151c25]/70 via-[#151c25]/25 to-transparent" />
        <div className="relative z-10 flex min-h-[500px] max-w-2xl flex-col items-start justify-center px-6 py-12 text-white sm:min-h-[580px] sm:px-10 lg:min-h-[min(680px,76vh)] lg:px-14 xl:px-16">
          <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/85 sm:text-[11px]">
            <span className="h-px w-7 bg-white/80" />
            The StyleHub edit · 01
          </p>
          <h1 className="mt-5 max-w-xl text-[3.25rem] font-semibold leading-[0.96] tracking-[-0.06em] sm:text-6xl lg:text-[5.25rem]">
            Wear what<br />works for you.
          </h1>
          <p className="mt-5 max-w-sm text-sm leading-6 text-white/90 sm:text-base">
            Thoughtful everyday pieces, easy layers, and reliable favourites for your wardrobe.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/shop?category=Women" className="inline-flex min-h-11 items-center justify-center bg-white px-5 text-[10px] font-semibold uppercase tracking-[0.09em] text-[#20252b] transition hover:bg-[#dce8f6]">
              Shop women <span aria-hidden="true" className="ml-4 text-base">↗</span>
            </Link>
            <Link href="/shop?category=Men" className="inline-flex min-h-11 items-center justify-center border border-white/75 px-5 text-[10px] font-semibold uppercase tracking-[0.09em] text-white transition hover:bg-white hover:text-[#20252b]">
              Shop men <span aria-hidden="true" className="ml-4 text-base">↗</span>
            </Link>
          </div>
        </div>
        <Link
          href={`/shop/${heroProduct.id}`}
          className="absolute bottom-4 right-4 z-10 flex max-w-[calc(100%-2rem)] items-center gap-4 border border-white/60 bg-[#20252b]/45 px-4 py-3 text-white backdrop-blur-sm transition hover:bg-white hover:text-[#20252b] sm:bottom-6 sm:right-6"
        >
          <span className="text-left">
            <span className="block text-[9px] font-medium uppercase tracking-[0.12em] opacity-80">Featured piece</span>
            <span className="mt-1 block text-xs font-semibold">{heroProduct.name}</span>
          </span>
          <span aria-hidden="true" className="text-lg">↗</span>
        </Link>
      </div>
    </section>
  );
}

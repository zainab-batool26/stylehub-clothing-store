import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#0b0b0b]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(212,175,55,0.14),transparent_30%)]" />
      <div className="relative mx-auto flex min-h-[680px] max-w-7xl items-center px-6 py-20 md:px-12 lg:px-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#d4af37]">
            New Collection 2026
          </p>

          <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight text-white md:text-7xl">
            Quiet luxury.
            <br />
            <span className="text-zinc-400">Everyday style.</span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-zinc-400 md:text-lg">
            Curated essentials with clean silhouettes, timeless tones, and
            effortless pieces made for modern wardrobes.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="rounded-full bg-[#d4af37] px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-[#e2c35c]"
            >
              Shop Collection
            </Link>
            <Link
              href="/categories"
              className="rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-[#d4af37] hover:text-[#d4af37]"
            >
              Explore Categories
            </Link>
          </div>
        </div>

        <div className="absolute right-[-10%] top-1/2 hidden h-[520px] w-[520px] -translate-y-1/2 rounded-full border border-[#d4af37]/20 md:block">
          <div className="absolute inset-10 rounded-full border border-white/10" />
          <div className="absolute inset-24 rounded-full bg-gradient-to-br from-[#d4af37]/20 via-zinc-800 to-zinc-950" />
          <p className="absolute inset-0 flex items-center justify-center text-sm uppercase tracking-[0.4em] text-zinc-500">
            STYLE / 2026
          </p>
        </div>
      </div>
    </section>
  );
}
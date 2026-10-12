import Link from "next/link";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import { products } from "@/data/products";

const categories = [
  {
    name: "Women",
    eyebrow: "The women's edit",
    href: "/shop?category=Women",
    image: products.find((product) => product.category === "Women")?.image,
  },
  {
    name: "Men",
    eyebrow: "Everyday essentials",
    href: "/shop?category=Men",
    image: products.find((product) => product.category === "Men")?.image,
  },
  {
    name: "New arrivals",
    eyebrow: "Just added",
    href: "/shop?category=New%20Arrival",
    image: products.find((product) => product.category === "New Arrival")?.image,
  },
];

export default function Home() {
  return (
    <main className="bg-white text-[#202020]">
      <Hero />

      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-6 flex items-end justify-between gap-4 border-b border-black/15 pb-4 sm:mb-8">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b85d32]">
                Find your fit
              </p>
              <h2 className="mt-2 text-2xl font-bold uppercase tracking-[-0.04em] sm:text-3xl">
                Shop by category
              </h2>
            </div>
            <Link href="/categories" className="shrink-0 border-b border-black pb-1 text-xs font-semibold uppercase tracking-wide hover:text-[#b85d32]">
              View all
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group relative block overflow-hidden bg-[#e9e7e2]"
              >
                <div className="aspect-[4/4.4] overflow-hidden sm:aspect-[4/5]">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="h-full w-full bg-[#e9e7e2]" />
                  )}
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/70 via-black/20 to-transparent px-5 pb-5 pt-16 text-white sm:px-6 sm:pb-6">
                  <div>
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80">
                      {category.eyebrow}
                    </p>
                    <h3 className="text-2xl font-bold uppercase tracking-tight sm:text-3xl">
                      {category.name}
                    </h3>
                  </div>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/70 text-xl transition group-hover:bg-white group-hover:text-black" aria-hidden="true">
                    ↗
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Products />

      <section className="px-4 pb-12 pt-2 sm:px-6 sm:pb-16 lg:px-10">
        <div className="mx-auto grid max-w-[1440px] overflow-hidden bg-[#202020] text-white md:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col items-start justify-center px-6 py-10 sm:px-10 sm:py-14 lg:px-16">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ee8a4a]">
              The StyleHub edit
            </p>
            <h2 className="mt-4 max-w-xl text-3xl font-bold uppercase leading-[1.02] tracking-[-0.04em] sm:text-4xl lg:text-5xl">
              Good style starts with the everyday.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/70">
              Find easy-to-wear pieces for the plans you make and the days you don't.
            </p>
            <Link href="/shop" className="mt-7 inline-flex items-center gap-4 bg-white px-5 py-3 text-xs font-bold uppercase tracking-wide text-black transition hover:bg-[#ee8a4a] hover:text-white">
              Explore all styles <span aria-hidden="true" className="text-base">→</span>
            </Link>
          </div>
          <div className="relative min-h-[260px] bg-[#3a3a3a] md:min-h-[360px]">
            <img
              src={products[3]?.image ?? products[0]?.image}
              alt="Explore the latest StyleHub collection"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

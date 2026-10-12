import Link from "next/link";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import { products } from "@/data/products";

const categories = [
  {
    name: "Women",
    eyebrow: "Shop the collection",
    href: "/shop?category=Women",
    image: products.find((product) => product.category === "Women")?.image,
  },
  {
    name: "Men",
    eyebrow: "Everyday pieces",
    href: "/shop?category=Men",
    image: products.find((product) => product.category === "Men")?.image,
  },
  {
    name: "New arrivals",
    eyebrow: "Fresh on the site",
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
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#b85d32]">
                Find something good
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                Shop by category
              </h2>
            </div>
            <Link href="/categories" className="shrink-0 border-b border-black pb-1 text-xs font-medium hover:text-[#b85d32]">
              All categories
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
                    <p className="mb-1 text-[10px] font-medium tracking-wide text-white/85">
                      {category.eyebrow}
                    </p>
                    <h3 className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
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
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#ee8a4a]">
              Made to be worn
            </p>
            <h2 className="mt-4 max-w-xl text-3xl font-semibold leading-[1.04] tracking-[-0.045em] sm:text-4xl lg:text-5xl">
              The pieces you'll keep coming back to.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/75">
              Start with the staples. Add something new when you find it.
            </p>
            <Link href="/shop" className="mt-7 inline-flex items-center gap-4 bg-white px-5 py-3 text-xs font-semibold text-black transition hover:bg-[#ee8a4a] hover:text-white">
              Shop all clothing <span aria-hidden="true" className="text-base">→</span>
            </Link>
          </div>
          <div className="relative min-h-[260px] bg-[#3a3a3a] md:min-h-[360px]">
            <img
              src={products[3]?.image ?? products[0]?.image}
              alt="Clothing from the StyleHub collection"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <footer className="bg-white px-4 pb-7 pt-9 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-7 border-t border-black/15 pt-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link href="/" className="text-2xl font-black tracking-[-0.08em]">
              STYLEHUB<span className="text-[#b85d32]">.</span>
            </Link>
            <p className="mt-2 max-w-sm text-xs leading-5 text-[#77736d]">
              Everyday clothes, picked for real wardrobes and repeat wear.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-3 text-[10px] font-semibold uppercase tracking-[0.1em]">
            <Link href="/shop" className="hover:text-[#a6532e]">Shop all</Link>
            <Link href="/categories" className="hover:text-[#a6532e]">Categories</Link>
            <Link href="/cart" className="hover:text-[#a6532e]">Shopping bag</Link>
          </div>
        </div>
        <p className="mx-auto mt-7 max-w-[1440px] text-[10px] text-[#77736d]">© {new Date().getFullYear()} StyleHub. All rights reserved.</p>
      </footer>
    </main>
  );
}

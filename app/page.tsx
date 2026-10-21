import Link from "next/link";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import { products } from "@/data/products";

const categories = [
  {
    name: "Women",
    eyebrow: "Considered everyday pieces",
    href: "/shop?category=Women",
    image: products.find((product) => product.category === "Women")?.image,
  },
  {
    name: "Men",
    eyebrow: "The everyday rotation",
    href: "/shop?category=Men",
    image: products.find((product) => product.category === "Men")?.image,
  },
  {
    name: "New arrivals",
    eyebrow: "Just added to the edit",
    href: "/shop?category=New%20Arrival",
    image: products.find((product) => product.category === "New Arrival")?.image,
  },
];

export default function Home() {
  return (
    <main className="bg-white text-[#202020]">
      <Hero />

      <section className="px-4 py-9 sm:px-6 sm:py-12 lg:px-10 lg:py-14">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-5 flex items-end justify-between gap-4 border-b border-[#dfe4e8] pb-4 sm:mb-7">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#294f82]">
                A good place to start
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.045em] sm:text-3xl">
                Find your kind of everyday.
              </h2>
            </div>
            <Link
              href="/categories"
              className="shrink-0 border-b border-black pb-1 text-[10px] font-semibold uppercase tracking-[0.08em] transition hover:border-[#294f82] hover:text-[#294f82] sm:text-xs"
            >
              All categories <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group relative block overflow-hidden bg-[#e9edf1]"
              >
                <div className="aspect-[5/4] overflow-hidden sm:aspect-[4/4.5]">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.035]"
                    />
                  ) : (
                    <div className="flex h-full min-h-48 items-end bg-[#e9edf1] p-5 text-sm text-[#626b75]">
                      Explore the collection
                    </div>
                  )}
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/75 via-black/20 to-transparent px-4 pb-4 pt-14 text-white sm:px-5 sm:pb-5">
                  <div>
                    <p className="mb-1 text-[9px] font-medium tracking-[0.08em] text-white/85 sm:text-[10px]">
                      {category.eyebrow}
                    </p>
                    <h3 className="text-2xl font-semibold tracking-[-0.04em] sm:text-2xl lg:text-3xl">
                      {category.name}
                    </h3>
                  </div>
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/75 text-lg transition duration-300 group-hover:border-white group-hover:bg-white group-hover:text-[#202020]"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Products />

      <section className="px-4 pb-10 pt-1 sm:px-6 sm:pb-14 lg:px-10">
        <div className="mx-auto grid max-w-[1440px] overflow-hidden bg-[#202020] text-white md:grid-cols-[1fr_0.9fr]">
          <div className="flex flex-col items-start justify-center px-6 py-9 sm:px-9 sm:py-11 lg:px-14 lg:py-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#dce8f6]">
              Less, but better
            </p>
            <h2 className="mt-3 max-w-lg text-3xl font-semibold leading-[1.04] tracking-[-0.05em] sm:text-4xl lg:text-[2.8rem]">
              Good clothes earn their place.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-white/70">
              Easy-to-wear pieces for the days that make up real life.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-flex min-h-11 items-center gap-5 bg-white px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#202020] transition hover:bg-[#dce8f6] hover:text-white"
            >
              Explore the collection <span aria-hidden="true" className="text-base">→</span>
            </Link>
          </div>
          <Link
            href="/shop"
            aria-label="Explore all clothing"
            className="group relative min-h-[230px] overflow-hidden bg-[#3a3a3a] sm:min-h-[280px] md:min-h-[320px]"
          >
            <img
              src={products[3]?.image ?? products[0]?.image}
              alt="A look from the StyleHub collection"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
            <span className="absolute bottom-4 right-4 border border-white/80 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-white">
              Shop the edit ↗
            </span>
          </Link>
        </div>
      </section>

      <footer className="bg-white px-4 pb-6 pt-8 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-6 border-t border-[#dfe4e8] pt-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link href="/" className="text-2xl font-black tracking-[-0.08em]">
              STYLEHUB<span className="text-[#294f82]">.</span>
            </Link>
            <p className="mt-2 max-w-sm text-xs leading-5 text-[#626b75]">
              Everyday clothes, picked for real wardrobes and repeat wear.
            </p>
          </div>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-3 text-[10px] font-semibold uppercase tracking-[0.1em]">
            <Link href="/shop" className="transition hover:text-[#294f82]">Shop all</Link>
            <Link href="/categories" className="transition hover:text-[#294f82]">Categories</Link>
            <Link href="/cart" className="transition hover:text-[#294f82]">Shopping bag</Link>
          </nav>
        </div>
        <p className="mx-auto mt-6 max-w-[1440px] text-[10px] text-[#626b75]">
          © {new Date().getFullYear()} StyleHub. All rights reserved.
        </p>
      </footer>
    </main>
  );
}

import Link from "next/link";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import { products } from "@/data/products";

const categoryItems = [
  {
    name: "Men",
    note: "Everyday staples",
    href: "/shop?category=Men",
    image: products.find((product) => product.category === "Men")?.image,
    number: "01",
  },
  {
    name: "Women",
    note: "Pieces to make your own",
    href: "/shop?category=Women",
    image: products.find((product) => product.category === "Women")?.image,
    number: "02",
  },
  {
    name: "New Arrivals",
    note: "Fresh in the collection",
    href: "/shop?category=New%20Arrival",
    image: products.find((product) => product.category === "New Arrival")?.image,
    number: "03",
  },
];

export default function Home() {
  return (
    <main>
      <Hero />

      <section className="px-4 pb-14 pt-8 sm:px-6 sm:pb-16 lg:px-8 lg:pt-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-3 border-b border-[#303038]/20 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#ee8a4a]">
                Find your section
              </p>
              <h2 className="mt-2 font-serif text-3xl leading-tight tracking-[-0.03em] text-[#303038] sm:text-4xl">
                Explore the collection
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-[#77767a]">
              Start with what you need. There is more to browse inside each collection.
            </p>
          </div>

          <div className="mt-6 grid gap-0 sm:grid-cols-3">
            {categoryItems.map((category, index) => (
              <Link
                key={category.name}
                href={category.href}
                className={`group flex min-w-0 items-center gap-4 border-b border-[#303038]/15 py-4 transition hover:bg-[#e5e3dc] sm:flex-col sm:items-stretch sm:border-b-0 sm:px-4 sm:py-0 ${index === 0 ? "sm:pl-0" : ""} ${index === 2 ? "sm:pr-0" : "sm:border-r sm:border-[#303038]/15"}`}
              >
                <div className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden bg-[#deddd8] sm:aspect-[5/4] sm:w-full">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt=""
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  ) : null}
                  <span className="absolute left-2 top-2 bg-[#eeece6] px-2 py-1 text-[10px] tracking-[0.12em] text-[#303038]">
                    {category.number}
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 items-center justify-between gap-3 sm:pt-3">
                  <div>
                    <h3 className="font-serif text-2xl text-[#303038] sm:text-[1.7rem]">
                      {category.name}
                    </h3>
                    <p className="mt-1 text-xs text-[#77767a]">{category.note}</p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="text-xl text-[#ee8a4a] transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Products />

      <section className="bg-[#303038] px-4 py-8 text-[#f1efe9] sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-[#ee8a4a]">
              Still looking?
            </p>
            <h2 className="mt-2 font-serif text-2xl sm:text-3xl">
              See everything in one place.
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex w-fit items-center gap-3 border border-white/30 px-5 py-3 text-sm transition hover:border-[#ee8a4a] hover:bg-white/5"
          >
            Browse all pieces <span className="text-[#ee8a4a]">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

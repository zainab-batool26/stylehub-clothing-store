import Link from "next/link";

const categories = [
  {
    name: "Women",
    description: "Refined essentials for every occasion.",
    accent: "from-[#3a3020] to-[#151515]",
  },
  {
    name: "Men",
    description: "Clean classics with a modern edge.",
    accent: "from-[#242424] to-[#111111]",
  },
  {
    name: "New Arrivals",
    description: "Fresh pieces just added to StyleHub.",
    accent: "from-[#302a1e] to-[#151515]",
  },
];

export default function Categories() {
  return (
    <section className="bg-[#0b0b0b] px-6 py-20 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
            Collections
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
            Find your style
          </h2>
          <p className="mt-3 max-w-2xl text-zinc-500">
            Explore carefully selected collections built around timeless,
            wearable pieces.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.name === "New Arrivals"
                ? "/shop?category=New%20Arrival"
                : `/shop?category=${category.name}`}
              className={`group relative min-h-72 overflow-hidden rounded-2xl bg-gradient-to-br ${category.accent} p-7 transition duration-300 hover:-translate-y-1 hover:border-[#d4af37]/30 hover:shadow-2xl`}
            >
              <div className="absolute right-6 top-5 text-7xl font-light text-white/5 transition group-hover:text-[#d4af37]/10">
                ✦
              </div>
              <div className="relative flex h-full flex-col justify-end">
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                  Collection
                </p>
                <h3 className="mt-2 text-3xl font-semibold text-white">
                  {category.name}
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-6 text-zinc-400">
                  {category.description}
                </p>
                <span className="mt-6 text-sm font-semibold text-[#d4af37]">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
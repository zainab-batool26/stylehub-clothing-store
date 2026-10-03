import Link from "next/link";

const categories = [
  {
    number: "01",
    name: "Women",
    description: "Dresses and everyday pieces.",
    className: "bg-[#d7d5cf]",
  },
  {
    number: "02",
    name: "Men",
    description: "Clean, easy-to-wear essentials.",
    className: "bg-[#c9c8c4]",
  },
  {
    number: "03",
    name: "New Arrivals",
    description: "The latest pieces added to StyleHub.",
    className: "bg-[#dedbd3]",
  },
];

export default function Categories() {
  return (
    <section className="bg-[#eeece6] px-5 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-[0.55fr_1.45fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#ee8a4a]">
              Collections
            </p>
            <h2 className="mt-4 max-w-xs font-serif text-5xl leading-none text-[#303038] md:text-6xl">
              Start with a section.
            </h2>
            <p className="mt-5 max-w-xs text-sm leading-6 text-[#77767a]">
              No complicated browsing. Pick a category and see what is there.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={
                  category.name === "New Arrivals"
                    ? "/shop?category=New%20Arrival"
                    : `/shop?category=${category.name}`
                }
                className={`group flex min-h-64 flex-col justify-between p-5 text-[#303038] transition hover:-translate-y-1 ${category.className}`}
              >
                <span className="text-xs text-[#77767a]">{category.number}</span>
                <div>
                  <h3 className="font-serif text-3xl">{category.name}</h3>
                  <p className="mt-2 text-xs leading-5 text-[#66656a]">
                    {category.description}
                  </p>
                  <span className="mt-5 inline-block text-xs font-semibold uppercase tracking-[0.12em] text-[#ee6f32]">
                    View →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

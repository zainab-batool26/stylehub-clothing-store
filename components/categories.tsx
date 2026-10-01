import Link from "next/link";

export default function Categories() {
  const categories = [
    {
      name: "Women",
      description: "Elegant styles for every occasion",
      bg: "bg-rose-100",
    },
    {
      name: "Men",
      description: "Classic and modern essentials",
      bg: "bg-slate-200",
    },
    {
      name: "New Arrivals",
      description: "Discover the latest trends",
      bg: "bg-amber-100",
    },
  ];

  return (
    <section className="px-6 py-16 md:px-12 lg:px-20">
      <div className="mb-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-pink-600">
          Shop by Category
        </p>

        <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
          Find Your Style
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-gray-500">
          Explore our carefully selected collections designed for modern
          everyday fashion.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`${category.bg} group relative flex h-72
              cursor-pointer flex-col justify-end overflow-hidden
              rounded-2xl p-8 transition duration-300 hover:-translate-y-1
              hover:shadow-xl`}
          >
            <div className="absolute right-8 top-8 text-6xl opacity-20">
              ✦
            </div>

            <p className="text-sm font-medium uppercase tracking-wider text-gray-600">
              Collection
            </p>

            <h3 className="mt-1 text-3xl font-bold text-gray-900">
              {category.name}
            </h3>

            <p className="mt-2 text-sm text-gray-600">
              {category.description}
            </p>

                    <Link
              href={
                category.name === "Women"
                  ? "/shop?category=Women"
                  : category.name === "Men"
                  ? "/shop?category=Men"
                  : "/shop?category=New Arrivals"
              
          }
          className="mt-5 w-fit text-sm font-semibold text-gray-900 underline underline-offset-4 transition group-hover:text-pink-600"
        >
          Explore Collection →
        </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
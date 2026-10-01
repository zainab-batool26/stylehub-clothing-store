export default function Hero() {
  return (
    <section className="bg-pink-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-10 py-20">

        {/* Left Side */}
        <div className="max-w-xl">
          <p className="text-pink-600 font-semibold uppercase tracking-widest">
            New Collection 2026
          </p>

          <h1 className="mt-4 text-6xl font-bold leading-tight text-gray-900">
            Elevate Your <br /> Fashion Style
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            Discover trendy outfits, premium quality fabrics, and timeless
            fashion for every occasion.
          </p>

          <button className="mt-8 rounded-lg bg-pink-600 px-8 py-4 text-white transition hover:bg-pink-700">
            Shop Now
          </button>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex h-96 w-96 items-center justify-center rounded-3xl bg-pink-200">
          <p className="text-2xl font-bold text-pink-700">
            Fashion Image
          </p>
        </div>

      </div>
    </section>
  );
}
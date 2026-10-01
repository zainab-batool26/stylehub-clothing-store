import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/categories";
import Products from "@/components/Products";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Categories />
      <Products />
    </main>
  );
}
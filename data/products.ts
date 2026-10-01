type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  bg: string;
  image: string;
  description: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Classic Black Dress",
    price: 4500,
    category: "Women",
    bg: "bg-gray-200",
    image: "/products/classic-black-dress.jpg",
    description:
      "A timeless black dress designed for an elegant and effortless look.",
  },
  {
    id: 2,
    name: "Elegant Summer Dress",
    price: 7000,
    category: "Women",
    bg: "bg-pink-100",
    image: "/products/elegant-summer-dress.jpg",
    description:
      "A light and elegant summer dress perfect for casual and formal occasions.",
  },
  {
    id: 3,
    name: "Premium Men's Shirt",
    price: 3800,
    category: "Men",
    bg: "bg-blue-100",
    image: "/products/premium-men-shirt.jfif",
    description:
      "A classic men's shirt combining comfort, quality and modern style.",
  },
  {
    id: 4,
    name: "Everyday Casual Outfit",
    price: 4200,
    category: "New Arrival",
    bg: "bg-amber-100",
    image: "/products/everday-casual.jpg", 
    description:
      "A comfortable everyday outfit designed for a clean and relaxed style.",
  },
  {
    id: 5,
    name: "Minimal Beige Outfit",
    price: 5500,
    category: "Women",
    bg: "bg-orange-100",
    image: "/products/everyday-casual-dress.jpg",
    description:
      "A minimal beige outfit with a sophisticated and versatile appearance.",
  },
  {
    id: 6,
    name: "Classic White Shirt",
    price: 3500,
    category: "Men",
    bg: "bg-slate-100",
    image: "/products/white-shirt.jfif",
    description:
      "A versatile white shirt that works perfectly for both casual and formal looks.",
  },
];
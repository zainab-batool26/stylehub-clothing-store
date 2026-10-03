import { supabase } from "@/lib/supabase";

export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  bg: string;
  image: string;
  description: string;
};

type DbProduct = Omit<Product, "bg">;

export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("id,name,price,category,description,image")
    .order("id");

  if (error) throw error;

  return ((data ?? []) as DbProduct[]).map((product) => ({
    ...product,
    bg: "bg-[#deddd8]",
  }));
}

export async function getProduct(id: number) {
  const { data, error } = await supabase
    .from("products")
    .select("id,name,price,category,description,image")
    .eq("id", id)
    .single();

  if (error) return null;

  return {
    ...(data as DbProduct),
    bg: "bg-[#deddd8]",
  };
}

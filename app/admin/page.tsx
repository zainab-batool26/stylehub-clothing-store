"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/lib/products";

type FormState = {
  name: string;
  price: string;
  category: string;
  description: string;
  image: string;
};

const emptyForm: FormState = {
  name: "",
  price: "",
  category: "Women",
  description: "",
  image: "",
};

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkSession();
  }, []);

  async function checkSession() {
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      setLoading(false);
      return;
    }

    setUserId(data.user.id);

    const { data: adminUser } = await supabase
      .from("admin_users")
      .select("user_id")
      .eq("user_id", data.user.id)
      .maybeSingle();

    if (!adminUser) {
      setLoading(false);
      return;
    }

    setIsAdmin(true);
    await loadProducts();
    setLoading(false);
  }

  async function login(event: FormEvent) {
    event.preventDefault();
    setError("");
    setMessage("");

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError(loginError.message);
      return;
    }

    setPassword("");
    await checkSession();
  }

  async function logout() {
    await supabase.auth.signOut();
    setIsAdmin(false);
    setProducts([]);
  }

  async function loadProducts() {
    const { data, error: loadError } = await supabase
      .from("products")
      .select("id,name,price,category,description,image")
      .order("id");

    if (loadError) {
      setError(loadError.message);
      return;
    }

    setProducts(
      (data ?? []).map((product) => ({
        ...product,
        bg: "bg-[#deddd8]",
      })) as Product[]
    );
  }

  function startEdit(product: Product) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      price: String(product.price),
      category: product.category,
      description: product.description,
      image: product.image,
    });
    setFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
    setFile(null);
  }

  async function uploadImage() {
    if (!file) return form.image;

    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `products/${crypto.randomUUID()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(path, file, {
        cacheControl: "3600",
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from("product-images")
      .getPublicUrl(path);

    return data.publicUrl;
  }

  async function saveProduct(event: FormEvent) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!form.name.trim() || !form.description.trim()) {
      setError("Name and description are required.");
      return;
    }

    const price = Number(form.price);
    if (!Number.isFinite(price) || price < 0) {
      setError("Enter a valid price.");
      return;
    }

    setSaving(true);

    try {
      const image = await uploadImage();
      const payload = {
        name: form.name.trim(),
        price: Math.round(price),
        category: form.category,
        description: form.description.trim(),
        image,
        updated_at: new Date().toISOString(),
      };

      if (editingId) {
        const { error: updateError } = await supabase
          .from("products")
          .update(payload)
          .eq("id", editingId);

        if (updateError) throw updateError;
        setMessage("Product updated.");
      } else {
        const { error: insertError } = await supabase
          .from("products")
          .insert(payload);

        if (insertError) throw insertError;
        setMessage("Product added.");
      }

      resetForm();
      await loadProducts();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Could not save product.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteProduct(id: number) {
    if (!window.confirm("Delete this product?")) return;

    setError("");
    const { error: deleteError } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (deleteError) {
      setError(deleteError.message);
      return;
    }

    setMessage("Product deleted.");
    if (editingId === id) resetForm();
    await loadProducts();
  }

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    setFile(event.target.files?.[0] ?? null);
  }

  if (loading) {
    return <main className="min-h-screen bg-[#eeece6] px-6 py-20 text-[#303038]">Loading admin...</main>;
  }

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-[#eeece6] px-5 py-12 text-[#303038] md:px-10">
        <div className="mx-auto max-w-md">
          <p className="text-xs uppercase tracking-[0.25em] text-[#ee8a4a]">StyleHub / Admin</p>
          <h1 className="mt-4 font-serif text-5xl">Sign in</h1>
          <p className="mt-4 text-sm leading-6 text-[#77767a]">
            This area is for managing the store catalogue. Only a Supabase user
            that has been added to the StyleHub admin list can make changes.
          </p>

          <form onSubmit={login} className="mt-8 space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Admin email"
              required
              className="w-full border border-[#303038]/20 bg-[#f5f3ed] px-4 py-3 text-sm outline-none focus:border-[#ee8a4a]"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full border border-[#303038]/20 bg-[#f5f3ed] px-4 py-3 text-sm outline-none focus:border-[#ee8a4a]"
            />
            <button className="w-full bg-[#303038] px-4 py-3 text-sm font-semibold text-white hover:bg-[#3a3a43]">
              Sign in
            </button>
          </form>

          {error && <p className="mt-5 border border-[#b85c45]/30 bg-[#f1ddd6] p-3 text-sm text-[#8d4635]">{error}</p>}

          {userId && !isAdmin && (
            <div className="mt-6 border border-[#303038]/15 bg-[#deddd8] p-4 text-xs leading-5 text-[#55545a]">
              <p className="font-semibold text-[#303038]">This account is not an admin yet.</p>
              <p className="mt-2">In Supabase SQL Editor, add this account once:</p>
              <code className="mt-2 block break-all bg-[#eeece6] p-2">insert into public.admin_users (user_id) values ('{userId}');</code>
              <p className="mt-2">Then sign in again.</p>
            </div>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#eeece6] px-5 pb-20 pt-8 text-[#303038] md:px-10 md:pt-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-4 border-b border-[#303038]/15 pb-7 md:flex-row md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#ee8a4a]">StyleHub / Admin</p>
            <h1 className="mt-3 font-serif text-5xl">Product catalogue</h1>
            <p className="mt-3 text-sm text-[#77767a]">Add, edit or remove products without changing code.</p>
          </div>
          <button onClick={logout} className="border border-[#303038]/20 px-4 py-2 text-xs font-semibold hover:border-[#303038]">
            Sign out
          </button>
        </div>

        {(message || error) && (
          <div className="mt-5">
            {message && <p className="border border-[#303038]/10 bg-[#deddd8] p-3 text-sm">{message}</p>}
            {error && <p className="mt-2 border border-[#b85c45]/30 bg-[#f1ddd6] p-3 text-sm text-[#8d4635]">{error}</p>}
          </div>
        )}

        <section className="mt-8 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <form onSubmit={saveProduct} className="border border-[#303038]/15 bg-[#deddd8] p-5 md:p-6">
            <div className="flex items-center justify-between border-b border-[#303038]/15 pb-4">
              <h2 className="font-serif text-3xl">{editingId ? "Edit product" : "Add product"}</h2>
              {editingId && (
                <button type="button" onClick={resetForm} className="text-xs underline">Cancel</button>
              )}
            </div>

            <div className="mt-5 space-y-4">
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Product name"
                required
                className="w-full border border-[#303038]/20 bg-[#eeece6] px-3 py-3 text-sm outline-none focus:border-[#ee8a4a]"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  min="0"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="Price"
                  required
                  className="w-full border border-[#303038]/20 bg-[#eeece6] px-3 py-3 text-sm outline-none focus:border-[#ee8a4a]"
                />
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full border border-[#303038]/20 bg-[#eeece6] px-3 py-3 text-sm outline-none focus:border-[#ee8a4a]"
                >
                  <option>Women</option>
                  <option>Men</option>
                  <option>New Arrival</option>
                </select>
              </div>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Description"
                rows={5}
                required
                className="w-full resize-none border border-[#303038]/20 bg-[#eeece6] px-3 py-3 text-sm outline-none focus:border-[#ee8a4a]"
              />
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.15em]">Product image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  className="mt-2 block w-full text-xs"
                />
                {form.image && <p className="mt-2 break-all text-[11px] text-[#77767a]">Current: {form.image}</p>}
              </div>
              <button disabled={saving} className="w-full bg-[#ee8a4a] px-4 py-3 text-sm font-semibold text-white hover:bg-[#d86f35] disabled:opacity-50">
                {saving ? "Saving..." : editingId ? "Save changes" : "Add product"}
              </button>
            </div>
          </form>

          <section>
            <div className="mb-4 flex items-end justify-between border-b border-[#303038]/15 pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#ee8a4a]">Inventory</p>
                <h2 className="mt-1 font-serif text-3xl">{products.length} products</h2>
              </div>
            </div>

            <div className="space-y-3">
              {products.map((product) => (
                <article key={product.id} className="flex gap-4 border border-[#303038]/15 bg-[#f5f3ed] p-3">
                  <div className="h-24 w-20 shrink-0 bg-[#d1cfca]">
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase tracking-[0.15em] text-[#ee6f32]">{product.category}</p>
                    <h3 className="mt-1 truncate text-sm font-semibold">{product.name}</h3>
                    <p className="mt-1 text-sm text-[#55545a]">Rs. {product.price.toLocaleString()}</p>
                    <div className="mt-3 flex gap-4 text-xs">
                      <button onClick={() => startEdit(product)} className="underline">Edit</button>
                      <button onClick={() => deleteProduct(product.id)} className="text-[#9a4938] underline">Delete</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}

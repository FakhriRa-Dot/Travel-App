"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPromoById, updatePromo } from "@/services/promoService";

export default function EditPromoPage() {
  const params = useParams();
  const router = useRouter();

  const id = typeof params.id === "string" ? params.id : "";

  const [token, setToken] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
    terms_condition: "",
    promo_code: "",
    promo_discount_price: 0,
    minimum_claim_price: 0,
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      router.push("/login");
      return;
    }

    setToken(storedToken);
  }, [router]);

  useEffect(() => {
    if (!token || !id) return;

    async function fetchPromo() {
      try {
        const data = await getPromoById(id, token!);

        setForm({
          title: data.title,
          description: data.description,
          imageUrl: data.imageUrl,
          terms_condition: data.terms_condition,
          promo_code: data.promo_code,
          promo_discount_price: data.promo_discount_price,
          minimum_claim_price: data.minimum_claim_price,
        });
      } catch (error) {
        console.error("Fetch promo error:", error);
        localStorage.removeItem("token");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }

    fetchPromo();
  }, [id, token, router]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "promo_discount_price" || name === "minimum_claim_price"
          ? Number(value)
          : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!token || !id) {
      router.push("/login");
      return;
    }

    try {
      await updatePromo(id, form, token!);
      alert("Promo updated successfully");
      router.push("/promoAdmin");
    } catch (error) {
      alert("Failed to update promo");
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow">
      <h1 className="text-2xl font-semibold mb-6">Edit Promo</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border rounded-lg px-4 py-2"
          required
        />

        <input
          name="promo_code"
          value={form.promo_code}
          onChange={handleChange}
          placeholder="Promo Code"
          className="w-full border rounded-lg px-4 py-2 uppercase"
          required
        />

        <input
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full border rounded-lg px-4 py-2"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border rounded-lg px-4 py-2"
        />

        <textarea
          name="terms_condition"
          value={form.terms_condition}
          onChange={handleChange}
          placeholder="Terms & Conditions"
          className="w-full border rounded-lg px-4 py-2"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="promo_discount_price"
            value={form.promo_discount_price}
            onChange={handleChange}
            placeholder="Discount Price"
            className="border rounded-lg px-4 py-2"
            required
          />

          <input
            type="number"
            name="minimum_claim_price"
            value={form.minimum_claim_price}
            onChange={handleChange}
            placeholder="Minimum Claim Price"
            className="border rounded-lg px-4 py-2"
            required
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg"
          >
            Update Promo
          </button>
        </div>
      </form>
    </div>
  );
}

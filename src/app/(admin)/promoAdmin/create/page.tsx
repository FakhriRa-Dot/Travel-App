"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPromo } from "@/services/promoService";
import { CreatePromoPayload } from "@/types/promo";

export default function CreatePromoPage() {
  const router = useRouter();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<CreatePromoPayload>({
    title: "",
    description: "",
    imageUrl: "",
    terms_condition: "",
    promo_code: "",
    promo_discount_price: 0,
    minimum_claim_price: 0,
  });

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

    try {
      setLoading(true);
      await createPromo(form, token);
      alert("Promo created successfully!");
      router.push("/promoAdmin");
    } catch (error) {
      alert("Failed to create promo");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow">
      <h1 className="text-2xl font-semibold mb-6">Create New Promo</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border rounded-lg px-4 py-2"
          required
        />

        {/* Promo Code */}
        <input
          name="promo_code"
          value={form.promo_code}
          onChange={handleChange}
          placeholder="Promo Code"
          className="w-full border rounded-lg px-4 py-2"
          required
        />

        {/* Image URL */}
        <input
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full border rounded-lg px-4 py-2"
          required
        />

        {/* Description */}
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border rounded-lg px-4 py-2"
        />

        {/* Terms */}
        <textarea
          name="terms_condition"
          value={form.terms_condition}
          onChange={handleChange}
          placeholder="Terms & Conditions (HTML allowed)"
          className="w-full border rounded-lg px-4 py-2"
        />

        {/* Prices */}
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

        {/* Buttons */}
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
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Promo"}
          </button>
        </div>
      </form>
    </div>
  );
}

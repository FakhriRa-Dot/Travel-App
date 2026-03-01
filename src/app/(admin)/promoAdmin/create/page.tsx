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
  const [error, setError] = useState("");

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
    setError("");

    if (!token) {
      setError("Unauthorized. Please login as admin.");
      return;
    }

    try {
      setLoading(true);

      const payload: CreatePromoPayload = {
        title: form.title,
        description: form.description,
        imageUrl: form.imageUrl,
        terms_condition: form.terms_condition,
        promo_code: form.promo_code,
        promo_discount_price: Number(form.promo_discount_price),
        minimum_claim_price: Number(form.minimum_claim_price),
      };

      await createPromo(payload, token);

      alert("Promo created successfully!");
      router.push("/promoAdmin");
    } catch (err: any) {
      setError("Failed to create promo");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow">
      <h1 className="text-2xl font-semibold mb-6">Create New Promo</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title *</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Staycation Brings Silaturahmi"
            className="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>

        {/* Promo Code */}
        <div>
          <label className="block text-sm font-medium mb-1">Promo Code *</label>
          <input
            name="promo_code"
            value={form.promo_code}
            onChange={handleChange}
            placeholder="BELI2"
            className="w-full border rounded-lg px-4 py-2 uppercase"
            required
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium mb-1">Image URL *</label>
          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Description *
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Promo description..."
            className="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>

        {/* Terms & Condition */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Terms & Conditions (HTML) *
          </label>
          <textarea
            name="terms_condition"
            value={form.terms_condition}
            onChange={handleChange}
            placeholder="<p>Discount coupon of 15%...</p>"
            className="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>

        {/* Prices */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Discount Price *
            </label>
            <input
              type="number"
              name="promo_discount_price"
              value={form.promo_discount_price}
              onChange={handleChange}
              placeholder="100000"
              className="border rounded-lg px-4 py-2 w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Minimum Claim Price *
            </label>
            <input
              type="number"
              name="minimum_claim_price"
              value={form.minimum_claim_price}
              onChange={handleChange}
              placeholder="500000"
              className="border rounded-lg px-4 py-2 w-full"
              required
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-6">
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

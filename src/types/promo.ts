export interface Promo {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  terms_condition: string;
  promo_code: string;
  promo_discount_price: number;
  minimum_claim_price: number;
  createdAt: string;
  updatedAt: string;
}

export type CreatePromoPayload = Omit<Promo, "id" | "createdAt" | "updatedAt">;

export type UpdatePromoPayload = CreatePromoPayload;

export type CreateTransactionPayload = {
  cartIds: string[];
  paymentMethodId: string;
};

export type Transaction = {
  id: string;
  invoiceId: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  proofPaymentUrl?: string;
  user?: {
    name: string;
    email: string;
  };
};

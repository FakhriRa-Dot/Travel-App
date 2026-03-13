export type CreateTransactionPayload = {
  cartIds: string[];
  paymentMethodId: string;
};

export type TransactionItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  imageUrls: string[];
};

export type PaymentMethod = {
  id: string;
  name: string;
  virtual_account_number: string;
  virtual_account_name: string;
  imageUrl: string;
};

export type Transaction = {
  id: string;
  userId: string;
  paymentMethodId: string;
  invoiceId: string;
  status: string;
  totalAmount: number;
  proofPaymentUrl?: string;
  orderDate: string;
  expiredDate: string;
  createdAt: string;
  updatedAt: string;

  payment_method: PaymentMethod;
  transaction_items: TransactionItem[];
};

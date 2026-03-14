import { Transaction } from "@/types/transaction";

export type TransactionListItem = Pick<
  Transaction,
  | "id"
  | "invoiceId"
  | "status"
  | "totalAmount"
  | "proofPaymentUrl"
  | "createdAt"
>;

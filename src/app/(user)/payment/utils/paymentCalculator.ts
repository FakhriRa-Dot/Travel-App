export function calculateSubtotal(carts: any[]) {
  return carts.reduce(
    (total, item) => total + item.activity.price * item.quantity,
    0,
  );
}

export function calculateServiceFee(subtotal: number) {
  return subtotal * 0.05;
}

export function calculateTotal(
  subtotal: number,
  fee: number,
  discount: number = 0,
) {
  return subtotal + fee - discount;
}

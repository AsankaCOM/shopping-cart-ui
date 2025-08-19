export function calculateTotal(cartItems) {
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
}
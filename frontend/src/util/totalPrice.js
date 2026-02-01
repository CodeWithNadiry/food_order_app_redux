import { useSelector } from "react-redux";

export function useTotalPrice() {
  const items = useSelector(state => state.cart.items)

  const totalPrice = items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0)

  return totalPrice
}
import { useSelector } from "react-redux";

export function useCartTotalQuantity() {
  const items = useSelector(state => state.cart.items)

  return items.length;
}
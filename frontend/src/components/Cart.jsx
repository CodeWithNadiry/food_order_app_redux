import { useDispatch, useSelector } from "react-redux";
import { currencyFormatter } from "../util/formatter";
import { useTotalPrice } from "../util/totalPrice";
import Button from "./Button";
import CartItem from "./CartItem";
import Modal from "./Modal";
import { modalActions } from "../store/modal-slice";
import { cartActions } from "../store/cart-slice";

const Cart = () => {
  const items = useSelector((state) => state.cart.items);
  const modalType = useSelector((state) => state.modal.modalType);
  const dispatch = useDispatch();
  const total = useTotalPrice();

  console.log("Cart Modal Open?", modalType === "cart");
  console.log("Cart Items:", items);

  return (
    <Modal
      open={modalType === "cart"}
      onClose={() => dispatch(modalActions.closeModal())}
      customClasses="w-[90%] max-w-xl p-6"
    >
      <h2 className="text-xl font-bold mb-4 text-black">Your Cart</h2>

      {items.length === 0 && <p className="text-black">Your cart is empty.</p>}

      <ul className="mb-4 text-black">
        {items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            onDecrease={() => dispatch(cartActions.removeItem(item.id))}
            onIncrease={() => dispatch(cartActions.addItem(item))}
          />
        ))}
      </ul>

      <p className="text-right font-bold mb-4 text-black">
        Total: {currencyFormatter.format(total)}
      </p>

      <div className="flex justify-end gap-2 text-black">
        <Button onClick={() => dispatch(modalActions.closeModal())}>
          Close
        </Button>

        {items.length > 0 && (
          <Button onClick={() => dispatch(modalActions.openModal("checkout"))}>
            Go To Checkout
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
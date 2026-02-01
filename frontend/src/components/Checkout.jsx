/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { currencyFormatter } from "../util/formatter";
import { useTotalPrice } from "../util/totalPrice";
import Modal from "./Modal";
import Button from "./Button";
import Input from "./Input";
import ErrorPage from "./ErrorPage";
import { modalActions } from "../store/modal-slice";
import { cartActions } from "../store/cart-slice";
import useHttp from "../hooks/useHttp";
import { useActionState } from "react";

const inputs = [
  { type: "text", id: "name", label: "Full Name" },
  { type: "email", id: "email", label: "E-mail Address" },
  { type: "text", id: "street", label: "Street" },
  { type: "text", id: "postal-code", label: "Postal Code" },
  { type: "text", id: "city", label: "City" },
];

const requestConfig = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
};

const Checkout = () => {
  const dispatch = useDispatch();
  const modalType = useSelector((state) => state.modal.modalType);
  const items = useSelector((state) => state.cart.items);
  const totalPrice = useTotalPrice();

  const { data, error, sendRequest, clearCartData } = useHttp(
    "http://localhost:3000/orders",
    requestConfig,
  );

  async function checkoutAction(_, formData) {
    const customerData = Object.fromEntries(formData.entries());
    await sendRequest(
      JSON.stringify({
        orderData: { items, customer: customerData },
      }),
    );
  }

  const [formState, formAction, isSending] = useActionState(
    checkoutAction,
    null,
  );

  function handleFinish() {
    dispatch(modalActions.closeModal());
    dispatch(cartActions.clearCart());
    clearCartData();
  }

  console.log("Checkout Modal Open?", modalType === "checkout");
  console.log("Cart Items:", items);

  let actions = (
    <>
      {" "}
      <Button
        type="button"
        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        onClick={() => dispatch(modalActions.closeModal())}
      >
        {" "}
        Cancel{" "}
      </Button>{" "}
      <Button
        type="submit"
        className="bg-[#ffc404] px-4 py-2 rounded text-[#1f1a09] hover:bg-[#ffab04]"
      >
        {" "}
        Submit Order{" "}
      </Button>{" "}
    </>
  );
  if (isSending) {
    actions = <span className="text-gray-700">Sending order data...</span>;
  }
  if (data && !error) {
    return (
      <Modal
        open={modalType === "checkout"}
        onClose={() => dispatch(modalActions.closeModal())}
        customClasses="w-full max-w-lg p-6"
      >
        <h2 className="text-2xl font-bold mb-2 text-black">Success!</h2>
        <p className="text-black">Your order was submitted successfully.</p>
        <div className="flex justify-end mt-4 text-black">
          <Button onClick={handleFinish}>Okay</Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      open={modalType === "checkout"}
      onClose={() => dispatch(modalActions.closeModal())} // ✅ always function
      customClasses="w-full max-w-lg p-6"
    >
      <form action={formAction} className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Checkout</h2>
        <p>Total: {currencyFormatter.format(totalPrice)}</p>

        {inputs.map((input) => (
          <Input key={input.id} {...input} />
        ))}

        {error && <ErrorPage title="Failed to submit order" message={error} />}

        <div className="flex justify-end gap-2 mt-4">{actions}</div>
      </form>
    </Modal>
  );
};

export default Checkout;

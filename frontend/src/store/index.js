import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart-slice";
import modalReducer from "./modal-slice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    modal: modalReducer,
  },
});

export default store;

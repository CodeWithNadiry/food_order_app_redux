import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;

      const existingItem = state.items.find(item => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
    },

    removeItem(state, action) {
      const id = action.payload;

      const existingItem = state.items.find(item => item.id === id);
      const existingItemIndex = state.items.findIndex(item => item.id === id);
      if (!existingItem) return;

      if (existingItem.quantity === 1) {
        state.items.splice(existingItemIndex, 1);
      } else {
        existingItem.quantity -= 1;
      }
    },

    clearCart(state) {
      state.items = []; 
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
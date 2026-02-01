import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalType: '',
}
const modalSlice = createSlice({
  name: 'modalSlice',
  initialState,
  reducers: {
    openModal(state, action) {
      state.modalType = action.payload;
    },
    closeModal(state) {
      state.modalType = ''
    }
  }
})

export const modalActions = modalSlice.actions;
export default modalSlice.reducer;
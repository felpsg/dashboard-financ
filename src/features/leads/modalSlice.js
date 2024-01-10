import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    activeModal: null,
    initialData: null,
  },
  reducers: {
    openModal: (state, action) => {
      console.log("Payload recebido em openModal:", action.payload);
      console.log(
        "initialData recebido em openModal:",
        action.payload.initialData,
      );
      state.activeModal = action.payload.bodyType;
      state.initialData = action.payload.initialData;
    },

    closeModal: (state) => {
      console.log("Fechando modal");
      state.activeModal = null;
      state.initialData = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;

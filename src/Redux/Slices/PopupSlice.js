import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  message: "",
  type: "",
};
const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    setPopup: (state, { payload }) => {
      state.isOpen = payload.isOpen;
      state.message = payload.message;
      state.type = payload.type;
    },
    setClose: (state) => {
      state.isOpen = false;
    },
    emptyType: (state) => {
      state.type = "";
    },
  },
});

export const { setPopup, setClose, emptyType } = popupSlice.actions;
export default popupSlice.reducer;

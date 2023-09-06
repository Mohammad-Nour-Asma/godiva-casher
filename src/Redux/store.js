import { configureStore } from "@reduxjs/toolkit";
import PopupReducer from "./Slices/PopupSlice";

export const store = configureStore({
  reducer: {
    popup: PopupReducer,
  },
});

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setClose } from "../Redux/Slices/PopupSlice";
import { Alert, Snackbar } from "@mui/material";

const Popup = () => {
  const popup = useSelector((state) => state.popup);
  const dispatch = useDispatch();
  console.log(popup);
  const handleClose = () => {
    dispatch(setClose());
  };
  return (
    <Snackbar
      open={popup.isOpen}
      autoHideDuration={60000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
        {popup.message}
      </Alert>
    </Snackbar>
  );
};

export default Popup;

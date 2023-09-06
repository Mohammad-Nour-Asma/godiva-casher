import {
  Alert,
  Box,
  Button,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import OrderItem from "./OrderItem";
import { request } from "../api/request";
import { useNavigate } from "react-router";
import CubeLoader from "./CubeLoader/CubeLoader";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import Loader from "./Loader/loader";
const OrderCard = ({ orderData, type, handlesub }) => {
  console.log(orderData);
  const [isLoading, setIsLoading] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const acceptOrder = () => {
    setIsLoading(true);
    request({
      url: `/accept_order/${orderData.id}`,
      method: "PATCH",
    })
      .then((res) => {
        setIsLoading(false);
        handlesub();
        console.log(res);
      })
      .catch((err) => {
        setIsLoading(false);
        setErrorMessage(err?.response?.data?.message);
        setSnackbarOpen(true);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  console.log(orderData.created_at);

  const date = new Date(orderData.created_at);
  console.log(date);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <Box
        className={`order-card ${orderData.isNew && "animated-rgb"}`}
        sx={{
          borderRadius: "8px",
          // height : '100%',
          position: "relative",
          cursor: "pointer",
          padding: orderData.isNew ? "4px" : "0px",
        }}
        onClick={() => setIsCardOpen(!isCardOpen)}
      >
        <IconButton
          sx={{
            position: "absolute",
            left: "50%",
            bottom: "-12.5px",
            transform: "translateX(-50%)",
            backgroundColor: "#4E4E4E",
            width: "25px",
            height: "25px",
            zIndex: "2",
            "&:hover": {
              backgroundColor: "#3E3E3E",
            },
          }}
          onClick={() => setIsCardOpen(!isCardOpen)}
        >
          <KeyboardArrowUp
            sx={{
              color: "white",
              transition: "0.5s",
              transform: !isCardOpen ? "rotate(0.5turn)" : "0",
            }}
          />
        </IconButton>
        <Box
          className="order-card-header"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 15px",
            backgroundColor:
              type === "waiting" && orderData.isNew
                ? "#16a34a"
                : type === "waiting"
                ? "#BCBCBC"
                : type === "ongoing"
                ? "#FFDD83"
                : "#ffde83d1",
            flexWrap: "wrap",
            borderRadius: "8px 8px 0px 0px",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: { xs: "25px" },
              }}
            >
              Order ID : <b>{orderData?.id}</b>
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "13px" },
              }}
            >
              date :{" "}
              <b>{date == "Invalid Date" ? "Now" : date.toLocaleString()}</b>
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: { xs: "20px" },
              }}
            >
              table : <b>{orderData?.relationship?.table?.table_number}</b>
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "20px" },
              }}
            >
              total : {orderData?.total}SAR
            </Typography>
          </Box>
        </Box>

        <Box
          className="order-card-body"
          sx={{
            backgroundColor: "#fff",
            // height : '100%',
            transition: "max-height 0.5s",
            maxHeight: !isCardOpen ? "0px" : "1000px",
            overflow: "hidden",
            borderRadius: "0px 0px 8px 8px",
          }}
        >
          {orderData?.relationship?.order_items?.map((orderItemCard) => (
            <OrderItem key={orderItemCard.id} orderItemData={orderItemCard} />
          ))}
          {type === "waiting" && (
            <Box
              sx={{
                marginTop: "10px",
                padding: "10px 10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Button
                sx={{
                  textTransform: "capitalize",
                  fontSize: "20px",
                  border: "1px solid #008334",
                  padding: "6px 25px",
                }}
                color="success"
                onClick={acceptOrder}
              >
                accept
              </Button>
            </Box>
          )}
        </Box>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default OrderCard;

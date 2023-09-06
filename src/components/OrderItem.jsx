import { Box, Typography } from "@mui/material";
import React from "react";
import GridItem from "./GridItem";
import GridBox from "./GridBox";
import { SubdirectoryArrowRight } from "@mui/icons-material";
import { BsArrowReturnRight } from "react-icons/bs";

const OrderItem = ({ orderItemData }) => {
  return (
    <Box
      sx={{
        padding: "20px 15px",
        position: "relative",
        "&::after": {
          content: '""',
          position: "absolute",
          width: "100%",
          height: "0.5px",
          left: "0",
          bottom: "0.5px",
          backgroundColor: "rgba(0,0,0,.29)",
        },
      }}
    >
      <GridBox spacing={1}>
        <GridItem xs={12} sm={6}>
          <Typography
            sx={{
              fontWeight: "400",
              fontSize: "20px",
            }}
          >
            {orderItemData?.relationships?.meal?.name}
          </Typography>
        </GridItem>
        <GridItem xs={12} sm={2}>
          <Typography
            sx={{
              fontSize: "20px",
              whiteSpace: "nowrap",
            }}
          >
            Qty : {orderItemData?.quantity}
          </Typography>
        </GridItem>
        <GridItem xs={12} sm={4}>
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: "600",
              textAlign: { xs: "start", sm: "end" },
            }}
          >
            {orderItemData?.total}SAR
          </Typography>
        </GridItem>
      </GridBox>
      {orderItemData?.note && (
        <Box
          sx={{
            display: "flex",
            gap: "5px",
            alignItems: "center",
          }}
        >
          <BsArrowReturnRight
            style={{
              display: "inline-block",

              margin: "0.1rem",
            }}
          />
          <Typography variant="h6" color={"#ef4444"} whiteSpace={"nowrap"}>
            Note :
          </Typography>
          <Typography>{orderItemData?.note}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default OrderItem;

import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import OrderCard from "../components/OrderCard";
import GridBox from "../components/GridBox";
import GridItem from "../components/GridItem";
import { request } from "../api/request";
import Loader from "../components/Loader/loader";
import Pusher from "pusher-js";
import CubeLoader from "../components/CubeLoader/CubeLoader";
import PastOrderCard from "../components/PastOrderCard";
import { useDispatch } from "react-redux";
import { setPopup } from "../Redux/Slices/PopupSlice";

const ReadyOrders = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    setIsLoading(true);
    request({
      url: "/past-orders",
      method: "GET",
    })
      .then((res) => {
        setIsLoading(false);
        let reverseArray = res?.data?.data;
        setData([...reverseArray].reverse());
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
        setError(err?.response?.data?.message);
      });

    const pusher = new Pusher("cce618d86adfad61ca7c", {
      cluster: "mt1",
    });

    const channel = pusher.subscribe("PastOrders");

    channel.bind("past-order-added", (data) => {
      data.order[0].isNew = true;

      setData((prev) => {
        const newData = [...prev];

        const orderIndex = newData.findIndex((o) => o.id === data.order[0].id);

        if (orderIndex !== -1) {
          newData.splice(orderIndex, 1);
        }

        return [...newData, ...data.order];
      });
    });

    return () => {
      channel.unbind();
      pusher.disconnect();
    };
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return (
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "30px",
          color: "#D0B05C",
        }}
      >
        {error}
      </Typography>
    );
  }
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#232323",
        padding: "20px 10px",
        minHeight: "calc(100vh - 180px)",
      }}
    >
      <GridBox spacing={2}>
        {!isError && (
          <>
            {data?.length === 0 ? (
              <Typography
                sx={{
                  color: "#D0B05C",
                  textAlign: "center",
                  width: "100%",
                  fontSize: "30px",
                  textTransform: "capitalize",
                }}
              >
                no past orders until now
              </Typography>
            ) : (
              data?.map((orderCard) => (
                <GridItem
                  sx={{ height: "100%" }}
                  key={orderCard.order_id}
                  xs={12}
                  md={6}
                >
                  <PastOrderCard type={"ready"} orderData={orderCard} />
                </GridItem>
              ))
            )}
          </>
        )}
      </GridBox>
    </Box>
  );
};

export default ReadyOrders;

import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import OrderCard from "../components/OrderCard";
import GridBox from "../components/GridBox";
import GridItem from "../components/GridItem";
import { request } from "../api/request";

import Pusher from "pusher-js";
import CubeLoader from "../components/CubeLoader/CubeLoader";
import { useDispatch } from "react-redux";
import { setPopup } from "../Redux/Slices/PopupSlice";
import Loader from "../components/Loader/loader";

const NewOrders = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  function handlesub() {
    fetchData();
  }

  const fetchData = () => {
    setIsLoading(true);
    request({
      url: "/orders?state=0",
    })
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        let reverseArray = res?.data?.data;
        setData([...reverseArray].reverse());
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setIsError(true);
        if (err.response.status !== 401) {
          fetchData();
        }
        setError(err?.response?.data?.message);
      });
  };
  useEffect(() => {
    fetchData();
    const pusher = new Pusher("cce618d86adfad61ca7c", {
      cluster: "mt1",
    });

    const channel = pusher.subscribe("WaitingOrder");

    channel.bind("one-order-waiting-added", (data) => {
      data.order[0].isNew = true;

      setData((prev) => [...data.order, ...prev]);
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
                no waiting orders until now
              </Typography>
            ) : (
              data?.map((orderCard) => (
                <GridItem key={orderCard.id} xs={12} md={6}>
                  <OrderCard
                    type={"waiting"}
                    orderData={orderCard}
                    handlesub={handlesub}
                  />
                </GridItem>
              ))
            )}
          </>
        )}
      </GridBox>
    </Box>
  );
};

export default NewOrders;

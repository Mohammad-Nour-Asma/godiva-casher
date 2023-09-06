import { Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import "./App.css";
import NewOrders from "./pages/NewOrders";
import OnGoingOrders from "./pages/OnGoingOrders";
import ReadyOrders from "./pages/ReadyOrders";
import { useJawadAuthController } from "./context";
import "./components/Animation.css";
import Popup from "./components/Popup";
import { useDispatch } from "react-redux";
import { setPopup } from "./Redux/Slices/PopupSlice";

import Pusher from "pusher-js";

const CheckAuth = () => {
  const [controller, dispatch1] = useJawadAuthController();

  console.log(controller);
  const navigate = useNavigate();
  useEffect(() => {
    if (!controller.isAuth) {
      navigate("/auth/login");
    } else {
      navigate("/newOrders");
    }
  });
};

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const pusher = new Pusher("cce618d86adfad61ca7c", {
      cluster: "mt1",
    });

    const channel = pusher.subscribe("onGoingOrders");

    channel.bind("one-order-start-preparing", (data) => {
      console.log("new data from app");
      dispatch(
        setPopup({
          isOpen: true,
          message: "There is New Ongoing Order",
          type: "ongoing",
        })
      );
    });

    return () => {
      channel.unbind();
      pusher.disconnect();
    };
  }, []);

  useEffect(() => {
    const pusher = new Pusher("cce618d86adfad61ca7c", {
      cluster: "mt1",
    });

    const channel = pusher.subscribe("PastOrders");

    channel.bind("past-order-added", (data) => {
      dispatch(
        setPopup({
          isOpen: true,
          message: "There are order become ready",
          type: "ready",
        })
      );
    });

    return () => {
      channel.unbind();
      pusher.disconnect();
    };
  }, []);

  useEffect(() => {
    const pusher = new Pusher("cce618d86adfad61ca7c", {
      cluster: "mt1",
    });

    const channel = pusher.subscribe("WaitingOrder");

    channel.bind("one-order-waiting-added", (data) => {
      dispatch(
        setPopup({
          isOpen: true,
          message: "There is New Waiting Order",
          type: "new",
        })
      );
    });

    return () => {
      channel.unbind();
      pusher.disconnect();
    };
  }, []);

  const location = useLocation();
  return (
    <Box>
      <Box>
        {!location.pathname.includes("auth") && (
          <>
            <Header />
            <Navbar />
          </>
        )}
      </Box>
      <Routes>
        <Route path="/" element={<CheckAuth />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/newOrders" element={<NewOrders />} />
        <Route path="/onGoingOrders" element={<OnGoingOrders />} />
        <Route path="/pastOrders" element={<ReadyOrders />} />
      </Routes>
      <Popup />
    </Box>
  );
};

export default App;

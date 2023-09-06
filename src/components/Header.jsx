import { Sort } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { logout, useJawadAuthController } from "../context";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const Header = () => {
  const [, dispath] = useJawadAuthController();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "100%",
        height: "90px",
        display: "flex",
        alignItems: "center",
        padding: { xs: "0 0", sm: "0 10px", md: "0 20px" },
        backgroundColor: "#343232",
      }}
    >
      <Sort
        fontSize="large"
        sx={{
          color: "#D0B05C",
        }}
      />

      <Typography
        sx={{
          textAlign: "center",
          fontSize: { xs: "28px", sm: "32px", md: "36px" },
          textTransform: "capitalize",
          width: "100%",
          color: "white",
          fontWeight: "500",
        }}
      >
        our orders
      </Typography>
      <Button
        color="error"
        onClick={() => {
          logout(dispath);
          navigate("/auth/login");
        }}
      >
        logout
      </Button>
    </Box>
  );
};

export default Header;

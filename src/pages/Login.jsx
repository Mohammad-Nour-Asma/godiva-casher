import {
  Alert,
  Box,
  Button,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LoginImage from "../assets/fork_1046857 1.png";
import Form from "../components/Form";
import { Formik } from "formik";
import * as yup from "yup";
import { AccountCircle, LockRounded } from "@mui/icons-material";
import BackgroundLogin from "../assets/60e5cb13ad04234936260744-optimized 3.png";
import { request } from "../api/request";
import { login, useJawadAuthController } from "../context";
import { useNavigate } from "react-router";
import CubeLoader from "../components/CubeLoader/CubeLoader";
import Loader from "../components/Loader/loader";

const Login = () => {
  const [cotroller, dispatch] = useJawadAuthController();
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  const LoginHandler = (values) => {
    setIsLoading(true);
    request({
      url: "/login",
      method: "POST",
      data: values,
    })
      .then((res) => {
        setIsLoading(false);
        login(dispatch, {
          token: res.data.token,
          user: res.data.user,
        });
        navigate("/newOrders");
        console.log(res);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
        setError(err?.response?.data?.message);
        setErrorMessage(err?.response?.data?.message);
        setSnackbarOpen(true);
        console.log(err);
      });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#fff",
          minHeight: "100vh",
          height: "100%",
        }}
      >
        <Box>
          <Box
            sx={{
              width: "80px",
              height: "400px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              // backgroundColor : 'white',
              overflow: "hidden",
            }}
          >
            <img
              src={LoginImage}
              alt="login"
              style={{
                maxWidth: "100%",
              }}
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "-50px",
            }}
          >
            <Box
              sx={{
                width: { xs: "80%", sm: "70%", md: "60%", lg: "50%" },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  width: " 100%",
                  backgroundColor: "#F5F5F5",
                }}
              >
                <Typography
                  sx={{
                    padding: "15px",
                    fontSize: { xs: "25px", sm: "27px", md: "30px" },
                    textTransform: "capitalize",
                    background: "linear-gradient(#D0B05C, #77481D)",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textAlign: "center",
                    fontWeight: "700",
                    letterSpacing: "1px",
                  }}
                >
                  casher login
                </Typography>
                {isError && (
                  <Typography variant="h6" color={"error"} textAlign={"center"}>
                    {error}
                  </Typography>
                )}
              </Box>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={LoginHandler}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                }) => (
                  <form
                    onSubmit={handleSubmit}
                    style={{
                      width: "100%",
                    }}
                  >
                    <Form>
                      <Box
                        sx={{
                          gridColumn: "span 4",
                          display: "flex",
                          alignItems: "flex-end",
                          padding: "10px",
                        }}
                      >
                        <AccountCircle
                          sx={{ color: "#D0B05C", mr: 1, my: 0.5 }}
                        />
                        <TextField
                          label="Email"
                          variant="standard"
                          type="email"
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.email}
                          name="email"
                          error={!!touched.email && !!errors.email}
                        />
                      </Box>
                      <Box
                        sx={{
                          gridColumn: "span 4",
                          display: "flex",
                          alignItems: "flex-end",
                          padding: "10px",
                        }}
                      >
                        <LockRounded
                          sx={{ color: "#D0B05C", mr: 1, my: 0.5 }}
                        />
                        <TextField
                          label="Password"
                          variant="standard"
                          type="password"
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.password}
                          name="password"
                          error={!!touched.password && !!errors.password}
                          sx={{
                            color: "#232323",
                          }}
                        />
                      </Box>
                      <Button
                        fullWidth
                        sx={{
                          textTransform: "capitalize",
                          color: "white",
                          gridColumn: "span 4",
                          marginTop: "15px",
                          backgroundImage:
                            "linear-gradient(220deg ,#D0B05C , #FFDD83)",
                          padding: "15px",
                          borderRadius: "12px",
                        }}
                        type="submit"
                      >
                        Login
                      </Button>
                    </Form>
                  </form>
                )}
              </Formik>
            </Box>
          </Box>
        </Box>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Login;

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = yup.object({
  email: yup.string().email().required("email field is required"),
  password: yup.string().min(7).required("password field is required"),
});

import React from "react";
import { useForm } from "react-hook-form";
import LoginAuth from "./API/loginAPI";
import { Button, TextField } from "@mui/material";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import Loading from "../utils/loader2";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: "white",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "gray",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "blue",
            borderWidth: 2,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "white",
          "&.Mui-focused": {
            color: "blue",
          },
          "&.Mui-error": {
            color: "red",
          },
        },
      },
    },
  },
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { submitData, isSubmitting } = LoginAuth();

  useEffect(() => {
    Aos.init({
      duration: 500,
      easing: "ease-out",
      once: true,
    });
  }, []);

  return (
    <div className="flex items-center justify-center w-screen min-h-screen overflow-hidden text-white bg-gradient-to-br from-gray-900 via-gray-800 to-black md:bg-gray-300">
      <div
        className="w-full max-w-md p-10 mx-4 rounded-md shadow-2xl bg-black/30 backdrop-blur-sm md:mx-auto shadow-black/50 "
        data-aos="fade-down"
      >
        <form onSubmit={handleSubmit(submitData)}>
          <div className="flex justify-center">
            <img
              src="/images/KCERA.png"
              alt=""
              className="mx-auto min-h-15 max-h-20"
            />
          </div>
          <h2 className="mb-2 font-bold text-center text-white uppercase text-base/10">
            Login your Account
          </h2>
          <div className="flex flex-col gap-4">
            <ThemeProvider theme={theme}>
              <TextField
                {...register("email", { required: "Email is required" })}
                variant="outlined"
                type="email"
                fullWidth
                label="Email"
                size="small"
              />
              {errors.email && (
                <p className="text-red-700">{errors.email.message}</p>
              )}
              <TextField
                {...register("password", { required: "Password is required" })}
                variant="outlined"
                type="password"
                fullWidth
                label="Password"
                size="small"
              />
              {errors.password && (
                <p className="text-red-700">{errors.password.message}</p>
              )}
            </ThemeProvider>

            <Button type="submit" variant="contained" size="small" fullWidth>
              {isSubmitting ? "logging in" : "Login"}
            </Button>

            <p className="text-center">
              Don't have an account?{" "}
              <a href="./Registration" className="text-sky-500">
                Register
              </a>
            </p>
          </div>
        </form>
      </div>
      {isSubmitting ? <Loading /> : ""}
    </div>
  );
};

export default Login;

import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Login } from "../Services/apis";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../App";
import Loader from "../Components/Loader";

const validationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
});

const LoginPage = () => {
  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setShowLoader(true);
        const response = await Login({
          email: values.email.trim(),
          password: values.password,
        });
        toast.success("Login Successfull");
        setUser(response.data.data);
        localStorage.setItem("userData", JSON.stringify(response.data.data));
        navigate("/");
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            error.message ||
            "Something went wrong. Please try again.",
        );
      } finally {
        setShowLoader(false);
      }
    },
  });

  return (
    <>
      <div className="mt-4 grow flex items-center justify-around">
        <div className="mb-12 w-full max-w-lg px-4">
          <h1 className="text-4xl text-center mb-4 font-semibold">Login</h1>
          <form className="w-full" onSubmit={formik.handleSubmit} noValidate>
            <input
              type="email"
              placeholder="your@email.com"
              autoComplete="username"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm ml-1 mb-2">
                {formik.errors.email}
              </p>
            )}

            <input
              type="password"
              placeholder="password"
              autoComplete="current-password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm ml-1 mb-2">
                {formik.errors.password}
              </p>
            )}

            <button
              type="submit"
              className="primary mt-1"
              disabled={showLoader}
            >
              Login
            </button>
            <div className="text-center text-gray-500 py-2">
              Don't have an account yet?{" "}
              <Link to={"/register"} className="underline text-black">
                Register now
              </Link>
            </div>
          </form>
        </div>
        {showLoader && <Loader />}
      </div>
    </>
  );
};

export default LoginPage;

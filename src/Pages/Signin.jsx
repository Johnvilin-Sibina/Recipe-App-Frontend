import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Signin.css";
import OAuth from "../Components/OAuth";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../Redux/Slice/userSlice";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //Formik validation schema to validate the form
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email cannot be empty")
      .matches(
        /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/,
        "Invalid Email Format"
      ),
    password: Yup.string()
      .required("Password cannot be empty")
      .matches(
        /^[a-zA-Z0-9!@#$%^&*]{6,16}$/,
        "Password should range between 6 and 16 characters and should contain at least one number and one special character"
      ),
  });

  const formik = useFormik({
    initialValues: formData,
    validationSchema: validationSchema,

    //Function to login
    onSubmit: async (values) => {
      try {
        dispatch(signInStart());
        await axios
          .post("http://localhost:5000/api/auth/login-user", values)
          .then((res) => {
            setFormData(res.data);
            localStorage.setItem("Token", res.data.token);
            dispatch(signInSuccess(res.data.rest));
            navigate("/");
          });
      } catch (error) {
        console.log(error.message);
        dispatch(signInFailure());
      }
    },
  });

  return (
    <div className="signin-container d-flex justify-content-center align-items-center p-5">
      <div className="signin-card card p-4 shadow-lg">
        {/* Logo and Title */}
        <div className="text-center">
          <img src="./logo.png" alt="TastyTrove Logo" className="signin-logo" />
          <h3 className="signin-title">Welcome Back!</h3>
        </div>

        {/* Sign-in Form */}
        <form className="mt-3" onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="Enter your email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <p className="mb-3 text-danger">{formik.errors.email}</p>
          )}

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="Enter your password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </div>
          {formik.touched.password && formik.errors.password && (
            <p className="mb-3 text-danger">{formik.errors.password}</p>
          )}
          <button type="submit" className="btn signin-btn w-100">
            Sign In
          </button>
        </form>

        {/* Forgot Password Link */}
        <div className="text-center mt-2">
          <Link to="/forgotpassword" className="forgot-password-link">
            Forgot Password?
          </Link>
        </div>

        {/* OR Divider */}
        <div className="text-center my-3">— OR —</div>

        {/* Google Sign-in Button */}
        <OAuth />

        {/* No account? */}
        <div className="text-center mt-3">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="signup-link">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;

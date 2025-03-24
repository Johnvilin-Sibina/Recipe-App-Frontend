import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/ForgotPassword.css";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });

  // Validation schema for email input using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email cannot be empty")
      .matches(
        /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/,
        "Invalid Email Format"
      ),
  });

  const formik = useFormik({
    initialValues: formData,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true); // Set loading state to true before making API call
        await axios
          .post("https://recipe-app-backend-nz2n.onrender.com/api/auth/forgot-password", values)
          .then((res) => {
            setFormData(res.data);
            toast.success(res.data.message);
            navigate("/");
          });
        setLoading(false); // Reset loading state after request completion
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return (
    <div className="forgot-container d-flex justify-content-center align-items-center p-5">
      <div className="forgot-card card p-4 shadow-lg">
        {/* Logo and Title */}
        <div className="text-center">
          <img src="./logo.png" alt="TastyTrove Logo" className="forgot-logo" />
          <h3 className="forgot-title">Forgot Password</h3>
          <p className="forgot-subtitle">
            Enter your email, and we'll send you a link to reset your password.
          </p>
        </div>

        {/* Forgot Password Form */}
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
          <button
            type="submit"
            className="btn forgot-btn w-100"
            disabled={loading}
          >
            {loading ? "Loading..." : " Send Reset Link"}
          </button>
        </form>

        {/* Back to Sign-in */}
        <div className="text-center mt-3">
          <Link to="/signin" className="signin-link">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

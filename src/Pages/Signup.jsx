import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Signup.css";
import OAuth from "../Components/OAuth";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .required("Username cannot be empty")
      .matches(
        /^[a-zA-Z0-9_\.]+$/,
        "Usernames can only contain uppercase or lowercase letters(A-Z or a-z), numbers, dot(.), underscore(_)"
      ),
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

  // Formik setup for form handling
  const formik = useFormik({
    initialValues: formData,
    validationSchema: validationSchema,

    // Function to handle form submission
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await axios
          .post("https://recipe-app-backend-nz2n.onrender.com/api/auth/register-user", values)
          .then((res) => {
            setFormData(res.data);
            navigate("/signin");
          });
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return (
    <div className="signup-container d-flex justify-content-center align-items-center p-5">
      <div className="signup-card card p-4 shadow-lg">
        {/* Logo and Title */}
        <div className="text-center">
          <img src="./logo.png" alt="TastyTrove Logo" className="signup-logo" />
          <h3 className="signup-title">Create an Account</h3>
        </div>

        {/* Signup Form */}
        <form className="mt-3" onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label className="form-label">User Name</label>
            <input
              id="userName"
              type="text"
              className="form-control"
              placeholder="Enter your username"
              onChange={formik.handleChange}
              value={formik.values.userName}
            />
          </div>
          {formik.touched.userName && formik.errors.userName && (
            <p className="mb-3 text-danger">{formik.errors.userName}</p>
          )}
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
          <button
            type="submit"
            className="btn signup-btn w-100"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>

        {/* OR Divider */}
        <div className="text-center my-3">— OR —</div>

        {/* Google Sign-Up Button */}
        <OAuth />

        {/* Already have an account? */}
        <div className="text-center mt-3">
          <p>
            Already have an account?{" "}
            <Link to="/signin" className="signin-link">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

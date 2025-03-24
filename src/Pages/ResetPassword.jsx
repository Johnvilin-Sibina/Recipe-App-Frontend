import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../CSS/ResetPassword.css";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { id, token } = useParams(); // Extracting user ID and reset token from URL parameters
  const [loading, setLoading] = useState(false); // State to handle loading state

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  // Validation schema for password input fields using Yup
  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required("New Password cannot be empty")
      .matches(
        /^[a-zA-Z0-9!@#$%^&*]{6,16}$/,
        "Password should range between 6 and 16 characters and should contain at least one number and one special character"
      ),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Confirm Password cannot be empty"),
  });

  const formik = useFormik({
    initialValues: formData,
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      try {
        setLoading(true); // Set loading state to true before making API call
        await axios
          .put(
            `https://recipe-app-backend-nz2n.onrender.com/api/auth/reset-password/${id}/${token}`,
            values
          )
          .then((res) => {
            setFormData(res.data);
            toast.success(res.data.message);
            navigate("/signin");
          });
        setLoading(false); // Reset loading state after request completion
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return (
    <div className="reset-container d-flex justify-content-center align-items-center p-5">
      <div className="reset-card card p-4 shadow-lg">
        {/* Logo and Title */}
        <div className="text-center">
          <img src="./logo.png" alt="TastyTrove Logo" className="reset-logo" />
          <h3 className="reset-title">Reset Password</h3>
          <p className="reset-subtitle">
            Enter a new password for your account.
          </p>
        </div>

        {/* Reset Password Form */}
        <form className="mt-3" onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              id="newPassword"
              type="password"
              className="form-control"
              placeholder="Enter new password"
              onChange={formik.handleChange}
              value={formik.values.newPassword}
            />
          </div>
          {formik.touched.newPassword && formik.errors.newPassword && (
            <p className="mb-3 text-danger">{formik.errors.newPassword}</p>
          )}
          <p className="mb-3 text-danger">{formik.errors.newPassword}</p>
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              id="confirmNewPassword"
              type="password"
              className="form-control"
              placeholder="Confirm new password"
              onChange={formik.handleChange}
              value={formik.values.confirmNewPassword}
            />
          </div>
          {formik.touched.confirmNewPassword &&
            formik.errors.confirmNewPassword && (
              <p className="mb-3 text-danger">
                {formik.errors.confirmNewPassword}
              </p>
            )}

          <button
            type="submit"
            className="btn reset-btn w-100"
            disabled={loading}
          >
            {loading ? "Loading..." : "Reset Password"}
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

export default ResetPassword;

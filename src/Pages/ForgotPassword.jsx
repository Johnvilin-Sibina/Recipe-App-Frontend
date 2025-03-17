import React from "react";
import { Link } from "react-router-dom";
import "../CSS/ForgotPassword.css"; 
const ForgotPassword = () => {
  return (
    <div className="forgot-container d-flex justify-content-center align-items-center vh-100">
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
        <form className="mt-3">
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-control" placeholder="Enter your email" />
          </div>
          <button type="submit" className="btn forgot-btn w-100">
            Send Reset Link
          </button>
        </form>

        {/* Back to Sign-in */}
        <div className="text-center mt-3">
          <Link to="/signin" className="signin-link">Back to Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

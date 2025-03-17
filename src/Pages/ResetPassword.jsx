import React from "react";
import { Link } from "react-router-dom";
import "../CSS/ResetPassword.css"; 

const ResetPassword = () => {
  return (
    <div className="reset-container d-flex justify-content-center align-items-center vh-100">
      <div className="reset-card card p-4 shadow-lg">
        {/* Logo and Title */}
        <div className="text-center">
          <img src="./logo.png" alt="TastyTrove Logo" className="reset-logo" />
          <h3 className="reset-title">Reset Password</h3>
          <p className="reset-subtitle">Enter a new password for your account.</p>
        </div>

        {/* Reset Password Form */}
        <form className="mt-3">
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter new password"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm new password"
            />
          </div>

          <button type="submit" className="btn reset-btn w-100">
            Reset Password
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

export default ResetPassword;

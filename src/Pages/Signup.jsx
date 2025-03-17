import React from "react";
import { Link } from "react-router-dom";
import "../CSS/Signup.css";

const Signup = () => {
  return (
    <div className="signup-container d-flex justify-content-center align-items-center vh-100">
      <div className="signup-card card p-4 shadow-lg">
        {/* Logo and Title */}
        <div className="text-center">
          <img src="./logo.png" alt="TastyTrove Logo" className="signup-logo" />
          <h3 className="signup-title">Create an Account</h3>
        </div>

        {/* Signup Form */}
        <form className="mt-3">
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" placeholder="Enter your name" />
          </div>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-control" placeholder="Enter your email" />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" placeholder="Enter your password" />
          </div>
          <button type="submit" className="btn signup-btn w-100">
            Sign Up
          </button>
        </form>

        {/* OR Divider */}
        <div className="text-center my-3">— OR —</div>

        {/* Google Sign-Up Button */}
        <div className="text-center">
          <button className="btn google-btn w-100">
            <i className="bi bi-google"></i> Sign Up with Google
          </button>
        </div>

        {/* Already have an account? */}
        <div className="text-center mt-3">
          <p>
            Already have an account? <Link to="/signin" className="signin-link">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

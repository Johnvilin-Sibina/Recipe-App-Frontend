import React from "react";
import { Link } from "react-router-dom";
import "../CSS/Signin.css";

const Signin = () => {
  return (
    <div className="signin-container d-flex justify-content-center align-items-center vh-100">
      <div className="signin-card card p-4 shadow-lg">
        {/* Logo and Title */}
        <div className="text-center">
          <img src="./logo.png" alt="TastyTrove Logo" className="signin-logo" />
          <h3 className="signin-title">Welcome Back!</h3>
        </div>

        {/* Sign-in Form */}
        <form className="mt-3">
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-control" placeholder="Enter your email" />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" placeholder="Enter your password" />
          </div>
          <button type="submit" className="btn signin-btn w-100">
            Sign In
          </button>
        </form>

        {/* Forgot Password Link */}
        <div className="text-center mt-2">
          <Link to="/forgotpassword" className="forgot-password-link">Forgot Password?</Link>
        </div>

        {/* OR Divider */}
        <div className="text-center my-3">— OR —</div>

        {/* Google Sign-in Button */}
        <div className="text-center">
          <button className="btn google-btn w-100">
            <i className="bi bi-google"></i> Sign In with Google
          </button>
        </div>

        {/* No account? */}
        <div className="text-center mt-3">
          <p>
            Don't have an account? <Link to="/signup" className="signup-link">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;

import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light shadow-sm pb-3">
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand fw-bold d-flex align-items-center">
          <img src="./logo.png" alt="TastyTrove Logo" width="40" height="40" className="me-2" />
          TastyTrove
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to='/' >Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" >Recipes</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/addrecipe'>Add Recipe</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link">Profile</Link>
            </li>
          </ul>

          {/* Authentication Buttons */}
          <Link className="btn btn-outline-primary ms-3" to='/signin'>
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

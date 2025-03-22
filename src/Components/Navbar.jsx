import React from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";

const Navbar = ({ searchQuery, setSearchQuery }) => { 
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();


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
          {location.pathname === "/recipes" && (
            <form className="mx-auto w-50">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <FaSearch />
                </span>
                <input
                  className="form-control border-start-0"
                  type="search"
                  placeholder="Search recipes..."
                  aria-label="Search"
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value.toLowerCase())} 
                />
              </div>
            </form>
          )}

          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/recipes">Recipes</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/addrecipe">Add Recipe</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={currentUser?.rest._id && `/profile/${currentUser.rest._id}`}>Profile</NavLink>
            </li>
          </ul>

          {/* Authentication Buttons */}
          <Link className="btn btn-outline-primary ms-3" to="/signin">
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

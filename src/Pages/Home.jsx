import React from "react";
import { Link } from "react-router-dom";
import '../CSS/Home.css'

const Home = () => {
  return (
    <div className="home-container d-flex flex-column justify-content-center align-items-center text-center">
      {/* Logo */}
      <img src="./logo.png" alt="TastyTrove Logo" className="home-logo" />

      {/* Title & Description */}
      <h1 className="fw-bold title">
        Welcome to <span className="brand-name">TastyTrove</span>
      </h1>
      <p className="lead description">
        Discover, Share, and Enjoy Delicious Recipes with the World!
      </p>

      {/* Buttons */}
      <div className="mt-4 gap-2 buttons">
        <Link to="/recipes" className="btn btn-primary explore-btn me-2">
          Explore Recipes
        </Link>
        <Link to="/signup" className="btn btn-warning join-btn me-2">
          Join Us
        </Link>
      </div>
    </div>
  );
};

export default Home;

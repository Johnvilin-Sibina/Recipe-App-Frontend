import React, { useEffect, useState } from "react";
import {
  FaUserEdit,
  FaShare,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import "../CSS/UserProfile.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { signOutSuccess } from "../Redux/Slice/userSlice";

const UserProfile = () => {
  const [sharedRecipes, setSharedRecipes] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);

  const fetchSharedRecipes = async () => {
    try {
      await axios
        .get(
          `http://localhost:5000/api/user/shared-recipes/${currentUser.rest._id}`,
          {
            headers: {
              token: localStorage.getItem("Token"),
            },
          }
        )
        .then((res) => {
          setSharedRecipes(res.data.sharedRecipes);
          console.log(res.data.sharedRecipes);
        });
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchSharedRecipes();
  }, [currentUser]);

  //Function to sign out
  const handleSignOut = () => {
    dispatch(signOutSuccess());
    localStorage.removeItem("Token");
    navigate("/signin");
  };

  return (
    <div className="profile-container">
      <div className="profile-card shadow-lg">
        {/* Profile Section */}
        <div className="profile-header text-center">
          <div className="profile-img-container">
            <img
              src={currentUser.rest.profilePicture}
              alt="Profile"
              className="profile-img"
            />
          </div>
          <h3 className="mt-3">{currentUser.rest.userName}</h3>
          <p>
            <FaEnvelope className="icon" /> {currentUser.rest.email}
          </p>
        </div>

        {/* Shared Recipes */}
        <div className="shared-section">
          <h5>
            <FaShare className="share-icon" size={27} /> Shared Recipes
          </h5>
          <ul className="shared-recipes">
            {sharedRecipes?.map((recipe, index) => (
              <li key={index}>{recipe.title}</li>
            ))}
          </ul>
        </div>

        {/* Settings Dropdown */}
        <div className="settings-section text-center d-flex justify-content-end border-top border-2 border-dark-subtle">
          <div className="dropdown mt-3">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FaCog /> Settings
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <a className="dropdown-item" onClick={()=>navigate(`/editprofile/${currentUser.rest._id}`)} >
                  <FaUserEdit /> Edit Profile
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item text-danger"
                  onClick={handleSignOut}
                >
                  <FaSignOutAlt /> Sign Out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

import React, { useEffect, useState } from "react";
import {
  FaUserEdit,
  FaShare,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
  FaTrash,
} from "react-icons/fa";
import "../CSS/UserProfile.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutSuccess,
} from "../Redux/Slice/userSlice";
import { toast } from "react-toastify";

const UserProfile = () => {
  const [sharedRecipes, setSharedRecipes] = useState([]);
  // State to handle the modal visibility for account deletion
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser, error, loading } = useSelector((state) => state.user);

  // Function to fetch shared recipes from the backend
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
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fetch shared recipes whenever the currentUser changes
  useEffect(() => {
    fetchSharedRecipes();
  }, [currentUser]);

  // Function to handle user sign-out
  const handleSignOut = () => {
    dispatch(signOutSuccess());
    localStorage.removeItem("Token");
    navigate("/signin");
  };

  //Function to delete user account
  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      await axios
        .delete(
          `http://localhost:5000/api/user/delete-user/${currentUser.rest._id}`,
          {
            headers: {
              token: localStorage.getItem("Token"),
            },
          }
        )
        .then((res) => {
          dispatch(deleteUserSuccess(res.data.message));
          toast.success(res.data.message);
        });
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  // Display error messages from Redux
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="profile-container">
      <div className="profile-card shadow-lg">
        {/* Profile Section */}
        <div className="profile-header text-center">
          <div className="profile-img-container">
            {currentUser ? (
              <img
                src={currentUser.rest.profilePicture}
                alt="Profile"
                className="profile-img"
              />
            ) : (
              <p>Loading...</p>
            )}
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
                <a
                  className="dropdown-item"
                  onClick={() =>
                    navigate(`/editprofile/${currentUser.rest._id}`)
                  }
                >
                  <FaUserEdit /> Edit Profile
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item text-warning"
                  onClick={handleSignOut}
                >
                  <FaSignOutAlt /> Sign Out
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item text-danger"
                  onClick={() => setShowModal(true)}
                >
                  <FaTrash />
                  Delete Account
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete your account?</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleDeleteAccount}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;

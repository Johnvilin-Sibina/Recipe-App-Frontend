import React, { useEffect } from "react";
import "../CSS/Signup.css";
import { FcGoogle } from "react-icons/fc";
import { app } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../Redux/Slice/userSlice";
import axios from "axios";
import { toast } from "react-toastify";

const OAuth = () => {
  // Initializing Firebase authentication
  const auth = getAuth(app);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.user);

  const handleSubmit = async () => {
    dispatch(signInStart());
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" }); // Forces account selection each time
    try {
      const result = await signInWithPopup(auth, provider); // Firebase authentication with Google
      const userData = {
        name: result.user.displayName,
        email: result.user.email,
        profilePic: result.user.photoURL,
      };

      // Sending user data to the backend for authentication
      await axios
        .post("https://recipe-app-backend-nz2n.onrender.com/api/auth/google", userData)
        .then((res) => {
          localStorage.setItem("Token", res.data.token);
          dispatch(signInSuccess(res.data));
          navigate("/recipes");
        });
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  // Display error messages from Redux
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="text-center">
      <button
        className="btn google-btn w-100 d-flex justify-content-center align-items-center"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          "Loading..."
        ) : (
          <>
            <FcGoogle size={20} />
            <i className="bi bi-google ms-2"></i> Continue with Google
          </>
        )}
      </button>
    </div>
  );
};

export default OAuth;

import React from 'react';
import "../CSS/Signup.css";
import { FcGoogle } from "react-icons/fc";
import { app } from "../firebase";
import { useDispatch } from 'react-redux';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../Redux/Slice/userSlice";
import axios from 'axios';

const OAuth = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();  
  const navigate = useNavigate();

  const handleSubmit = async () => {
    dispatch(signInStart())
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const result = await signInWithPopup(auth, provider);
      const userData = { 
        name: result.user.displayName,
        email: result.user.email,
        profilePic: result.user.photoURL,}
     await axios.post("http://localhost:5000/api/auth/google",userData)
     .then((res)=>{
      localStorage.setItem('Token',res.data.token)
        dispatch(signInSuccess(res.data));
        navigate("/");
     })
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

    return (
        <div className="text-center">
        <button className="btn google-btn w-100 d-flex justify-content-center align-items-center" onClick={handleSubmit}>
            <FcGoogle size={20} />
          <i className="bi bi-google ms-2"></i> Continue with Google
        </button>
      </div>
    );
};

export default OAuth;
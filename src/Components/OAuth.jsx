import React from 'react';
import "../CSS/Signup.css";
import { FcGoogle } from "react-icons/fc";

const OAuth = () => {
    return (
        <div className="text-center">
        <button className="btn google-btn w-100 d-flex justify-content-center align-items-center">
            <FcGoogle size={20} />
          <i className="bi bi-google ms-2"></i> Continue with Google
        </button>
      </div>
    );
};

export default OAuth;
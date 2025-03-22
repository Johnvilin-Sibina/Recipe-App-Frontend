import React, { useState } from "react";
import { FaUserEdit, FaEnvelope, FaLock, FaCamera } from "react-icons/fa";
import "../CSS/EditProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { updateFailure, updateStart, updateSuccess } from "../Redux/Slice/userSlice";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch() 
  const navigate = useNavigate()

    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);

  const [formData,setFormData] = useState({
    userName: currentUser.rest.userName,
    email: currentUser.rest.email,
    password: "",
    profilePicture: currentUser.rest.profilePicture
  });

  const validationSchema = Yup.object().shape({
    userName: Yup.string().matches(
      /^[a-zA-Z0-9_\.]+$/,
      "Usernames can only contain uppercase or lowercase letters(A-Z or a-z), numbers, dot(.), underscore(_)"
    ),
    email: Yup.string().matches(
      /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/,
      "Invalid Email Format"
    ),
    password: Yup.string()
      .matches(
        /^[a-zA-Z0-9!@#$%^&*]{6,16}$/,
        "Password should range between 6 and 16 characters and should contain at least one number and one special character"
      ),
  });


  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      setImageFileUploadError("Please select a valid image file.");
      return;
    }
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "TastyTrove");
    data.append("cloud_name", "dhke5mt23");
    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dhke5mt23/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const uploadResponse = await res.json();
      if (uploadResponse?.secure_url) {
        setImageFileUrl(uploadResponse.url);
        setFormData((prev) => ({
          ...prev,
          profilePicture: uploadResponse.secure_url,
        }));
      } else {
        setImageFileUploadError("Failed to upload image. Please try again");
      }
    } catch (error) {
      setImageFileUploadError(error);
    }
    setImageFileUploading(false);
  };


  const formik = useFormik({
    initialValues: formData,
    validationSchema: validationSchema,
     
    onSubmit: async(values)=>{
        dispatch(updateStart())
        const payload = {
            ...values,
            
                profilePicture:imageFileUrl ? imageFileUrl : currentUser.rest.profilePicture
        }
        try {
            console.log(payload)
           await axios.put(`http://localhost:5000/api/user/update-user/${currentUser.rest._id}`,payload,{
            headers:{
                'token':localStorage.getItem('Token')
            }
           })
           .then((res)=>{
            dispatch(updateSuccess(res.data.rest))
            navigate(`/profile/${currentUser.rest._id}`)
            console.log(res.data)
           })
        } catch (error) {
           console.log(error.message) 
           dispatch(updateFailure())
        }
    }
  })

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4 rounded w-50">
        <h2 className="text-center mb-4">Edit Profile</h2>

        
        {/* Edit Profile Form */}
        <form onSubmit={formik.handleSubmit}>

            {/* Profile Picture Upload */}
        <div className="text-center mb-3">
          <label htmlFor="profilePicture" className="profile-img-label">
            <img
              src={imageFileUrl ? imageFileUrl : currentUser.rest.profilePicture}
              alt="Profile"
              className="profile-img"
            />
            <FaCamera className="camera-icon" />
          </label>
          <input type="file" id="profilePicture" className="d-none" onChange={handleImageUpload} />
        </div>

          <div className="mb-3">
            <label className="form-label">Username</label>
            <div className="input-group">
              <span className="input-group-text">
                <FaUserEdit />
              </span>
              <input
              id="userName"
                type="text"
                className="form-control"
                value = {formik.values.userName}
                onChange = {formik.handleChange}
              />
            </div>
          </div>
          {formik.touched.userName && formik.errors.userName && (
              <div className="text-danger mb-3">{formik.errors.userName}</div>
            ) }

          <div className="mb-3">
            <label className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text">
                <FaEnvelope />
              </span>
              <input
              id="email"
                type="email"
                className="form-control"              
                value = {formik.values.email}
                onChange = {formik.handleChange}
              />
            </div>
          </div>

          {formik.touched.email && formik.errors.email && (
              <div className="text-danger mb-3">{formik.errors.email}</div>
            ) }

          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text">
                <FaLock />
              </span>
              <input
              id="password"
                type="password"
                className="form-control"
                placeholder="******"
                value = {formik.values.password}
                onChange = {formik.handleChange}
              />
            </div>
          </div>
          {formik.touched.password && formik.errors.password && (
              <div className="text-danger mb-3">{formik.errors.password}</div>
            ) }

          {/* Buttons */}
          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-outline-secondary"  onClick={()=>navigate(`/profile/${currentUser.rest._id}`)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;

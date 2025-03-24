import React, { useEffect, useState } from "react";
import "../CSS/AddRecipe.css";
import { useNavigate } from "react-router-dom";
import {
  addRecipeFailure,
  addRecipeStart,
  addRecipeSuccess,
} from "../Redux/Slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { toast } from "react-toastify";

const AddRecipe = () => {
  // Redux state management for user details
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State to store uploaded image URL
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);

  // Initial form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    cookingTime: "",
    ingredients: "",
    instructions: "",
  });

  // Function to handle image upload to Cloudinary
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    // Validate if a file is selected
    if (!file) {
      setImageFileUploadError("Please select a valid image file.");
      alert("Please select a valid image file.");
      return;
    }
    setImageFileUploading(true);
    setImageFileUploadError(null);

    // Create FormData object to send image to Cloudinary
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
    data.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);

    try {
      // Upload image to Cloudinary
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dhke5mt23/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const uploadResponse = await res.json();

      // Check if upload was successful
      if (uploadResponse?.secure_url) {
        setImageFileUrl(uploadResponse.url);
        setFormData((prev) => ({
          ...prev,
          image: uploadResponse.secure_url,
        }));
      } else {
        setImageFileUploadError("Failed to upload image. Please try again");
        alert("Failed to upload image. Please try again");
      }
    } catch (error) {
      setImageFileUploadError(error);
      alert("Failed to upload image: " + error.message);
    }
    setImageFileUploading(false);
  };

  // Define validation schema using Yup
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required("Title cannot be empty")
      .matches(
        /^[A-Za-z0-9 ]*$/,
        "Recipe title can only contain uppercase or lowercase letters and numbers"
      ),
    description: Yup.string()
      .required("Description cannot be empty")
      .matches(
        /^[a-zA-Z0-9 ,.-]+$/,
        "Description can only contain letters, numbers, hyphen(-), comma(,) and period(.)"
      ),
    cookingTime: Yup.string()
      .required("Cooking time cannot be empty")
      .matches(/^[0-9]+$/, "Cooking time can only contain numbers"),
    ingredients: Yup.string()
      .required("Ingredients cannot be empty")
      .matches(
        /^[a-zA-Z0-9 /,.-]+$/,
        "Ingredients can only contain letters, numbers, hyphen(-), comma(,), space(), forward slash(/), and period(.)"
      ),
    instructions: Yup.string()
      .required("Instructions cannot be empty")
      .matches(
        /^[a-zA-Z0-9 ,.-]+$/,
        "Instructions can only contain letters, numbers, hyphen(-), space( ), comma(,) and period(.)"
      ),
  });

  // Initialize formik for form validation and submission
  const formik = useFormik({
    initialValues: formData,
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      try {
        dispatch(addRecipeStart());

        // Format the payload to send to backend
        const payload = {
          ...values,
          ingredients: values.ingredients.split(", "), // Convert ingredients string to an array
          instructions: formik.values.instructions.split(". "), // Convert instructions string to an array
          user: currentUser.rest._id,
          image: imageFileUrl,
        };

        // Send data to the backend
        await axios
          .post("http://localhost:5000/api/recipe/add-recipe", payload, {
            headers: {
              token: localStorage.getItem("Token"), // Pass authentication token
            },
          })
          .then((res) => {
            setFormData(res.data);
            dispatch(addRecipeSuccess(res.data.recipe));
            toast.success(res.data.message);
            navigate("/recipes");
          });
      } catch (error) {
        dispatch(addRecipeFailure(error.message));
      }
    },
  });

  // Display error messages from Redux
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="add-recipe-container">
      <div className="form-wrapper">
        <h2 className="title">Add a New Recipe</h2>
        <form className="recipe-form" onSubmit={formik.handleSubmit}>
          {/* Recipe Title */}
          <div className="mb-3">
            <label className="form-label">Recipe Title</label>
            <input
              type="text"
              id="title"
              className="form-control"
              placeholder="Enter recipe title"
              required
              value={formik.values.title}
              onChange={formik.handleChange}
            />
          </div>
          {formik.touched.title && formik.errors.title && (
            <p className="mb-3 text-danger">{formik.errors.title}</p>
          )}

          {/* Description */}
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              id="description"
              className="form-control"
              rows="3"
              placeholder="Enter a short description"
              required
              value={formik.values.description}
              onChange={formik.handleChange}
            />
          </div>
          {formik.touched.description && formik.errors.description && (
            <p className="mb-3 text-danger">{formik.errors.description}</p>
          )}
          {/* Cooking Time */}
          <div className="mb-3">
            <label className="form-label">Cooking Time (in minutes)</label>
            <input
              type="number"
              id="cookingTime"
              className="form-control"
              placeholder="Enter cooking time"
              required
              value={formik.values.cookingTime}
              onChange={formik.handleChange}
            />
          </div>
          {formik.touched.cookingTime && formik.errors.cookingTime && (
            <p className="mb-3 text-danger">{formik.errors.cookingTime}</p>
          )}

          {/* Ingredients */}
          <div className="mb-3">
            <label className="form-label">Ingredients</label>
            <textarea
              id="ingredients"
              className="form-control"
              rows="3"
              placeholder="List ingredients separated by commas"
              required
              value={formik.values.ingredients}
              onChange={formik.handleChange}
            />
          </div>

          {formik.touched.ingredients && formik.errors.ingredients && (
            <p className="mb-3 text-danger">{formik.errors.ingredients}</p>
          )}

          {/* Instructions */}
          <div className="mb-3">
            <label className="form-label">Instructions</label>
            <textarea
              id="instructions"
              className="form-control"
              rows="4"
              placeholder="Write step-by-step instructions and end each step with a period(.)"
              required
              value={formik.values.instructions}
              onChange={formik.handleChange}
            />
          </div>

          {formik.touched.instructions && formik.errors.instructions && (
            <p className="mb-3 text-danger">{formik.errors.instructions}</p>
          )}

          {/* Upload Image */}
          <div className="mb-3">
            <label className="form-label">Upload Image</label>
            <input
              id="image"
              type="file"
              className="form-control"
              accept="image/*"
              required
              onChange={handleImageUpload}
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="btn submit-btn"
              disabled={loading || imageFileUploading}
            >
              {loading || imageFileUploading ? "Loading..." : "Add Recipe"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;

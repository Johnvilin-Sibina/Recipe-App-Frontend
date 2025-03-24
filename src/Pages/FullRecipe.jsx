import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RecipeCard from "../Components/RecipeCard";
import { toast } from "react-toastify";

const FullRecipe = () => {
  const { id } = useParams(); // Get recipe ID from URL
  const [recipe, setRecipe] = useState(null);

  const fetchRecipe = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/recipe/get-recipe/${id}`,
        {
          headers: {
            token: localStorage.getItem("Token"),
          },
        }
      );
      setRecipe(res.data.recipe);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  return (
    <div className="container mt-5">
      {recipe ? <RecipeCard recipe={recipe} /> : <p>Loading recipe...</p>}
    </div>
  );
};

export default FullRecipe;

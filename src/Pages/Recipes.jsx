import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRecipesFailure,
  fetchRecipesSuccess,
  fetchRecipiesStart,
} from "../Redux/Slice/userSlice";
import axios from "axios";
import RecipeCard from "../Components/RecipeCard";
import { toast } from "react-toastify";

const Recipes = ({ searchQuery }) => {
  const { recipes, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const fetchRecipes = async () => {
    try {
      dispatch(fetchRecipiesStart());
      const res = await axios.get(
        "https://recipe-app-backend-nz2n.onrender.com/api/recipe/get-recipies"
      );
      dispatch(fetchRecipesSuccess(res.data.recipes));
    } catch (error) {
      dispatch(fetchRecipesFailure(error.message));
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  // Display error messages from Redux
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Filter recipes based on search query
  const filteredRecipes = recipes?.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
        {filteredRecipes && filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))
        ) : (
          <p className="text-center">No recipes found</p>
        )}
      </div>
    </div>
  );
};

export default Recipes;

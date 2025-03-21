import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipesFailure, fetchRecipesSuccess, fetchRecipiesStart } from "../Redux/Slice/userSlice";
import axios from "axios";
import RecipeCard from "../Components/RecipeCard";

const Recipes = () => {
    const { recipes } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const fetchRecipes = async () => {
        try {
            dispatch(fetchRecipiesStart());
            const res = await axios.get('http://localhost:5000/api/recipe/get-recipies');
            dispatch(fetchRecipesSuccess(res.data.recipes));
        } catch (error) {
            console.log(error.message);
            dispatch(fetchRecipesFailure(error.message));
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    return (
        <div className="container mt-5">
            <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
                {recipes && recipes.length > 0 ? (
                    recipes.map((recipe) => (
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

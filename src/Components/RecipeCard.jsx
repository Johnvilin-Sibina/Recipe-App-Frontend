import React, { useEffect } from "react";
import "../CSS/RecipeCard.css"; 
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipesFailure, fetchRecipesSuccess, fetchRecipiesStart } from "../Redux/Slice/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RecipeCard = () => {
    const { recipes } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate()

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

    const viewFullRecipe = (id)=>{
        navigate(`/singlerecipe/${id}`)
    }

    return (
        <div className="container mt-5">
            <div className="row row-cols-1 row-cols-md-3 g-4"> 
                {recipes && recipes.length > 0 ? (
                    recipes.map((recipe) => (
                        <div key={recipe._id} className="col">
                            <div className="card h-100 recipe-card">
                                {/* Recipe Image */}
                                <img
                                    src={recipe.image}
                                    className="card-img-top recipe-image"
                                    alt={recipe.title}
                                />
                                <div className="card-body d-flex flex-column">
                                    {/* Recipe Title */}
                                    <h5 className="card-title">{recipe.title}</h5>

                                    {/* Cooking Time */}
                                    <p className="text-muted">
                                        ⏳ Cooking Time: {recipe.cookingTime} mins
                                    </p>

                                    {/* Description */}
                                    <p className="card-text">{recipe.description}</p>

                                    {/* Ingredients (Showing only first 3) */}
                                    <h6 className="ingredients-title">🥕 Ingredients:</h6>
                                    <ul className="ingredients-list">
                                        {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                                            <li key={index}>{ingredient}</li>
                                        ))}
                                    </ul>

                                    {/* View Full Recipe Button (Stays at the bottom) */}
                                    <button href="#" className="btn btn-primary mt-auto" onClick={()=>viewFullRecipe(recipe._id)}>
                                        View Full Recipe
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No recipes found</p>
                )}
            </div>
        </div>
    );
};

export default RecipeCard;

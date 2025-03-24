import React from "react";
import "../CSS/RecipeCard.css";
import { useLocation, useNavigate } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const viewFullRecipe = () => {
    navigate(`/fullrecipe/${recipe._id}`);
  };

  return (
    <div className="col mb-5">
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

          {/* Conditionally render content based on the route */}
          {location.pathname === "/recipes" && (
            <>
              <h6 className="ingredients-title">🥕 Ingredients:</h6>
              <ul className="ingredients-list">
                {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>

              {/* View Full Recipe Button */}
              <button
                className="btn btn-primary mt-auto"
                onClick={viewFullRecipe}
              >
                View Full Recipe
              </button>
            </>
          )}

          {location.pathname.startsWith("/fullrecipe/") && (
            <>
              <h6 className="ingredients-title">🥕 Ingredients:</h6>
              <ul className="ingredients-list">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>

              <h6 className="instructions-title">📜 Instructions:</h6>
              <ul className="instructions-list">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RecipeDetail.css';
import { FaArrowLeft } from 'react-icons/fa';

const RecipeDetail = () => {
  // setting up the details
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  // fetching tHe recipes
  useEffect(() => {
    axios.get(`https://meals-rrih.onrender.com/recipes/${id}`)
      .then(response => {
        setRecipe(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to load recipe details:', error);
        setLoading(false);
      });
  }, [id]);

  // while still fetching
  if (loading) return <p>Loading...</p>;

  // when it recipe does not exist
  if (!recipe) return <p>Recipe not found.</p>;

  // rendering
  return (
    <div className="recipe-detail">
      <button className="go-back" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Go Back
      </button>
      <h1>{recipe.name}</h1>
      <img src={recipe.image} alt={recipe.name} />
      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h2>Instructions</h2>
      <ul>
        {recipe.instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeDetail;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './RecipeList.css';
import Footer from "./Footer";

function RecipeList() {
  // setting states to store and manage therecipe list
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  //fetching recipes 
  useEffect(() => {
    axios.get('https://meals-rrih.onrender.com/recipes')
      .then(response => {
        setRecipes(response.data);
        setFilteredRecipes(response.data); 
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
        setLoading(false);
      });
  }, []);

  // Handling search by filtering
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const results = recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(query) ||
      recipe.description.toLowerCase().includes(query) ||
      recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(query))
    );

    setFilteredRecipes(results);
  };

  //while still loading
  if (loading) return <p>Loading...</p>;

  // whatt to render
  return (
    <div className="recipe-list">
      <h1>Recipes</h1>
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search for recipes, ingredients"
        />
      </div>
      <ul>
        {filteredRecipes.map(recipe => (
          <li key={recipe.id}>
            <Link to={`/recipes/${recipe.id}`}>
              <h2>{recipe.name}</h2>
              <img src={recipe.image} alt={recipe.name} />
              <p>{recipe.description}</p>
            </Link>
          </li>
        ))}
      </ul>
      <Footer />
    </div>
  );
}

export default RecipeList;

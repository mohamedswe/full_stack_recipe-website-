import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FeedPage.css'

const FeedPage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Fetch the data from the server using axios
    axios.get('http://localhost:8000/api/recipes')
      .then(response => {
        setRecipes(response.data);
      })
      .catch(error => {
        console.error('Error occurred while fetching recipes:', error);
      });
  }, []);

  return (
    <div>
      {recipes.map(recipe => (
        <div className='recipe-box' key={recipe.id}>
          <h3>{recipe.recipe_name}: {recipe.username}'s way</h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FeedPage;

import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import mealLogo from '../assets/meal.png';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={mealLogo} alt="Meal Logo" className="navbar-logo" />
      </div>
      <ul>
        <li><NavLink className="navbar-link" to="/" end>Home</NavLink></li>
        <li><NavLink className="navbar-link" to="/categories">Categories</NavLink></li>
        <li><NavLink className="navbar-link" to="/recipes">Recipes</NavLink></li>
        <li><NavLink className="navbar-link" to="/meal-plan">Meal Plan</NavLink></li>
        <li><NavLink className="navbar-link" to="/profile">Profile</NavLink></li>
        <li><NavLink className="navbar-link" to="/feedback">Feedback</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navbar;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Home from './components/Home';
import CategoryList from './components/CategoryList';
import CategoryDetail from './components/CategoryDetail';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import UserProfile from './components/UserProfile';
import MealPlan from './components/MealPlan';
import Login from './components/Login';
import FeedbackForm from './components/FeedbackForm';
import { AuthProvider, ProtectedRoute } from './components/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <Header />
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/categories" element={<CategoryList />} />
                  <Route path="/categories/:id" element={<CategoryDetail />} />
                  <Route path="/recipes" element={<RecipeList />} />
                  <Route path="/recipes/:id" element={<RecipeDetail />} /> 
                  <Route path="/profile" element={<UserProfile />} />
                  <Route path="/meal-plan" element={<MealPlan />} />
                  <Route path="/feedback" element={<FeedbackForm />} />
                </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;

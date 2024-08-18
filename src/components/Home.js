import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import Footer from "./Footer";
import "./Home.css";


const Home = () => {
  // Accessing the Current User in the system
  const { user } = useContext(AuthContext);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Introducing Meal Master</h1>
        <p>Where taste meets the myth!</p>
        {user && (
          <div className="user-info">
            <h2>Welcome, <span className="user-name">{user.name}!</span></h2>
            <img
              src="https://cdn.pixabay.com/photo/2024/03/02/15/58/ai-generated-8608868_640.png"
              alt="Profile"
              className="profile-icon"
            />
          </div>
        )}
      </header>

      <section className="restaurant-info">
        <h2>About Us</h2>
        <p>
          Meal Master was established in 2024, with a passion for delivering
          exceptional culinary experiences. Over the years, we have grown to
          become a beloved destination for food enthusiasts. With a team of over
          50 dedicated staff members, we strive to provide the best service and
          mouth-watering dishes to our patrons.
        </p>
        <h3>Contact Information</h3>
        <p>
          <strong>Address:</strong> Eastern Bypass, Kamakis Town
          <br />
          <strong>Phone:</strong> (254)727 207 156
          <br />
          <strong>Email:</strong> mastermeal@gmail.com
          <br />
          <strong>Website:</strong> www.mealmaster.com
        </p>
      </section>

      <Footer /> 
    </div>
  );
};

export default Home;

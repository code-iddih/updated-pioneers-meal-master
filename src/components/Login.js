import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import './Login.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import foodImage from '../assets/food.jpg';
import meal from '../assets/meal.png';
import Footer from "./Footer";


function Login() {
  //Setting Varianles for inpputs and messages
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [mode, setMode] = useState('signin');
  const { login } = useContext(AuthContext);

  // validating if the email is ok
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  //Validating the sign-in process
  const handleSignUp = async (e) => {
    e.preventDefault();
    // checking empty inputs
    if (username.trim() === '' || email.trim() === '' || password.trim() === '') {
      setMessage('All fields are required.');
      return;
    }
    // checks if email is valid
    if (!isValidEmail(email)) {
      setMessage('Please enter a valid email.');
      return;
    }
    // Makinf sure the password is more than 7 characyyers
    if (password.length < 8) {
      setMessage('Password must be at least 8 characters long.');
      return;
    }
    try {
      // sending signupninfo to the server while checking
      const response = await fetch('https://users1-o2el.onrender.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      if (response.ok) {
        // clearing the inputs
        setMessage('Registration successful! You can now SignIn...');
        setUsername('');
        setEmail('');
        setPassword('');
      } else {
        setMessage('Error registering user.');
      }
    } catch (error) {
      setMessage('Error connecting to the server.');
    }
  };

  //handling sigin process
  const handleSignIn = async (e) => {
    e.preventDefault();
    //checking for fields which are empty
    if (username.trim() === '' || password.trim() === '') {
      setMessage('Username and password are required.');
      return;
    }
    try {
      // Fetching users
      const response = await fetch('https://users1-o2el.onrender.com/users');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const users = await response.json();
      const userExists = users.some(
        (user) => user.username === username && user.password === password
      );
      if (userExists) {
        const user = users.find(
          (user) => user.username === username && user.password === password
        );
        // Logging in the user and storing his informatio
        login({
          name: user.username,
          email: user.email,
          profilePicture: user.profilePicture || 'https://via.placeholder.com/150',
        });
      } else {
        setMessage('Invalid username or password.');
      }
    } catch (error) {
      setMessage('Error connecting to the server.');
    }
  };

  // Form submission handling
  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'signin') {
      handleSignIn(e);
    } else if (mode === 'signup') {
      handleSignUp(e);
    }
  };

  // What tto render
  return (
    <div className="App">
      <div className="container">
        <div className="image-container">
          <img src={foodImage} alt="Food illustration" className="login-image" />
        </div>
        <div className="form-section">
          <div className="header">
            <img src={meal} alt="Meal logo" className="logo" />
            <h1>Welcome to Meal Master</h1>
          </div>
          <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
              <h2>{mode === 'signup' ? 'Sign Up' : 'Sign In'}</h2>
              <div className="form-group">
                <label htmlFor="username">
                  <i className="fas fa-user"></i>
                  <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </label>
              </div>
              {mode === 'signup' && (
                <div className="form-group">
                  <label htmlFor="email">
                    <i className="fas fa-envelope"></i>
                    <input
                      type="email"
                      id="email"
                      placeholder="Email id"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </label>
                </div>
              )}
              <div className="form-group">
                <label htmlFor="password">
                  <i className="fas fa-lock"></i>
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
              </div>
              {mode === 'signin' && (
                <div className="forgot-password">
                  <a href="#forgot">Lost password? Click here!</a>
                </div>
              )}
              <div className="form-actions">
                <button type="submit" className="btn-submit">
                  {mode === 'signup' ? 'Submit' : 'Sign In'}
                </button>
              </div>
              <div className="buttons">
                <button
                  type="button"
                  className="btn btn-signin"
                  onClick={() => {
                    setMode('signin');
                    setMessage('');
                  }}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  className="btn btn-signup"
                  onClick={() => {
                    setMode('signup');
                    setMessage('');
                  }}
                >
                  Sign Up
                </button>
              </div>
              {message && <p className="message">{message}</p>}
            </form>
          </div>
        </div>
      </div>
      <Footer /> 
    </div>
  );
}

export default Login;

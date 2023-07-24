import React, { useState } from 'react';
import axios from 'axios';
import './SignupPage.css';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/signup', {
        username,
        password,
      });

      if (response.status === 200) {
        // User signup successful, perform necessary actions (e.g., show success message, redirect, etc.)
        console.log('User signup successful!');
      } else {
        // Handle error response from the server
        console.error('User signup failed.');
      }
    } catch (error) {
      // Handle error while making the request
      console.error('Error occurred while signing up:', error);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h1 className="signup-title">Signup</h1>
        <form className="signup-form" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="signup-button">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;

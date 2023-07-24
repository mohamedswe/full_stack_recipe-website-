import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        username,
        password,
      });
      const token = response.data.token;
      console.log(token);
      // Store the token in local storage or other secure storage
      localStorage.setItem('token', token);
      window.location.href = '/feed'; 

      if (response.status === 200) {
        // Login successful, perform necessary actions (e.g., redirect, set authentication state, etc.)
        console.log('Login successful!');
      } else {
        // Handle error response from the server
        setErrorMessage('Wrong username or password.');
      }
    } catch (error) {
      // Handle error while making the request
      console.error('Error occurred while logging in:', error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-button">Login</button>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default LoginPage;

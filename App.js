import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import AccountPage from './FeedPage';
import HomePage from './HomePage';
import PostPage from './Post';
import './App.css'
import ProfilePage from './ProfilePage';

const App = () => {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path='/post' element={<PostPage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path= "/profile" element={<ProfilePage/>} />
        <Route
          path="/feed"
          element={isLoggedIn ? <HomePage /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
};

export default App;

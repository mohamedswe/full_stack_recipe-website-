import React from 'react';
import jwt_decode from 'jwt-decode';
import './ProfilePage.css';
import Sidenav from './Sidenav';

const ProfilePage = () => {
  // Get the JWT token from local storage
  const token = localStorage.getItem('token');

  // Decode the token to get the user information
  const tokenPayload = jwt_decode(token);

  // Get the username from the decoded token
  const username = tokenPayload.username;

  return (
    <div>
        <div className='profile-page'>
            <div className='sidenav'>{<Sidenav/>}</div>
            <div className='profile-info'>
                <h2>Profile Page</h2>
                <p>Hello, {username}!</p>
            </div>
        </div>
      {/* You can display additional user information here */}
    </div>
  );
};

export default ProfilePage;

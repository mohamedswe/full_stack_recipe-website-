import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import './HomePage.css';
import Sidenav from './Sidenav.js'
import FeedPage from "./FeedPage";
const HomePage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data from the server
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/feed', {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Set the fetched user data to state
        setUserData(response.data);
        
      } catch (error) {
        console.error('Error occurred while fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
     
      <div className="homepage">
         <div className="sidenav"><Sidenav/></div>
         <div className="feed"><FeedPage/></div>
      </div>
    </div>
  );
};

export default HomePage;

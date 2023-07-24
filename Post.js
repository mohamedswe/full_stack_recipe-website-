import React, { useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Sidenav from './Sidenav';
import './Post.css'

const PostPage = () => {
  const token = localStorage.getItem('token');
  const [recipe_name, setrecipe_name] = useState('');
  const [description, setDescription] = useState('');
  const tokenPayload = jwt_decode(token);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        recipe_name: recipe_name,
        description: description,
        username: tokenPayload.username,
      };

      console.log(formData);

      const response = await axios.post('http://localhost:8000/api/posts', formData);

      console.log('Post created:', response.data);
      // You can perform any necessary actions after successful post creation

      // Reset the form fields
      setrecipe_name('');
      setDescription('');
    } catch (error) {
      console.error('Error occurred while creating post:', error);
    }
  };

  return (
    <div>
      <div className="post-page">
        <div className="sidenav">
          {/* Sidenav component will be displayed here */}
          <Sidenav />
        </div>
        <div className="post-details">
          <h2>Create a New Post</h2>
          <form onSubmit={handleSubmit}>
            {/* Recipe Name input */}
            <label>
              Recipe Name:
              <input type="text" value={recipe_name} onChange={(e) => setrecipe_name(e.target.value)} />
            </label>

            {/* Description textarea */}
            <br></br>
            <label>
              Description:
              <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </label>

            {/* Submit button */}
            <br></br>
            <button type="submit" className='button'>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostPage;

const express = require('express');
const mysql = require("mysql")
const app = express();
const cors = require('cors');
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const multer = require('multer');
const path = require('path');


const upload = multer({ dest: 'uploads/' });

const generateSecretKey = () => {
    const length = 32; // Adjust the length as needed
    const buffer = crypto.randomBytes(length);
    return buffer.toString('hex');
  };



const secretKey = generateSecretKey();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Themaniswalking1!",
    database: "recipees_db"
  });
  


app.use(cors());

app.use(express.json()); 

db.connect((error) => {
    if (error) {
      console.error('Error connecting to the database:', error);
    } else {
      console.log('Connected to the database');
    }
  });
  



app.post('/api/signup', (req, res) => {
    const {username, password } = req.body;
  
    // Perform database insert using MySQL
    db.query(
      'INSERT INTO Users (username, password) VALUES (?, ?)',
      [username, password],
      (error, results) => {
        if (error) {
          console.error('Error occurred during signup:', error);
          res.status(500).json({ message: 'Error occurred during signup' });
        } else {
          res.status(200).json({ message: 'Signup successful' });
        }
      }
    );
  });


  app.get('/api/recipes', (req, res) => {
    db.query('SELECT * FROM recipes', (error, results) => {
      if (error) {
        console.error('Error occurred while fetching recipes:', error);
        res.status(500).json({ message: 'Error occurred while fetching recipes' });
      } else {
        res.status(200).json(results);
      }
    });
  });

  


  app.post('/api/posts', (req, res) => {

    const { recipe_name, description, username } = req.body;

  
    // Perform database insert using MySQL
    db.query(
      'INSERT INTO recipes (recipe_name, description, username) VALUES (?, ?, ?)',
      [recipe_name, description, username],
      (error, results) => {
        if (error) {
          console.error('Error occurred while creating post:', error);
          res.status(500).json({ message: 'Error occurred while creating post' });
        } else {
          res.status(200).json({ message: 'Post created successfully' });
        }
      }
    );
  });
  
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



  app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
  
    db.query(
      'SELECT * FROM Users WHERE username = ? AND password = ?',
      [username, password],
      (error, results) => {
        if (error) {
          console.error('Error occurred during login:', error);
          res.status(500).json({ message: 'Error occurred during login' });
        } else if (results.length === 0) {
          res.status(401).json({ message: 'Wrong username or password' });
        } else {
          const user = results[0];
          const token = jwt.sign({ username: user.username }, secretKey);
          res.status(200).json({ token });
        }
      }
    );
  });
  

  app.get('/api/feed', authenticateToken, (req, res) => {
    // Access the authenticated user's username from the request object
    const {username} = req.user;
  
    // Retrieve additional user data from the database based on the username
    db.query(
      'SELECT * FROM recipes',
      [username],
      (error, results) => {
        if (error) {
          console.error('Error occurred while fetching user data:', error);
          res.status(500).json({ message: 'Error occurred while fetching user data' });
        } else if (results.length === 0) {
          res.status(404).json({ message: 'User not found' });
        } else {
          const recipe = results[0];
            console.log(recipe)
          // Customize the response based on your requirements
         
          res.status(200).json(recipe);
        }
      }
    );
  });


  function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'Authentication token is required' });
    }
  
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
      }
  
      req.user = user;
      next();
    });
  }


app.listen(8000, () => {
    console.log("Connected to port");
})
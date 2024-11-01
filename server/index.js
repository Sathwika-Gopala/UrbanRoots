import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import multer from 'multer';

import cors from 'cors';
import pkg from 'pg'; 
import dotenv from 'dotenv';
const { Pool } = pkg;
dotenv.config(); // Load environment variables from .env
// Create a new pool instance using the connection string
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } 
  
});

const app = express();
const port = 5000;
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

// Use body-parser to parse JSON bodies into JS objects
app.use(bodyParser.json());
app.use(cors()); // To enable cross-origin requests

// Route for user signup
app.post('/api/signup', async (req, res) => {
  const { username, email, password , location, contact,profile_image } = req.body;

  try {

    const emailCheckQuery = 'SELECT * FROM users WHERE email = $1';
    const emailCheckResult = await pool.query(emailCheckQuery, [email]);

    if (emailCheckResult.rows.length > 0) {
      return res.status(400).json({ error: 'Email already exists' }); // Return an error if the email exists
    }

    // Insert the new user into the database
    const query = 'INSERT INTO users (username, email, password,location,contact) VALUES ($1, $2, $3,$4,$5) RETURNING *';
    const values = [username, email, password, location, contact];
    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]); // Return the new user
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).send('Error saving user to the database: ' + err.message); // Send the error message in the response
  }
});
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  // Validate request body
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  try {
    // Fetch user data from the database
    const userQuery = 'SELECT * FROM users WHERE username = $1';
    const userResult = await pool.query(userQuery, [username]);

    // Check if user exists
    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: 'Incorrect username or password.' });
    }

    const user = userResult.rows[0];

    // Directly compare provided password with the stored password
    if (password !== user.password) {
      return res.status(401).json({ error: 'Incorrect username or password.' });
    }

    // Successful login, return user details (excluding password)
    const { password: _, ...userData } = user; // Remove password from user data
    res.status(200).json(userData); // Respond with user data
  } catch (err) {
    console.error('Login error:', err); // Log the error for debugging
    res.status(500).send('Error logging in: ' + err.message); // Send the error message in the response
  }
});

app.post('/api/upload-profile-picture', upload.single('image'), async (req, res) => {
  const { userId } = req.body; // Assuming you're sending userId with the request
  const image = req.file; // Multer adds file information to req.file

  try {
    if (!image) {
      return res.status(400).send({ message: 'No image file uploaded.' });
    }

    // Convert the image buffer to a base64 string (optional)
    const imageData = image.buffer.toString('base64');

    // Save imageData to the database against the userId
    await db.query('UPDATE users SET profileimage = $1 WHERE id = $2', [imageData, userId]);
    
    res.status(200).send({ message: 'Profile picture uploaded successfully.' });
  } catch (error) {
    console.error('Error saving profile picture:', error);
    res.status(500).send({ message: 'Error saving profile picture.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

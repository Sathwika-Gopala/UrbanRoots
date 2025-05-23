import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import multer from 'multer';
import cors from 'cors';
import pkg from 'pg';
const { Pool } = pkg;

import dotenv from 'dotenv';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
dotenv.config(); // Load environment variables from .env

const app = express();
const port = process.env.PORT || 3000;

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});
// const __dirname = path.dirname(new URL(import.meta.url).pathname);
// const postsFilePath = path.join(__dirname, 'posts.json');
// const postsFilePath = 'D:/UrbanRoots/UrbanRoots/server/posts.json';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// console.log(postsFilePath)
const postsFilePath = path.join(__dirname, 'posts.json');
// Middleware
app.use(bodyParser.json());
app.use(cors());

// File upload configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});
// Read posts from file
const readPostsFromFile = () => {
  try {
    const data = fs.readFileSync(postsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return []; // If file doesn't exist, return empty array
  }
};

// Write posts to file
const writePostsToFile = (posts) => {
  fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));
};


// Route for user signup
app.post('/api/signup', async (req, res) => {
  const { username, email, password, location, contact } = req.body;

  try {
    const emailCheckQuery = 'SELECT * FROM users WHERE email = $1';
    const emailCheckResult = await pool.query(emailCheckQuery, [email]);

    if (emailCheckResult.rows.length > 0) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (username, email, password, location, contact) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [username, email, hashedPassword, location, contact];
    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving user to the database: ' + err.message);
  }
});

// Route for user login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  try {
    const userQuery = 'SELECT * FROM users WHERE email = $1';
    const userResult = await pool.query(userQuery, [email]);

    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: 'Incorrect username or password.' });
    }

    const user = userResult.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect username or password.' });
    }

    const { password: _, ...userData } = user;
    res.status(200).json(userData);
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send('Error logging in: ' + err.message);
  }
});

// Route for uploading profile picture
app.post('/api/upload-profile-picture', upload.single('image'), async (req, res) => {
  const { userId } = req.body;
  const image = req.file;

  try {
    if (!image) {
      return res.status(400).send({ message: 'No image file uploaded.' });
    }

    const imageData = image.buffer.toString('base64');
    await pool.query('UPDATE users SET profileimage = $1 WHERE id = $2', [imageData, userId]);
    
    res.status(200).send({ message: 'Profile picture uploaded successfully.' });
  } catch (error) {
    console.error('Error saving profile picture:', error);
    res.status(500).send({ message: 'Error saving profile picture.' });
  }
});

// Route to create a new post
app.post('/api/posts', (req, res) => {
  const { title, content, author } = req.body;
  
  const posts = readPostsFromFile();
  const newPost = {
    id: posts.length + 1,
    title,
    content,
    author,
    date: new Date().toISOString(),
    comments: []
  };
  
  posts.push(newPost);
  writePostsToFile(posts);
  
  res.status(201).json(newPost);
});

// Route to get all posts
app.get('/api/posts', (req, res) => {
  const posts = readPostsFromFile();
  res.status(200).json(posts);
});

// Route to delete a post
app.delete('/api/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  let posts = readPostsFromFile();
  posts = posts.filter(post => post.id !== postId);
  writePostsToFile(posts);
  res.status(200).json({ message: 'Post deleted successfully' });
});

// Route to add a comment to a post
app.post('/api/posts/:id/comments', (req, res) => {
  const postId = parseInt(req.params.id);
  const { comment } = req.body;

  const posts = readPostsFromFile();
  const post = posts.find(p => p.id === postId);

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  post.comments.push(comment);
  writePostsToFile(posts);
  res.status(200).json(post);
});

// Endpoint to create an order (Razorpay)
app.post('/api/create-order', async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const options = {
      amount: amount,
      currency: currency,
      receipt: `receipt_order_${Math.floor(Math.random() * 10000)}`
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).send('Error creating order: ' + error.message);
  }
});

// Endpoint for payment verification
app.post('/api/payment-verification', (req, res) => {
  const { paymentId, orderId, signature } = req.body;

  const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET)
    .update(orderId + '|' + paymentId)
    .digest('hex');

  if (generatedSignature === signature) {
    res.status(200).json({ message: 'Payment verified successfully.' });
  } else {
    res.status(400).json({ message: 'Payment verification failed.' });
  }
});


app.use(express.json());

app.post('/api/chatbot', async (req, res) => {
  const userMessage = req.body.message;

  // If the user asks about events
  if (userMessage.toLowerCase().includes('event') || userMessage.toLowerCase().includes('when')) {
    try {
      // Query the database to fetch upcoming events
      const result = await pool.query('SELECT * FROM events WHERE DateOfEvent > NOW() ORDER BY DateOfEvent ASC');

      if (result.rows.length > 0) {
        const eventsList = result.rows.map(event =>
          `Workshop: ${event.name}\nDate: ${event.dateofevent}\nDescription: ${event.description}`).join('\n\n');
        return res.json({ reply: `Here are some upcoming events:\n\n${eventsList}` });
      } else {
        return res.json({ reply: 'Sorry, I couldn\'t find any upcoming events.' });
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      return res.json({ reply: 'Sorry, I encountered an error while fetching events.' });
    }
  }

  // Default chatbot behavior for other queries
  return res.json({ reply: 'I didn\'t quite get that. Could you rephrase?' });
});




// Backend - app.js or routes/events.js (if you're using route-based structure)
app.use(cors()); // Enable CORS to allow the frontend to communicate with the backend
app.use(express.json()); // Parse JSON request bodies
app.get('/api/events', async (req, res) => {
  try {
    // Query to fetch events from your database
    const query = 'SELECT * FROM events';
    const result = await pool.query(query);

    // Send the fetched events data as JSON
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});


// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});

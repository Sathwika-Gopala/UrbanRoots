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

dotenv.config(); // Load environment variables from .env

const app = express();
const port = 5000;

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

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
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  try {
    const userQuery = 'SELECT * FROM users WHERE username = $1';
    const userResult = await pool.query(userQuery, [username]);

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

// Endpoint to create an order
app.post('/api/create-order', async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const options = {
      amount: amount,
      currency: currency,
      receipt: `receipt_order_${Math.floor(Math.random() * 10000)}`,
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

app.post('/api/chatbot', async (req, res) => {
  const userMessage = req.body.message;

  // If the user asks about events
  if (userMessage.toLowerCase().includes('event') || userMessage.toLowerCase().includes('when')) {
    try {
      const response = await fetch('http://localhost:1337/api/events');
      const events = await response.json();

      if (events.data && events.data.length > 0) {
        const eventsList = events.data.map(event => 
          `Workshop: ${event.Name}\nDate: ${event.DateOfEvent}\nDescription: ${event.Description}`).join('\n\n');
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
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

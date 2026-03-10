// backend/user-service/index.js
// backend/user-service/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const axios = require('axios');   // ✅ added to trigger notification service

const app = express();
app.use(express.json());

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174']
}));

// Connect to userdb
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect()
  .then(() => console.log("✅ Connected to userdb"))
  .catch(err => console.error("❌ DB connection error:", err));

// Create user
app.post('/users', async (req, res) => {
  const { name, email, dob } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO users (name, email, dob) VALUES ($1,$2,$3) RETURNING *',
      [name, email, dob]
    );
    const newUser = result.rows[0];

    // 🔔 Auto-trigger notification if birthday is today
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    if (dob === today) {
      try {
        await axios.post('http://localhost:3003/notify', {
          email: newUser.email,
          link: 'http://localhost:5173/celebration'
        });
        console.log(`Immediate notification sent to ${newUser.email}`);
      } catch (notifyErr) {
        console.error("Error sending immediate notification:", notifyErr);
      }
    }

    res.json(newUser);
  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).json({ error: "Failed to add user" });
  }
});

// Get all users
app.get('/users', async (req, res) => {
  const result = await pool.query('SELECT * FROM users');
  res.json(result.rows);
});

// Get user by ID
app.get('/users/:id', async (req, res) => {
  const result = await pool.query('SELECT * FROM users WHERE id=$1', [req.params.id]);
  res.json(result.rows[0]);
});

app.listen(3001, () => console.log('User Service running on 3001'));

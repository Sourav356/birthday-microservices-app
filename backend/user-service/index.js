// backend/user-service/index.js
// backend/user-service/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const axios = require('axios');   // ✅ added to trigger notification service

const app = express();
app.use(express.json());

app.use(cors()); // Allow all for production ingress

// Connect to userdb
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false }
});

pool.connect()
  .then(() => console.log("✅ Connected to userdb"))
  .catch(err => console.error("❌ DB connection error:", err));

// Create user
app.post('/api/users', async (req, res) => {
  const { name, email, dob } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO users (name, email, dob) VALUES ($1,$2,$3) RETURNING *',
      [name, email, dob]
    );
    const newUser = result.rows[0];

    // 🔔 Auto-trigger notification if birthday is today (IST)
    const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(new Date());
    const dobMonthDay = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(new Date(dob)).slice(5);
    
    if (dobMonthDay === today.slice(5)) {
      try {
        await axios.post('http://notification-service:3003/api/notify', {
          email: newUser.email,
          link: `${process.env.FRONTEND_URL || 'http://a4c6c25ba44cf4ec98b1809dbcdc1f7b-604775912.ap-south-2.elb.amazonaws.com'}/#celebration`
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
app.get('/api/users', async (req, res) => {
  const result = await pool.query('SELECT * FROM users');
  res.json(result.rows);
});

// Get user by ID
app.get('/api/users/:id', async (req, res) => {
  const result = await pool.query('SELECT * FROM users WHERE id=$1', [req.params.id]);
  res.json(result.rows[0]);
});

app.listen(3001, () => console.log('User Service running on 3001'));

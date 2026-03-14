// backend/celebration-service/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();
app.use(express.json());

app.use(cors({
  origin: ['http://localhost:8080']
}));

// Connect to celebrationdb
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});


pool.connect()
  .then(() => console.log("✅ Connected to celebrationdb"))
  .catch(err => console.error("❌ DB connection error:", err));

// Get all celebration photos
app.get('/celebration', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM photos ORDER BY id DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching photos:", err);
    res.status(500).json({ error: "Failed to fetch photos" });
  }
});

app.listen(3004, () => console.log('Celebration Service running on 3004'));

// backend/celebration-service/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();
app.use(express.json());

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174']
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

// Get today’s photos
app.get('/celebration', async (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  const result = await pool.query(
    'SELECT * FROM photos WHERE celebration_date=$1',
    [today]
  );
  res.json(result.rows);
});

app.listen(3004, () => console.log('Celebration Service running on 3004'));

// backend/birthday-service/index.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174']
}));

app.get('/today', async (req, res) => {
  try {
    const users = await axios.get('http://localhost:3001/users');

    // Get today's date in local timezone (IST)
    const today = new Date().toLocaleDateString('en-CA'); // "YYYY-MM-DD"

    const birthdays = users.data.filter(u => {
      // Convert DOB to local date string
      const dobDate = new Date(u.dob).toLocaleDateString('en-CA');
      return dobDate === today;
    });

    res.json(birthdays);
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});


app.listen(3002, () => console.log('Birthday Service running on 3002'));




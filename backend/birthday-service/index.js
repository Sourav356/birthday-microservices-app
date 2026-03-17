// backend/birthday-service/index.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors()); // Allow all for production ingress

app.get('/api/today', async (req, res) => {
  try {
    const users = await axios.get('http://user-service:3001/api/users');

    // Get today's date in IST
    const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(new Date());

    const birthdays = users.data.filter(u => {
      // DOB from PG is usually a Date object; format it to YYYY-MM-DD in IST
      const dobDate = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(new Date(u.dob));
      return dobDate.slice(5) === today.slice(5); // Match Month-Day for birthdays
    });

    res.json(birthdays);
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});


app.listen(3002, () => console.log('Birthday Service running on 3002'));




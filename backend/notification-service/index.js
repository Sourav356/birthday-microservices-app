// backend/notification-service/index.js
// backend/notification-service/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors({ origin: ['http://localhost:8080'] }));

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: { user: process.env.EMAIL, pass: process.env.PASSWORD }
});

// Manual notify endpoint (for testing)
app.post('/notify', async (req, res) => {
  const { email, link } = req.body;
  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: '🎉 Happy Birthday!',
      html: `<h1>Happy Birthday!</h1><p>Click <a href="${link}">here</a> to see your surprise 🎂</p>`
    });
    res.json({ status: 'sent' });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

// 🔔 Scheduled job: runs every day at 00:00
cron.schedule('0 0 * * *', async () => {
  console.log("Running midnight birthday check...");
  try {
    const res = await axios.get(`${process.env.BIRTHDAY_SERVICE_URL || 'http://host.docker.internal:3002'}/today`); // call birthday-service
    const birthdays = res.data;

    for (const user of birthdays) {
      await transporter.sendMail({
        from: process.env.EMAIL,
        to: user.email, // ✅ send to each user’s email from DB
        subject: '🎉 Happy Birthday!',
        html: `<h1>Happy Birthday!</h1><p>Click <a href="http://localhost:8080/celebration">here</a> to see your surprise 🎂</p>`
      });
      console.log(`Notification sent to ${user.email}`);
    }
  } catch (err) {
    console.error("Error in scheduled birthday check:", err);
  }
});

app.listen(3003, () => console.log('Notification Service running on 3003'));

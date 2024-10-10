require('dotenv').config();
const express = require('express');
const cron = require('node-cron');
const { connectDB } = require('./config/database');
const apiRoutes = require('./routes/api');
const { fetchAndStoreCryptoData } = require('./services/cryptoService');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Connect to MongoDB
connectDB();

// Task 1: Background Job - Runs every 2 hours
cron.schedule('0 */2 * * *', async () => {
  console.log('Running background job to fetch and store crypto data');
  await fetchAndStoreCryptoData();
});

// API routes for Tasks 2 and 3
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
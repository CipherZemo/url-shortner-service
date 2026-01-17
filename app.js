require('dotenv').config();
const connectDB = require('./config/db');
const express = require('express');

connectDB();
const app = express();

app.get('/', (req, res) => {
  res.send('API is running...');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is alive and running on http://localhost:${PORT}`));
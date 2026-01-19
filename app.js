require('dotenv').config();
const connectDB = require('./config/db');
const express = require('express');

connectDB();
const app = express();
app.use(express.json()); // It parses incoming requests with JSON payloads. Without this, you won't be able to access `req.body`

app.get('/', (req, res) => {
  res.send('API is running...');
});

// --- ADD ROUTE HANDLING ---

const urlRoutes = require('./routes/urls');
app.use('/api', urlRoutes);// Mount the router: Tell the app to use the 'urlRoutes' for any request

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is alive and running on http://localhost:${PORT}`));
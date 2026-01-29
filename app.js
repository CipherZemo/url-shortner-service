require('dotenv').config();
const connectDB = require('./config/db');
const express = require('express');

connectDB();

const app = express();
app.use(express.json()); // It parses incoming requests with JSON payloads. Without this, you won't be able to access `req.body`
const cors = require('cors');
app.use(cors());

// --- ROUTE HANDLING ---
const urlRoutes = require('./routes/urls');
app.use('/api', urlRoutes);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const linksRoutes = require('./routes/links');
app.use('/api/links', linksRoutes);

const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is alive and running on http://localhost:${PORT}`));
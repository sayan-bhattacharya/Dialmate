const express = require('express');
const mongoose = require('mongoose');
const botRoutes = require('./routes/botRoutes');
require('dotenv').config();  // Loads environment variables from .env

const app = express();
const port = process.env.PORT || 5000;

// Middleware for parsing JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('Error connecting to MongoDB:', err));

// Use bot routes
app.use('/webhook', botRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
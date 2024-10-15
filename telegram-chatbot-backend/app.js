const express = require("express");
const mongoose = require("mongoose");
const botRoutes = require("./routes/botRoutes");
require("dotenv").config(); // Load environment variables from .env

const app = express();
const port = process.env.PORT || 3000;

// Middleware for parsing incoming JSON data
app.use(express.json());

// Connect to MongoDB without deprecated options
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Set up routes for Telegram webhook
app.use("/webhook", botRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const express = require('express');
const botController = require('../controllers/botController');

const router = express.Router();

// Webhook endpoint for Telegram bot
router.post('/telegram', botController.handleMessage);

module.exports = router;

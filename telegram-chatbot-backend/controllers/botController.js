const dbService = require('../services/dbService');
const telegramService = require('../services/telegramService');

// Handle incoming messages from Telegram webhook
exports.handleMessage = async (req, res) => {
    const message = req.body.message;

    if (message) {
        const chatId = message.chat.id;
        const text = message.text;

        if (text === '/start') {
            // Register user and send a welcome message
            const user = await dbService.registerUser(chatId);
            await telegramService.sendMessage(chatId, `Welcome, ${user.name || 'user'}!`);
        }

        if (text === '/profile') {
            // Retrieve and send user profile info
            const user = await dbService.getUserByTelegramId(chatId);
            if (user) {
                await telegramService.sendMessage(chatId, `Your profile: Name - ${user.name}, Age - ${user.age}`);
            } else {
                await telegramService.sendMessage(chatId, 'Profile not found. Please register first.');
            }
        }
    }

    // Respond with success
    res.sendStatus(200);
};

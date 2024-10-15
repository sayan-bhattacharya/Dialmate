const axios = require('axios');

const TELEGRAM_API_URL = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;

// Send a message via Telegram bot
exports.sendMessage = async (chatId, text) => {
    const url = `${TELEGRAM_API_URL}/sendMessage`;
    await axios.post(url, {
        chat_id: chatId,
        text: text,
    });
};

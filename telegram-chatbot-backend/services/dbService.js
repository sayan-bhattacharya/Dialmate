const User = require('../models/User');

// Register or retrieve a user by their Telegram ID
exports.registerUser = async (telegramId) => {
    let user = await User.findOne({ telegramId });

    if (!user) {
        user = new User({ telegramId });
        await user.save();
    }

    return user;
};

// Get user by their Telegram ID
exports.getUserByTelegramId = async (telegramId) => {
    return await User.findOne({ telegramId });
};

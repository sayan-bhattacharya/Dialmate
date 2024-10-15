const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    telegramId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        default: '',
    },
    age: {
        type: Number,
        default: null,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

const cors = require('cors');

const someMiddleware = (req, res, next) => {
    // You can add your custom middleware logic here
    next();
};

module.exports = { someMiddleware, cors };

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    // Authorization header check
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // "Bearer TOKEN" → TOKEN
            token = req.headers.authorization.split(' ')[1];

            // JWT verify
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            // decoded.id se database me user find
            req.user = await User.findById(decoded.id).select('-password');

            // Token + user valid hai → next middleware/controller
            next();

        } catch (error) {
            return res.status(401).json({
                message: 'Not authorized, token failed'
            });
        }
    }

    // Token hi nahi mila
    if (!token) {
        return res.status(401).json({
            message: 'Not authorized, No token'
        });
    }
};

module.exports = protect;
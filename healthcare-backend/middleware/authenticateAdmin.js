const User = require('../models/User');


module.exports = async (req, res, next) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({ error: 'Access denied. Admins only.' });
        }
        next();
    } catch (error) {
        console.error('Error in authenticateAdmin middleware:', error);
        res.status(500).json({ error: 'Server error.' });
    }
};



function checkFinanceUserRole(req, res, next) {
    if (req.user && req.user.role === 'FinanceUser') {
        next(); 
    } else {
        res.status(403).json({ error: 'Unauthorized access' }); 
    }
}

module.exports = checkFinanceUserRole;

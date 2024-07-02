function checkDoctorRole(req, res, next) {
    if (req.user && req.user.role === 'Doctor') {
        next(); 
    } else {
        res.status(403).json({ error: 'Unauthorized access' }); 
    }
}

module.exports = checkDoctorRole;

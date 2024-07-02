function checkPatientRole(req, res, next) {
    if (req.user && req.user.role === 'Patient') {
        next(); 
    } else {
        res.status(403).json({ error: 'Unauthorized access' }); 
    }
}

module.exports = checkPatientRole;

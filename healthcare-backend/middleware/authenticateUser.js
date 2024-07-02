require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');


module.exports = async (req, res, next) => {

    const authorizationHeader = req.headers.authorization; //extracting the authorization header from the http request to verify and check it 

    if(!authorizationHeader || !authorizationHeader.startsWith('Bearer '))
    {
        return res.status(401).json({ error: 'Unauthorized: Missing or invalid token.' });
    }

    const token = authorizationHeader.split(' ')[1]; //extracting the token from the authorization header

    try{
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET); //verifying the token using the secret_key in the environment variables
        const user = await User.findById(decodedToken.user.id);

        if(!user) 
        {
            return res.status(404).json({ error: 'User not found.' });
        }

        req.user = user;
        next(); 
    }
    catch(error)
    {
        console.error(error);
        return res.status(401).json({ error: 'Unauthorized: Invalid token.' });
    }
};


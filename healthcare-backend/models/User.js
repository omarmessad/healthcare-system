const mongoose = require('mongoose'); //Importing mongoose to define schemas and interact with my MongoDB database

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, default: false},
}, {discriminatorKey: 'role'});

module.exports = mongoose.model('User', UserSchema); //Exporting the UserSchema as a model, to allow other parts of my application to import it and work with it
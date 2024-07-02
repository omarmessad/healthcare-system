const mongoose = require('mongoose');
const User = require('../models/User');

const DoctorSchema = User.discriminator('Doctor', new mongoose.Schema({
    specialization: {type: String, required: true},
    appointments: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Visit'}],
        default: []
    }
}));

module.exports = DoctorSchema;
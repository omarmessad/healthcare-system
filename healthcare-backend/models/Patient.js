const mongoose = require('mongoose');
const User = require('../models/User');

const PatientSchema = User.discriminator('Patient', new mongoose.Schema({
    appointments: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Visit'}],
        default: []
    }
}))

module.exports = PatientSchema;
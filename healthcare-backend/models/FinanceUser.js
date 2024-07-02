const mongoose = require('mongoose');
const User = require('../models/User');

const FinanceUserSchema = User.discriminator('FinanceUser', new mongoose.Schema({}));

module.exports = FinanceUserSchema;
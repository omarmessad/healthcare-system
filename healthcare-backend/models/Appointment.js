const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
  doctor: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
  patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  visitDate: { type: Date, required: true },
  treatments: [{
    name: String,
    cost: Number
  }]
});

module.exports = mongoose.model('Appointment', AppointmentSchema);

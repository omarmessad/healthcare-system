const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');

const createAppointment = async (req, res) => {
  try {
    const { doctorName, patientName, visitDate, treatments } = req.body;

    const doctor = await Doctor.findOne({ name: doctorName });
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    let patient = await Patient.findOne({ name: patientName });
    if (!patient) {
      patient = new Patient({ name: patientName });
      await patient.save();
    }

    const newAppointment = new Appointment({
      doctor: doctor._id,
      patient: patient._id,
      visitDate,
      treatments
    });

    await newAppointment.save();

    res.status(201).json(newAppointment);
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAppointments = async (req, res) => {
  try {
    const doctorId = req.user.id; 
    const appointments = await Appointment.find({ doctor: doctorId })
      .populate('patient', 'name')
      .populate('doctor', 'name')
      .exec();

    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateAppointment = async (req, res) => {
  try {
    const { visitId } = req.params;
    const { treatments } = req.body;

    const appointment = await Appointment.findById(visitId);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    if (treatments) {
      appointment.treatments = treatments;
    }

    await appointment.save();

    res.status(200).json(appointment);
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const { visitId } = req.params;

    const appointment = await Appointment.findById(visitId);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    await appointment.remove();

    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAppointmentByPatientName = async (req, res) => {
  const { patientName } = req.query;

  try {
    const appointments = await Appointment.find()
      .populate('patient', 'name')
      .populate('doctor', 'name');

    const filteredAppointments = appointments.filter(
      (appointment) => appointment.patient.name === patientName
    );

    if (filteredAppointments.length === 0) {
      return res.status(404).json({ error: 'No appointments found for this patient.' });
    }

    res.status(200).json(filteredAppointments);
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createAppointment,
  getAppointments,  
  updateAppointment,
  deleteAppointment,
  getAppointmentByPatientName
};

const Doctor = require('../models/Doctor');
const Visit = require('../models/Appointment');
const User = require('../models/User');

exports.searchDoctors = async (req, res) => {
  try {
    const { name } = req.query;
    const doctors = await Doctor.find({ name: new RegExp(name, 'i') });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: 'Error searching for doctors' });
  }
};

exports.getMyVisits = async (req, res) => {
  try {
    const patientId = req.user._id;
    const visits = await Visit.find({ patient: patientId, visitDate: { $gte: new Date() } }).populate('doctor');
    res.json(visits);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching visits' });
  }
};

exports.reserveVisit = async (req, res) => {
  try {
    const { doctorId, visitDate } = req.body;
    const patientId = req.user._id;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    const existingVisit = await Visit.findOne({ doctor: doctorId, visitDate });
    if (existingVisit) {
      return res.status(400).json({ error: 'Doctor is not available at this time' });
    }

    const newVisit = new Visit({
      doctor: doctorId,
      patient: patientId,
      visitDate
    });

    await newVisit.save();
    res.status(201).json(newVisit);
  } catch (error) {
    res.status(500).json({ error: 'Error reserving visit' });
  }
};

exports.getVisitDetails = async (req, res) => {
  try {
    const visitId = req.params.visitId;
    const visit = await Visit.findById(visitId).populate('doctor');
    if (!visit) {
      return res.status(404).json({ error: 'Visit not found' });
    }
    res.json(visit);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching visit details' });
  }
};

exports.cancelVisit = async (req, res) => {
  try {
    const visitId = req.params.visitId;
    const visit = await Visit.findById(visitId);

    if (!visit) {
      return res.status(404).json({ error: 'Visit not found' });
    }

    const visitDate = new Date(visit.visitDate);
    const now = new Date();
    const oneWeekBefore = new Date();
    oneWeekBefore.setDate(now.getDate() + 7);

    if (visitDate < oneWeekBefore) {
      return res.status(400).json({ error: 'You can only cancel a visit up to a week in advance' });
    }

    await Visit.findByIdAndDelete(visitId);
    res.json({ message: 'Visit canceled successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error canceling visit' });
  }
};

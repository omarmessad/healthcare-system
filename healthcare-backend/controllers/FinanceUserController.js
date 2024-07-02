const Visit = require('../models/Appointment');
const User = require('../models/User');  

exports.getVisitDetails = async (req, res) => {
  try {
    const visitId = req.params.visitId;
    const visit = await Visit.findById(visitId).populate('doctor').populate('patient');
    if (!visit) {
      return res.status(404).json({ error: 'Visit not found' });
    }
    res.json(visit);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching visit details' });
  }
};

exports.calculateTotalAmountByPatientName = async (req, res) => {
  try {
    const { patientName } = req.query;
    const patient = await User.findOne({ name: patientName, role: 'Patient' });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const visits = await Visit.find({ patient: patient._id });

    const totalAmount = visits.reduce((total, visit) => {
      return total + visit.treatments.reduce((sum, treatment) => sum + treatment.cost, 0);
    }, 0);

    res.json({ totalAmount });
  } catch (error) {
    res.status(500).json({ error: 'Error calculating total amount' });
  }
};

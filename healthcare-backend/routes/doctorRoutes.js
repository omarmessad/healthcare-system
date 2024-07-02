const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/DoctorController');
const checkDoctorRole = require('../middleware/checkDoctorRole'); 
const authenticateUser = require('../middleware/authenticateUser')

router.use(authenticateUser);
router.use(['/appointments', '/visits/:visitId/treatments'], checkDoctorRole);

router.post('/appointments', doctorController.createAppointment);
router.get('/appointments', doctorController.getAppointments);  
router.get('/appointments/:id', doctorController.getAppointmentByPatientName);
router.put('/appointments/:id', doctorController.updateAppointment);
router.delete('/appointments/:id', doctorController.deleteAppointment);

module.exports = router;

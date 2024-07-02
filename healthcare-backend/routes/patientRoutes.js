const express = require('express');
const router = express.Router();
const PatientController = require('../controllers/PatientController');
const authenticateUser = require('../middleware/authenticateUser');
const checkPatientRole = require('../middleware/checkPatientRole');

router.use(authenticateUser);
router.use(checkPatientRole);

router.get('/doctors', checkPatientRole, PatientController.searchDoctors);
router.get('/my-visits', checkPatientRole, PatientController.getMyVisits);
router.post('/reserve-visit', checkPatientRole, PatientController.reserveVisit);
router.get('/visits/:visitId', checkPatientRole, PatientController.getVisitDetails);
router.delete('/cancel-visit/:visitId', checkPatientRole, PatientController.cancelVisit);

module.exports = router;


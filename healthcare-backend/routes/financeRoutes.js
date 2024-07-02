const express = require('express');
const router = express.Router();
const FinanceUserController = require('../controllers/FinanceUserController');
const authenticateUser = require('../middleware/authenticateUser');
const checkFinanceUserRole = require('../middleware/checkFinanceUserRole');

router.use(authenticateUser);
router.use(checkFinanceUserRole);

router.get('/visits/:visitId', FinanceUserController.getVisitDetails);
router.get('/calculate-total', FinanceUserController.calculateTotalAmountByPatientName);

module.exports = router;
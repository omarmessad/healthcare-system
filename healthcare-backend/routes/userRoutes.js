const express = require('express');
const router =  express.Router();
const UserController = require('../controllers/UserController');
const authenticateUser = require('../middleware/authenticateUser');
const authenticateAdmin = require('../middleware/authenticateAdmin');

router.post('/register', UserController.userRegister);
router.post('/login', UserController.userLogin);

router.get('/logout', UserController.userLogout);


router.use(authenticateUser);
router.use(authenticateAdmin);

router.get('/:id', UserController.getUserById);
router.get('/', UserController.getAllUsers);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;
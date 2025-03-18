const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const { authenticate, authorizeAdmin } = require('../middlewire/authenticate');

router.post('/register', authenticate, userController.register);
router.post('/login', userController.loginUser);
router.get('/users', authenticate, authorizeAdmin, userController.getAllUsers);
router.get('/users/:id', authenticate, authorizeAdmin, userController.getUserById);

module.exports = router;
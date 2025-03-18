const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const authenticate = require('../middlewire/authenticate');

router.post('/register', authenticate, userController.register);
router.post('/login', userController.loginUser);
router.get('/users', authenticate, userController.getAllUsers);
router.get('/users/:id', userController.getUserByIds);

module.exports = router;
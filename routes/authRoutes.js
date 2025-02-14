// const express = require('express');
// const { register, login } = require('../controllers/authController');

// const router = express.Router();

// router.post('/register', register);
// router.post('/login', login);

// module.exports = router;
// !------------------
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Define the correct route for the register/signup endpoint
router.post('/register', authController.register);  // Ensure the route is "/register"
router.post('/login', authController.login);

module.exports = router;
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth_controller');
const { authenticate } = require('../middlewares/auth_middleware');

router.post('/register', authController.register);
router.post('/login', authController.login);

// optional verify route
router.get('/verify', authenticate, authController.verify);

module.exports = router;

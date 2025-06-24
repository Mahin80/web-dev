const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/admin', authMiddleware.verifyToken, authMiddleware.checkAdmin, authController.adminPanel);

router.get('/profile', authMiddleware.verifyToken, authController.getProfile); 
router.put('/address', authMiddleware.verifyToken, authController.updateAddress);

router.post('/send-code', authController.sendResetCode);
router.post('/reset-password', authController.resetPassword);

module.exports = router;

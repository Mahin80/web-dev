import express from 'express';
import authController from '../controllers/authController.js';
import { verifyToken, checkAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/admin', verifyToken, checkAdmin, authController.adminPanel);

router.get('/profile', verifyToken, authController.getProfile); 
router.put('/address', verifyToken, authController.updateAddress);

router.post('/send-code', authController.sendResetCode);
router.post('/reset-password', authController.resetPassword);
router.post('/verify-code', authController.verifyCode);

export default router;

import express from 'express';
import messageController from '../controllers/messageController.js';

const router = express.Router();

router.get('/', messageController.getMessages);
router.post('/create', messageController.createMessage);

export default router;
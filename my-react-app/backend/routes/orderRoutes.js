import express from 'express';
import { createOrder, getOrdersByUser, getAllOrders,
  updateOrderStatus } from '../controllers/ordersController.js';

const router = express.Router();

// GET all orders by user ID
router.get('/user/:id', getOrdersByUser);

// create a new order
router.post('/create', createOrder);

router.get('/display', getAllOrders);

router.put('/:id/status', updateOrderStatus); 

export default router;
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/ordersController');

// GET all orders by user ID
router.get('/user/:id', orderController.getOrdersByUser);

// create a new order
router.post('/create', orderController.createOrder);

module.exports = router;

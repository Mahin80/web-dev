const express = require('express');
const router = express.Router();
const stripeController = require('../controllers/checkoutController');

router.post('/create-session', stripeController.createStripeSession);

module.exports = router;

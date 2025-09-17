// Payment routes for processing payments and retrieving Stripe API key
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/process', paymentController.processPayment);
router.get('/key', paymentController.getStripeApiKey);

module.exports = router;

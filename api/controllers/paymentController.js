const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Controller for processing payments and providing Stripe API key
// Process payment using Stripe
exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: 'usd',
    metadata: {
      company: 'The Smart Cart',
    },
  });

  res.status(200).json({
    success: true,
    clientSecret: myPayment.client_secret,
  });
});

// Get Stripe API key for frontend
exports.getStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApikey: process.env.STRIPE_API_KEY });
});

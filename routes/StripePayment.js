const express = require('express');
const { processPayment, sendStripeApiKey } = require('../controller/payment/StripePayment');
const router = express.Router();
const { isAuthenticatedUser } = require('../middleware/userAuth');

router.post('/payment/process', isAuthenticatedUser, processPayment)
router.get('/sendStripeApiKey', isAuthenticatedUser, sendStripeApiKey)

module.exports = router;
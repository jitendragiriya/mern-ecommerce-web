const express = require('express');
const {payment} = require('../controller/payment/Payment');
const router = express.Router();

//  Create a User using: POST "/api/auth/payment". login required
router.post('/', payment)

module.exports = router
//There will be two features: Pay Bill and Add Money. Users can add money to their wallet from their bank account.
const express = require('express');
const router = express.Router();

const  protect  = require('../middleware/protect');
const { payBill, addMoney } = require('../controller/walletController');

router.post('/pay-bill', protect, payBill);
router.post('/add-money', protect, addMoney);

module.exports = router;

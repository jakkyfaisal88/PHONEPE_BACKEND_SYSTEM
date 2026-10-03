//isme Do chij honge Pay Bill, & Add Money  
//Bank Account se wallet me Money add kr sakte hai //iske liye DB nhi chahiye qki..Transaction me hi add kr diya hai (enum) me hai 
const express = require('express');
const router = express.Router();

const  protect  = require('../middleware/protect');
const { payBill, addMoney } = require('../controller/walletController');

router.post('/pay-bill', protect, payBill);
router.post('/add-money', protect, addMoney);

module.exports = router;

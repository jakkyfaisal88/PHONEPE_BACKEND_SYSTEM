const express = require('express');
const router = express.Router();       
const { registerUser,loginUser,setupMpin,getUserProfile } = require('../controller/authController.js');
const protect = require('./../middleware/protect.js');
console.log("registerUser:", registerUser);
console.log("loginUser:", loginUser);
console.log("protect:", protect);
console.log("getUserProfile:", getUserProfile);


router.post('/register',registerUser); 
router.post('/login',loginUser);
router.post('/set-mpin',protect,setupMpin); 
router.get('/profile',protect,getUserProfile);  


module.exports = router; 
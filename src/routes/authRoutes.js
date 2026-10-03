const express = require('express');
const router = express.Router();       //express ke andr jo router. function hai wo
const { registerUser,loginUser,setupMpin,getUserProfile } = require('../controller/authController.js');
const protect = require('./../middleware/protect.js');
console.log("registerUser:", registerUser);
console.log("loginUser:", loginUser);
console.log("protect:", protect);
console.log("getUserProfile:", getUserProfile);

//login karwate time token ko apne header me pass karwa denge
router.post('/register',registerUser); //jo v register wale aynge wo controller ko chalajayega 
router.post('/login',loginUser);
router.post('/set-mpin',protect,setupMpin);  //next round tabhi kaam karega jb protext puri trah se pass ho jayega // chahe wo fail kare ya pass wahi se response ayega
router.get('/profile',protect,getUserProfile);  //pahle get karte hai data uske baad middleware lagyange


module.exports = router; 
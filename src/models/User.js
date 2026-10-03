const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema({         //Ye structure/rules hain: jo create ho raha hai 
    name: {
        type:String,
        required:true,   
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    }, 
    upiId:{
        type:String,
        unique:true,

    },
    balance:{
      type:Number,
      default:0  
    },
    mpin:{                //mpin vhahiye hoga jisko baad me hash kara ke dalenge  
      type:String,
    
    },
},{timestamp:true}); //to iska purpose hai document ke creation aur update ka time automatically save karna.


const User = mongoose.model('User', userSchema);       //uswrSchema ke rule ke according UserModel bna do
module.exports = User;                                  //Ye object ka naam nahi, balki Model ko hold karne wala JavaScript variable hai.
                                                        //Collection kb bnti hai ? ->  Jab tum model ke through actual data MongoDB mein save karte ho:
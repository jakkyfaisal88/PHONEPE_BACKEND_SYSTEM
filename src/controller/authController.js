
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



const generateToken = (id) => {
  return jwt.sign(
    { id },                          //. Bhai, token banane ka main reason hai: server ko pata chale ki request kis logged-in user ki hai.
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};


const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const userExists = await User.findOne({
      $or: [{ email }, { phone }]
    });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }



    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const username = email.toLowerCase().split("@")[0];
    const upiId = `${username}@phonepe`;


    //Ab actual database insertion
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      upiId
    });


    return res.status(201).json({ //201 status ke saath client ko JSON response bhejo.
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      upiId: user.upiId,
      balance: user.balance,
      hasMpinset: false,
      token: generateToken(user._id)
    });

  } catch (error) { //this will run only if error comes......
    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};






// ------LOGIN -------------------

const loginUser = async (req, res) => {
  try {
    // 1. Client se email aur password lena
    const { email, password } = req.body;

    // 2. Check: email/password diya hai ya nahi
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password"
      });
    }

    // 3. Email ke basis par user ko database me find karna
    const user = await User.findOne({ email });

    // 4. Agar user nahi mila
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    // 5. Client ka plain password
    //    DB ke hashed password ke saath compare karna
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    // 6. Password match nahi hua
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    // 7. Login successful → JWT token generate
    const token = generateToken(user._id);

    // 8. Client ko response
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      upiId: user.upiId,
      balance: user.balance,
      hashMpinSet: !user.mpin,
      token: token
    });

  } catch (error) {
    // 9. Unexpected server/database error
    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};



//--------------------MPIN Set-----------------------

const setupMpin = async (req, res) => {
  //Implementation for setupMpin
  // #swagger.security = [{ "bearerAuth": [] }]
  const { mpin } = req.body;
  if (!mpin || mpin.length !== 4) {
    return res.status(400).json({ message: 'please provide a valid 4 digit MPIN ' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedMpin = await bcrypt.hash(mpin, salt);

  const user = await User.findByIdAndUpdate(req.user._id, { mpin: hashedMpin }, { new: true });

  if (user) {
    res.json({ message: 'MPIN SET SUCCESSFULLY' });
  } else {
    res.status(400).json({ message: 'Failed to set Mpin' });
  }
}



//Get User Profile
const getUserProfile = async (req, res) => {
  // #swagger.security = [{ "bearerAuth": [] }]
  const user = await User.findById(req.user._id).select('-password -mpin');//hmne user ko find kiya and uske pura data la ke wapas se vj diya
  if (user) {
    res.json(user);
  } else {
    res.status(400).json({ message: 'User not found' });
  }
};



module.exports = { registerUser, loginUser, setupMpin, getUserProfile };
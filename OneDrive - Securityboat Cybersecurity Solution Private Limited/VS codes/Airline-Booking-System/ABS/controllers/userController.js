// const User = require('../models/userModel');
// const { sendVerificationEmail } = require('../utils/email');
// const { generateAccessToken, generateRefreshToken } = require('../utils/tokenUtils');

// // Register a new user
// exports.registerUser = async (req, res) => {
//   try {
//     const { username, email, password, confirmPassword, phoneNo } = req.body;

//     // Validate input
//     if (password !== confirmPassword) {
//       return res.status(400).json({ error: 'Passwords do not match' });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ error: 'User already exists' });
//     }

//     const user = new User({ username, email, password, confirmPassword, phoneNo });
//     await user.save();

//     // Send verification email
//     await sendVerificationEmail(user);

//     res.status(201).json({ message: 'User registered successfully. Please verify your email.' });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Login user
// exports.loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (!user || !await user.comparePassword(password)) {
//       return res.status(400).json({ error: 'Invalid credentials' });
//     }

//     if (!user.isVerified) {
//       return res.status(400).json({ error: 'Please verify your email first' });
//     }

//     const accessToken = generateAccessToken(user._id, user.role);
//     const refreshToken = generateRefreshToken(user._id);

//     res.json({ accessToken, refreshToken });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Verify email
// exports.verifyEmail = async (req, res) => {
//   try {
//     const { token } = req.query;
//     const user = await User.findOne({ verificationToken: token });

//     if (!user) {
//       return res.status(400).json({ error: 'Invalid or expired token' });
//     }

//     user.isVerified = true;
//     user.verificationToken = undefined; //To Clear the token
//     await user.save();

//     res.json({ message: 'Email verified successfully' });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };






const { model } = require('mongoose');
const User = require('../models/userModel');
const { sendVerificationEmail } = require('../utils/email');
const { generateAccessToken, generateRefreshToken } = require('../utils/tokenUtils');

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword, phoneNo } = req.body;

    // Validate input
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = new User({ username, email, password, confirmPassword, phoneNo });
    await user.save();

    // Send verification email
    await sendVerificationEmail(user);

    res.status(201).json({ message: 'User registered successfully. Please verify your email.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !await user.comparePassword(password)) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    if (!user.isVerified) {
      return res.status(400).json({ error: 'Please verify your email first' });
    }

    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id);

    res.json({ accessToken, refreshToken });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Verify email
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    user.isVerified = true;
    user.verificationToken = undefined; // Clear the token
    await user.save();

    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Logout user
exports.logoutUser = (req, res) => {
  res.cookie('token', '', { maxAge: 1 }); // Clear the cookie
  res.status(200).json({ message: 'Logged out successfully' });
};



module.exports = { home, registerUser,loginUser, verifyEmail,logoutUser };
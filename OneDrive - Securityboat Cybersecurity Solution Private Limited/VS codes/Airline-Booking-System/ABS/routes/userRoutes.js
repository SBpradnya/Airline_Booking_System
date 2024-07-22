const express = require('express');
const { registerUser, loginUser, verifyEmail } = require('../controllers/userController');
const { authenticateToken, protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/verify-email', verifyEmail);

router.get('/logout', protect, (req, res) => {
    res.status(200).json({ message: 'Logged out successfully' });
  });
  router.get('/verify/:token', async (req, res) => {
    try {
      const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      
      if (!user) {
        return res.status(400).json({ message: 'Invalid token' });
      }
  
      user.isVerified = true;
      await user.save();
      
      res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  



module.exports = router;

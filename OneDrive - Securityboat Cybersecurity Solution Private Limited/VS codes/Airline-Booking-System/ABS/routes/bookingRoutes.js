const express = require('express');
const { bookTicket, viewBookings } = require('../controllers/bookingController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/book', authenticateToken, bookTicket);
router.get('/user/:userId', authenticateToken, viewBookings);

module.exports = router;

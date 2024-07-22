const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const { getFlights, createFlight, updateFlight, deleteFlight } = require('../controllers/flightController');

router.route('/')
  .get(getFlights)
  .post(protect, authorize('admin'), createFlight);

router.route('/:id')
  .put(protect, authorize('admin'), updateFlight)
  .delete(protect, authorize('admin'), deleteFlight);

module.exports = router;

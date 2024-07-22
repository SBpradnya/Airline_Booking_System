const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  flightId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Flight' },
  seatsBooked: { type: Number, required: true },
  bookingDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);

const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  flightNumber: { type: String, required: true, unique: true },
  airline: { type: String, required: true },
  departureAirport: { type: String, required: true },
  arrivalAirport: { type: String, required: true },
  departureDate: { type: Date, required: true },
  arrivalDate: { type: Date, required: true },
  seatsAvailable: { type: Number, required: true }
});

module.exports = mongoose.model('Flight', flightSchema);

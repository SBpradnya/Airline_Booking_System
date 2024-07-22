const Flight = require('../models/flightModel');

// Add a new flight
exports.addFlight = async (req, res) => {
  try {
    const flight = new Flight(req.body);
    await flight.save();
    res.status(201).json(flight);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update flight details
exports.updateFlight = async (req, res) => {
  try {
    const { id } = req.params;
    const flight = await Flight.findByIdAndUpdate(id, req.body, { new: true });
    if (!flight) {
      return res.status(404).json({ error: 'Flight not found' });
    }
    res.json(flight);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a flight
exports.deleteFlight = async (req, res) => {
  try {
    const { id } = req.params;
    const flight = await Flight.findByIdAndDelete(id);
    if (!flight) {
      return res.status(404).json({ error: 'Flight not found' });
    }
    res.json({ message: 'Flight deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all flights
exports.getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {addFlight,updateFlight, deleteFlight,getAllFlights };
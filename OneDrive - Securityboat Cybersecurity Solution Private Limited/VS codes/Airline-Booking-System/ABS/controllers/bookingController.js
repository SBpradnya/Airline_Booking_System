const Booking = require('../models/bookingModel');
const Flight = require('../models/flightModel');

// Book a ticket
exports.bookTicket = async (req, res) => {
  try {
    const { userId, flightId, seatsBooked } = req.body;

    const flight = await Flight.findById(flightId);
    if (!flight) {
      return res.status(404).json({ error: 'Flight not found' });
    }

    if (flight.seatsAvailable < seatsBooked) {
      return res.status(400).json({ error: 'Not enough seats available' });
    }

    flight.seatsAvailable -= seatsBooked;
    await flight.save();

    const booking = new Booking({ userId, flightId, seatsBooked });
    await booking.save();

    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// View user bookings
exports.viewBookings = async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.find({ userId }).populate('flightId');
    res.json(bookings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



module.exports = { bookTicket, bookTicket, viewBookings };


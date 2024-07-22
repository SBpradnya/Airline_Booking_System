"use client"

import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Heading, VStack } from '@chakra-ui/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const TicketBookingForm = () => {
  const [flightId, setFlightId] = useState('');
  const [seatsBooked, setSeatsBooked] = useState('');
  const router = useRouter();

  const handleBooking = async () => {
    try {
      await axios.post(
        '/api/bookings/book',
        { flightId, seatsBooked },
        { headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` } }
      );
      alert('Booking successful!');
      router.push('/bookedtickets');
    } catch (error) {
      console.error('Booking failed:', error);
alert('Booking failed. Please try again.');
}
};

return (
<Box maxW="sm" mx="auto" mt={10}>
<Heading mb={6}>Book a Ticket</Heading>
<VStack spacing={4}>
<FormControl id="flightId">
<FormLabel>Flight ID</FormLabel>
<Input type="text" value={flightId} onChange={(e) => setFlightId(e.target.value)} />
</FormControl>
<FormControl id="seatsBooked">
<FormLabel>Seats Booked</FormLabel>
<Input type="number" value={seatsBooked} onChange={(e) => setSeatsBooked(e.target.value)} />
</FormControl>
<Button colorScheme="teal" onClick={handleBooking}>Book</Button>
</VStack>
</Box>
);
};

export default TicketBookingForm;

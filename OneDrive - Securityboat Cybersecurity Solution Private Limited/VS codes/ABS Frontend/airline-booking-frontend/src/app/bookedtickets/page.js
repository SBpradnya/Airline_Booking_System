import { useEffect, useState } from 'react';
import { Box, Heading, VStack } from '@chakra-ui/react';
import axios from 'axios';
import Cookies from 'js-cookie';

const BookedTickets = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('/api/bookings/user', {
          headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
        });
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <Box maxW="xl" mx="auto" mt={10}>
      <Heading mb={6}>Your Booked Tickets</Heading>
      <VStack spacing={4}>
        {bookings.map((booking) => (
          <Box key={booking._id} p={4} shadow="md" borderWidth="1px">
            Flight ID: {booking.flightId} - Seats Booked: {booking.seatsBooked}
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default BookedTickets;

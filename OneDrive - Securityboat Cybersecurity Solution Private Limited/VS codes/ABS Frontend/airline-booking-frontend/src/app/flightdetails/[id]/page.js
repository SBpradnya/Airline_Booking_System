"use client"
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import axios from 'axios';

const FlightDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [flight, setFlight] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchFlight = async () => {
        try {
          const response = await axios.get(`/api/flights/${id}`);
          setFlight(response.data);
        } catch (error) {
          console.error('Error fetching flight details:', error);
        }
      };

      fetchFlight();
    }
  }, [id]);

  if (!flight) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box maxW="xl" mx="auto" mt={10}>
      <Heading mb={6}>Flight Details</Heading>
      <Box p={4} shadow="md" borderWidth="1px">
        <Text>Flight Number: {flight.flightNumber}</Text>
        <Text>Airline: {flight.airline}</Text>
        <Text>Departure: {flight.departureAirport} at {new Date(flight.departureTime).toLocaleString()}</Text>
        <Text>Arrival: {flight.arrivalAirport} at {new Date(flight.arrivalTime).toLocaleString()}</Text>
        <Text>Available Seats: {flight.availableSeats}</Text>
      </Box>
    </Box>
  );
};

export default FlightDetails;

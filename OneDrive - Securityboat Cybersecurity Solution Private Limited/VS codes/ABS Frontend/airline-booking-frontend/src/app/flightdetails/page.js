"use client"

import { useEffect, useState } from 'react';
import { Box, Heading, VStack, Link } from '@chakra-ui/react';
import axios from 'axios';
import NextLink from 'next/link';

const FlightList = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get('/api/flights');
        setFlights(response.data);
      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    };

    fetchFlights();
  }, []);

  return (
    <Box maxW="xl" mx="auto" mt={10}>
      <Heading mb={6}>Available Flights</Heading>
      <VStack spacing={4}>
        {flights.map(flight => (
          <Box key={flight._id} p={4} shadow="md" borderWidth="1px">
            <NextLink href={`/flightdetails/${flight._id}`} passHref>
              <Link>
                Flight Number: {flight.flightNumber} - Airline: {flight.airline}
              </Link>
            </NextLink>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default FlightList;

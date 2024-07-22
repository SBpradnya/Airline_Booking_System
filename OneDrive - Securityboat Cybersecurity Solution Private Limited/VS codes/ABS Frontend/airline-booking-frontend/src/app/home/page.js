import { useEffect, useState } from 'react';
import { Box, Heading, Button } from '@chakra-ui/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const Home = () => {
  const [flights, setFlights] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get('/api/flights/all', {
          headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
        });
        setFlights(response.data);
      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    };

    fetchFlights();
  }, []);

  const handleLogout = () => {
    Cookies.remove('accessToken');
    router.push('/login');
  };

  return (
    <Box maxW="xl" mx="auto" mt={10}>
      <Heading mb={6}>Available Flights</Heading>
      <ul>
        {flights.map(flight => (
          <li key={flight._id}>
            {flight.flightNumber} - {flight.airline} - {flight.departureAirport} to {flight.arrivalAirport}
          </li>
        ))}
      </ul>
      <Button colorScheme="teal" mt={6} onClick={handleLogout}>Logout</Button>
    </Box>
  );
};

export default Home;

import { useEffect, useState } from 'react';
import { Box, Heading, Button, VStack, FormControl, FormLabel, Input } from '@chakra-ui/react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Admin = () => {
  const [flights, setFlights] = useState([]);
  const [flightNumber, setFlightNumber] = useState('');
  const [airline, setAirline] = useState('');
  const [departureAirport, setDepartureAirport] = useState('');
  const [arrivalAirport, setArrivalAirport] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [availableSeats, setAvailableSeats] = useState('');

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

  const handleAddFlight = async () => {
    try {
      await axios.post(
        '/api/flights/add',
        { flightNumber, airline, departureAirport, arrivalAirport, departureTime, arrivalTime, availableSeats },
        { headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` } }
      );
      alert('Flight added successfully!');
      setFlightNumber('');
      setAirline('');
      setDepartureAirport('');
      setArrivalAirport('');
      setDepartureTime('');
      setArrivalTime('');
      setAvailableSeats('');
    } catch (error) {
      console.error('Error adding flight:', error);
      alert('Failed to add flight. Please try again.');
    }
  };

  return (
    <Box maxW="xl" mx="auto" mt={10}>
      <Heading mb={6}>Admin Section</Heading>
      <VStack spacing={4}>
        {flights.map(flight => (
          <Box key={flight._id} p={4} shadow="md" borderWidth="1px">
            {flight.flightNumber} - {flight.airline} - {flight.departureAirport} to {flight.arrivalAirport}
          </Box>
        ))}
        <Heading mt={6} mb={4}>Add a New Flight</Heading>
        <FormControl id="flightNumber">
          <FormLabel>Flight Number</FormLabel>
          <Input type="text" value={flightNumber} onChange={(e) => setFlightNumber(e.target.value)} />
        </FormControl>
        <FormControl id="airline">
          <FormLabel>Airline</FormLabel>
          <Input type="text" value={airline} onChange={(e) => setAirline(e.target.value)} />
        </FormControl>
        <FormControl id="departureAirport">
          <FormLabel>Departure Airport</FormLabel>
          <Input type="text" value={departureAirport} onChange={(e) => setDepartureAirport(e.target.value)} />
        </FormControl>
        <FormControl id="arrivalAirport">
          <FormLabel>Arrival Airport</FormLabel>
          <Input type="text" value={arrivalAirport} onChange={(e) => setArrivalAirport(e.target.value)} />
        </FormControl>
        <FormControl id="departureTime">
          <FormLabel>Departure Time</FormLabel>
          <Input type="datetime-local" value={departureTime} onChange={(e) => setDepartureTime(e.target.value)} />
        </FormControl>
        <FormControl id="arrivalTime">
          <FormLabel>Arrival Time</FormLabel>
          <Input type="datetime-local" value={arrivalTime} onChange={(e) => setArrivalTime(e.target.value)} />
        </FormControl>
        <FormControl id="availableSeats">
          <FormLabel>Available Seats</FormLabel>
          <Input type="number" value={availableSeats} onChange={(e) => setAvailableSeats(e.target.value)} />
        </FormControl>
        <Button colorScheme="teal" mt={4} onClick={handleAddFlight}>Add Flight</Button>
      </VStack>
    </Box>
  );
};

export default Admin;

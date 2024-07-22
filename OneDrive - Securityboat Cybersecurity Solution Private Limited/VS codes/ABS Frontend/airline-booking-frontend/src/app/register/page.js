"use client"
import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Heading, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/api/users/register', {
        username,
        email,
        password,
        phone,
      });
      alert('Registration successful! Please check your email to verify your account.');
      router.push('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <Box maxW="sm" mx="auto" mt={10}>
      <Heading mb={6}>Register</Heading>
      <VStack spacing={4}>
        <FormControl id="username">
          <FormLabel>Username</FormLabel>
          <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <FormControl id="confirmPassword">
          <FormLabel>Confirm Password</FormLabel>
          <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </FormControl>
        <FormControl id="phone">
          <FormLabel>Phone Number</FormLabel>
          <Input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </FormControl>
        <Button colorScheme="teal" onClick={handleRegister}>Register</Button>
      </VStack>
    </Box>
  );
};

export default Register;

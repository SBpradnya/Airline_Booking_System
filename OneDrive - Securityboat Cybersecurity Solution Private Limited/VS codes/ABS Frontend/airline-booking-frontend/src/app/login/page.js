"use client"
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Input, VStack } from '@chakra-ui/react';
import Cookies from 'js-cookie';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        email,
        password,
      });

      // Store the access token in cookies
      Cookies.set('accessToken', response.data.accessToken, { expires: 7 });

      // Redirect based on user role
      if (response.data.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/user');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Login</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Login;

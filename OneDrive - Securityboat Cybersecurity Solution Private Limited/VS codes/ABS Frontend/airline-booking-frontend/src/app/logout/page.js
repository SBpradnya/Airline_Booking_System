"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    Cookies.remove('accessToken');
    router.push('/login');
  }, []);

  return null;
};

export default Logout;

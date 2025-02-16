"use client"
import { useEffect } from 'react';// or 'react-router-dom' if you're using that for routing
import useUser from './useUser';

const useAuthRedirect = () => {
  const { user, loading } = useUser(); // Get user info and loading status

  useEffect(() => {
    // Redirect if user is available
    if (user && !loading) {
      window.location.href = '/'; // Change '/dashboard' to wherever you want to redirect if the user is logged in
    }
  }, [user, loading, router]);
};

export default useAuthRedirect;

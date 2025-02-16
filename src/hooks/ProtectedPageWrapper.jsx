"use client";
import React from 'react';
import useUser from './useUser';
import { useEffect } from 'react';


const ProtectedPageWrapper = ({ children }) => {
  const { user, loading } = useUser(); // Get user info and loading status

  useEffect(() => {
    // Redirect if user is available
    if (user && !loading) {
      window.location.href = '/'; // Change '/dashboard' to wherever you want to redirect if the user is logged in
    }
  }, [user, loading]);

  return (
    <>
      {children}
    </>
  );
};

export default ProtectedPageWrapper;

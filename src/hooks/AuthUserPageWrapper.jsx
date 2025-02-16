"use client";
import React from 'react';
import useUser from './useUser';
import { useEffect } from 'react';
import Loader from '@/components/shared/loader/Loader';
import { saveDataIntoLocalStorage } from '@/utils/localstorage';


const AuthUserPageWrapper = ({ children }) => {
  const { user, loading } = useUser(); // Get user info and loading status

 // Redirect if the user is not authenticated and loading is complete
 useEffect(() => {
    if (!loading && !user) {
     saveDataIntoLocalStorage("redirect", window.location.href);
     window.location.href = "/login"
    }
  }, [user, loading]);

  // While loading or if not authenticated (redirection pending), show the loader
  if (loading || !user) {
    return <Loader />;
  }

  // If the user is authenticated, render the protected content
  return <>{children}</>;
  
};

export default AuthUserPageWrapper;

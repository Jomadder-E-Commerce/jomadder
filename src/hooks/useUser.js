import { useState, useEffect } from 'react';
import { getLocalStorage } from '@/components/shared/LocalStorage/LocalStorage';

const useUser = () => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = getLocalStorage('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setUserRole(parsedUser?.role);
    }
    setLoading(false);
  }, []); // Convert props to an array for dependencies

  return { user, userRole, loading };
};

export default useUser;


// {
//   "accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2MxMjZjY2IzMTBkMzVmOTAxNzRlODgiLCJlbWFpbCI6Im5hYmlyYXNla0BnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImxvZ2luQnkiOiJHb29nbGUiLCJjcmVhdGVkQXQiOiIyMDI1LTAyLTI4VDAzOjAwOjI4LjQ4NVoiLCJ1cGRhdGVkQXQiOiIyMDI1LTAyLTI4VDAzOjAwOjI4LjQ4NVoiLCJfX3YiOjAsImlhdCI6MTc0MDcxMjUxNywiZXhwIjoxNzQ3OTEyNTE3fQ.ThlYSyZ5cYXUG0RTWELRPVDGi4Ig3TegOPKMpcbw9Mc",
//   "refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2MxMjZjY2IzMTBkMzVmOTAxNzRlODgiLCJlbWFpbCI6Im5hYmlyYXNla0BnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImxvZ2luQnkiOiJHb29nbGUiLCJjcmVhdGVkQXQiOiIyMDI1LTAyLTI4VDAzOjAwOjI4LjQ4NVoiLCJ1cGRhdGVkQXQiOiIyMDI1LTAyLTI4VDAzOjAwOjI4LjQ4NVoiLCJfX3YiOjAsImlhdCI6MTc0MDcxMjUxNywiZXhwIjoxNzc2NzEyNTE3fQ.R0-UTCYXxcsrOkp_K5r6uIL15VQwdqJNmHAVyPIfa4o"}
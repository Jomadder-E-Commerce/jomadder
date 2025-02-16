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
  }, []);

  return { user, userRole, loading };
};

export default useUser;

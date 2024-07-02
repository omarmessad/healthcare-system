import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export const useAuth = () => {
  const [token, setToken] = useState(Cookies.get('token'));

  useEffect(() => {
    const token = Cookies.get('token');
    setToken(token);
  }, []);

  return { token };
};

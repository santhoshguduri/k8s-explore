import React, { useEffect } from 'react';
import { useNavigate, Outlet} from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getToken, removeToken } from '../utils/Auth';

const ProtectedRoute = () => {
  const navigate = useNavigate();

  const isTokenValid = () => {
    const token = getToken();
    if (!token) {
      return false;
    }

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        removeToken();
        return false;
      }
      return true;
    } catch (error) {
      console.error('Invalid token', error);
      removeToken();
      return false;
    }
  };

  useEffect(() => {
    if (!isTokenValid()) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedRoute;

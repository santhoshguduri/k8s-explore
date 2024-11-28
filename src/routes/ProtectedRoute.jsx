import React, {useState, useEffect } from 'react';
import { useNavigate, Outlet} from 'react-router-dom';
import { verifyToken } from '../services/OAuth';

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  const checkAuthentication = async () => {
    try {
      const response = await verifyToken()
      if (response.status === 200 && response.data.isAuthenticated) {
        setIsAuthenticated(true);
      } else {
        throw new Error("Not authenticated");
      }
    } catch (error) {
      console.error("Authentication check failed", error);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/register'); // Redirect to login or register if not authenticated
    }
  }, [isAuthenticated, navigate]);

  // Display a loading indicator while authentication status is being checked
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
};

export default ProtectedRoute;

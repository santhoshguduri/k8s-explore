import React, {useState, useEffect } from 'react';
import { useNavigate, Outlet, Navigate} from 'react-router-dom';
import { refreshToken, verifyToken } from '../services/OAuth';
import { jwtDecode } from 'jwt-decode';
import auth from '../utils/Auth';
import { Box } from '@mui/material';
import SideNavigation from '../components/common/SideNavigation';
import DashboardTopNavigation from '../components/common/DashboardTopNavigation';

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  const refreshAccessToken = async () => {
    refreshToken().then(()=>{
      setIsAuthenticated(true);
    }).catch(()=>setIsAuthenticated(false))
  }

  const checkAuthentication = async () => {
    
    try {
      const accessToken = auth.getToken();

      const decodedToken = jwtDecode(accessToken);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime){
        await refreshAccessToken()
      }
      else{
        setIsAuthenticated(true);
      }
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  // useEffect(() => {
  //   if (isAuthenticated === false) {
  //     navigate('/register'); // Redirect to login or register if not authenticated
  //   }
  // }, [isAuthenticated, navigate]);

  // Display a loading indicator while authentication status is being checked
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
  return isAuthenticated ? (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Persistent Side Navigation */}
      <SideNavigation />

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* Top Navigation */}
        <DashboardTopNavigation />

        {/* Content Wrapper */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: "#f5f5f5",
            overflow: "auto",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  ) : <Navigate to="/login" />;
};

export default ProtectedRoute;

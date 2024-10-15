import {
    createBrowserRouter,
  } from "react-router-dom";
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import ProtectedRoute from "./ProtectedRoute";
import { Dashboard } from "../pages/Dashboard";
  
export const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/app",
      element: <ProtectedRoute />,
      children: [
        {
          path: '/app/dashboard',
          element: <Dashboard />
        }
      ]
    },
  ]);
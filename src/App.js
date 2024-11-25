import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import {
  RouterProvider,
} from "react-router-dom";
import {router} from './routes/config'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#91C862',
      contrastText: '#fff',
    },
    secondary: {
      main: '#454545',
    },
  },
  typography: {
    fontFamily: 'Poppins',
  },
});


function App() {

  const isAuthenticated = React.useState(false);
  const isLogin = React.useState(false);

  return (
    <div className="App">
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
    </div>
  );
}

export default App;

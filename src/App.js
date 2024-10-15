import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import {
  RouterProvider,
} from "react-router-dom";
import {router} from './routes/config'


function App() {

  const isAuthenticated = React.useState(false);
  const isLogin = React.useState(false);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

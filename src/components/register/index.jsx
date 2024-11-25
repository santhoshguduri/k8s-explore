import React from "react";
import GoogleButton from "../common/GoogleButton";
import FormInput, { InputVarient } from "../common/FormInput";
import TermsNotice from "../common/TermsNotice";
// import { Box, Typography, Divider, Button } from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '../common/Button'
import LinearProgress from "@mui/material/LinearProgress";
import { registerUser } from "../../services/Register";
import { useNavigate } from "react-router-dom";

function Register() {

  const [userData, setUserData] = React.useState({firstName: '', lastName: '' ,email: '', password: ''})

  const navigate = useNavigate();

  const onClickRegister = () =>{

    registerUser(userData).then((res)=>{
        console.log(res)
        navigate('/login');
    });
  }

  const handleSuccess = (token) =>{
    fetch("http://localhost:8000/api/auth/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      })
        .then((res) => res.json())
        .then((data) => console.log("Server Response:", data))
        .catch((err) => console.error("Error:", err));
  }

  const handleChange = (name, val) => {
    // console.log(name,val)
    const curUser = userData;
    curUser[name]= val;
    setUserData(curUser);
  }

  return (
    <Box
      sx={{
        maxWidth: 350,
        mx: "auto",
        my: 4,
        p: '75px',
        pt: '40px',
        border: "1px solid #ddd",
        borderRadius: 2,
        boxShadow: 3,
        textAlign: "center",
      }}
    >
      <Typography variant="h5" sx={{ mb: 2 , fontWeight: 600}}>
        Start Your 6-Month Trial
      </Typography>
      <Box justifyContent='center' display='flex' marginBottom='12px'>
        <LinearProgress sx={{borderRadius: 2, height: 8, width: '60%'}} variant="determinate" value={50} />
      </Box>
      <Typography variant="caption" color="#9E9E9E">
        Create your account: Step 1 of 2
      </Typography>
      <Divider sx={{ my: 3 }}/>

      <GoogleButton isRegister successCallback={(token) => handleSuccess(token)} />

      <Divider sx={{ my: 3, color:"#9E9E9E", fontSize: '14px' }}>OR</Divider>

      <form>
        <Box sx={{ display: 'flex', gap: '8px'}}>
          <FormInput
            label="First Name"
            type="text"
            name="firstName"
            required
            variant={InputVarient.outlined}
            onChangeFn={(ev)=> handleChange(ev.target.name, ev.target.value)}
          />
          <FormInput
            label="Last Name"
            type="text"
            name="lastName"
            required
            variant={InputVarient.outlined}
            onChangeFn={(ev)=> handleChange(ev.target.name, ev.target.value)}
          />
        </Box>
        <FormInput
          label="Email Address"
          type="email"
          name="email"
          required
          variant={InputVarient.outlined}
          onChangeFn={(ev)=> handleChange(ev.target.name, ev.target.value)}
        />
        <FormInput 
            label="Password"
            type="password"
            name="password"
            required
            variant={InputVarient.outlined}
            onChangeFn={(ev)=> handleChange(ev.target.name, ev.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          text='Register'
          onClickFn={()=>onClickRegister()}
        />
          
      </form>

      <TermsNotice />
    </Box>
  );
}

export default Register;

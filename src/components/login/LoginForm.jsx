// import * as React from 'react';


// export const Login = () => {
    
    //     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const [userData, setUserData] = React.useState({username: '', password: ''})

//     const onClickRegister = (ev) =>{
    //         ev.preventDefault();
    
    //         loginUser(userData).then((res)=>{
        //             LocalStorageService.setItemValue('token', res.data.access_token);
        //         }).then(()=>{
            //             return getLoggedProfile()
            //         }).then((res)=>{
                //             console.log(res)
                //             dispatch(updateUser(res.data));
                //             navigate('/app/dashboard')
                //         });
                //     }
                
                //     const handleChange = (name, val) => {
                    //         console.log(name,val)
                    //         const curUser = userData;
                    //         curUser[name]= val;
                    //         setUserData(curUser);
                    //     }
                    
                    //     return <div>
                    
                    //         <input type='text' name='username' placeholder='Username / Email' onChange={(ev, val)=>handleChange(ev.target.name, ev.target.value)} defaultValue='' />
                    //         <input type='password' name='password' placeholder='Password' onChange={(ev, val)=>handleChange(ev.target.name, ev.target.value)} defaultValue='' />
                    
                    //         <button onClick={(eve)=>onClickRegister(eve)}>Submit</button>
                    //     </div>
                    // }
                    
import React from "react";
import { Checkbox, Typography, Box, Divider, Link } from "@mui/material";
import FormInput, {InputVarient} from "../common/FormInput";
import GoogleButton from "../common/GoogleButton";
import Button from '../common/Button';
import logo from '../../assets/images/brand-logo.png';
import AlertSlider from "../common/AlertSlider";
import {useNavigate} from 'react-router-dom';
import { loginUser } from '../../services/Login';
import { getLoggedProfile } from '../../services/User';
import LocalStorageService from '../../utils/LocalStorage'
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/slices/UserSlice';


function SignInForm() {
  const [logedIn, setLoginIn] = React.useState(false);
  const [alertStatus, setAlertStatus] = React.useState({open: false, message: '', severity: ''});


  const handleSuccess = (token) =>{
    fetch("http://localhost:8000/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      })
        .then((res) => res.json())
        .then((data) => console.log("Server Response:", data))
        .then(()=> setAlertStatus({open: true, message: 'Login Succussfull!', severity: 'success'}))
        .catch((err) => console.error("Error:", err));
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userData, setUserData] = React.useState({username: '', password: ''})

  const onClickRegister = () =>{
    // ev.preventDefault();
    
    loginUser(userData).then((res)=>{
        LocalStorageService.setItemValue('token', res.data.access_token);
    }).then(()=>{
        return getLoggedProfile()
    }).then((res)=>{
        console.log(res)
        dispatch(updateUser(res.data));
        navigate('/app/dashboard')
    }).catch((err)=>{
        console.log(err.status);
        if(err.status == 404){
            setAlertStatus({
                open: true,
                message: 'Login Failed! Incorrect Password.',
                severity: 'error'
            })
        }
    });
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
        maxWidth: 380,
        margin: "auto",
        my: 4,
        padding: '68px',
        paddingTop: '48px',
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        boxShadow: 3,
        textAlign: 'left'
      }}
    >
      <img src={logo} alt="Fuzia.AI"  />
      <Typography sx={{fontWeight:'600', marginTop: '20px'}} variant="h6">
        Sign in to your account
      </Typography>
      <Typography variant="caption" color="#9E9E9E">
        New to Fuzia.AI? <Link color="#000" href="/signup">Start your 6 months free trial</Link>
      </Typography>
      
      <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
        <FormInput 
            label="Email Address" 
            type="email"
            name="username"
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
        <Box display="flex" alignItems="center">
          <Checkbox color="primary" />
          <Typography variant="body2">Remember me</Typography>
        </Box>
        <Button
          variant="contained"
        //   color="success"
          fullWidth
          text="Get Started"
          onClickFn={()=>onClickRegister()}
        >
          
        </Button>
      </Box>

      <Box sx={{ my: 3 }}>
        <Typography variant="body2">
          <Link href="/forgot-password" color="#000">Forgot your password?</Link> <br />
          {/* <Link href="/resend-confirmation" color="#000"> Didn’t receive confirmation instructions?</Link> */}
        </Typography>
      </Box>

      <Divider sx={{ my: 3, color: '#9E9E9E', fontSize: '14px' }}>OR</Divider>

      <GoogleButton successCallback={(token)=>handleSuccess(token)} />
        <AlertSlider message={alertStatus.message} severity={alertStatus.severity} open={alertStatus.open} onClose={()=>setAlertStatus({open: false})}/>
    </Box>
  );
}

export default SignInForm;

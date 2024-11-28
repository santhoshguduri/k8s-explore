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
                    
import React, { useState } from "react";
import { Checkbox, Typography, Box, Divider, Link, InputAdornment } from "@mui/material";
import FormInput, {InputVarient} from "../common/FormInput";
import GoogleButton from "../common/GoogleButton";
import Button from '../common/Button';
import logo from '../../assets/images/brand-logo.png';
import AlertSlider from "../common/AlertSlider";
import {useNavigate} from 'react-router-dom';
import { loginUser, sendOtpExistingUser } from '../../services/Login';
import { getLoggedProfile } from '../../services/User';
import LocalStorageService from '../../utils/LocalStorage'
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/slices/UserSlice';
import { oAuthLogin } from "../../services/OAuth";
import { resendOtp, verifyOtp } from "../../services/Register";
import OTPInput from "../common/OtpInput";
import { CheckCircle } from "@mui/icons-material";


function SignInForm() {
  const [logedIn, setLoginIn] = React.useState(false);
  const [userEmail, setUserEmail] = useState({value:'', error: false});
  const [alertStatus, setAlertStatus] = React.useState({open: false, message: '', severity: ''});
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerifyLoading, setVerifyLoading] = useState(false);
  const [isGeneratingOtp, setGeneratingOtp] = useState(false);
  const [otp, setOtp] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOAuthSuccess = (token) =>{
    oAuthLogin({token})
      .then((res) => {
        setAlertStatus({open: true, message: 'Login Succussfull!', severity: 'success'});
        dispatch(updateUser(res.data));
        navigate('/app/dashboard');
      })
      .catch((err) => console.error("Error:", err));
  }

  const handleOauthFailure = () => {
    setAlertStatus({
      open: true,
      message: 'Error trying to sign-in!',
      severity: 'error'
    })
  }

  const handleSendOtp = () =>{
    setGeneratingOtp(true)
    if(!userEmail.error){

      sendOtpExistingUser({email: userEmail.value}).then((res)=>{
        console.log(res)
        setAlertStatus({
          open: true,
          message: 'OTP sent. Please check your email!',
          severity: 'success'
        })
        setIsOtpSent(true);
        setGeneratingOtp(false);
      }).catch(err=>{
        console.log(err);
        if(err.status == 404){
          setAlertStatus({
              open: true,
              message: `${err.response.data.detail}! `,
              severity: 'error'
          })
        }
        setGeneratingOtp(false);
      });
    }else{
      setAlertStatus({
        open: true,
        message: 'Please provide valid details and try again!',
        severity: 'error'
      })
      setGeneratingOtp(false);
    }
  }

  const handleVerifyLoginOtp = (val=otp) =>{
    // ev.preventDefault();
    setVerifyLoading(true);
    const loginData={
      email: userEmail.value,
      otp: val
    }

    loginUser(loginData).then(()=>{
        navigate('/app/dashboard');
    }).catch((err)=>{
        console.log(err.status);
        if(err.status == 404){
            setAlertStatus({
                open: true,
                message: `${err.response.data.detail}`,
                severity: 'error'
            })
        }
    });
  }

  const resendGeneratedOtp = () => {
    resendOtp({email: userEmail.value}).then((res)=>{
      console.log(res)
      setAlertStatus({
        open: true,
        message: 'OTP sent successfully!',
        severity: 'Success'
    })
    }).catch(err=>console.log(err));
  }

  // const handleOtpVerification = (val=otp) => {
  //   setVerifyLoading(true);
  //   const otpData={
  //     email: userEmail.value,
  //     otp: val
  //   }
  //   verifyOtp(otpData).then(()=>{
  //     setVerifyLoading(false);
  //     navigate('/app/dashboard');
  //   }).catch((err)=>{
  //     if(err.status == 404 || err.status == 400){
  //       setAlertStatus({
  //         open: true,
  //         message: `${err.response.data.detail}!`,
  //         severity: 'error'
  //     })
  //     console.log(err);
  //     }
  //     setVerifyLoading(false);
  //   })
  // }

  const handleChangeEmail = (val) => {
    const emailRegex = /^(?=.{1,256})[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/
    let isValid=false;
    if(!emailRegex.test(val)){
      isValid = true;
    }
    setUserEmail({value: val, error: isValid});
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
            disabled={isOtpSent}
            variant={InputVarient.outlined}
            slotProps={isOtpSent &&{
              input: {
                endAdornment: (
                  <InputAdornment>
                    <CheckCircle sx={{color: '#91C862'}} />
                  </InputAdornment>
                ),
              },
            }}
            onChangeFn={(ev)=> handleChangeEmail(ev.target.value)}
        />
        {/* <FormInput 
            label="Password"
            type="password"
            name="password"
            required
            variant={InputVarient.outlined}
            onChangeFn={(ev)=> handleChange(ev.target.name, ev.target.value)}
        /> */}
        {isOtpSent &&
          <Box sx={{my: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}> 
          <Box sx={{width: '80%', marginBottom: '16px'}}>
            <OTPInput onChange={(val)=>setOtp(val)} onComplete={(val)=>handleVerifyLoginOtp(val)}/>
          </Box>
          <Typography variant="body2">
            A 4-digit OTP is sent on your email address
          </Typography>
          <Typography variant="body2">
            <Link href='#' onClick={()=>resendGeneratedOtp()}>Didn’t receive OTP? Resend</Link>
          </Typography>
        </Box>}
        <Box display="flex" alignItems="center">
          <Checkbox color="primary" />
          <Typography variant="body2">Remember me</Typography>
        </Box>
        <Button
          variant="contained"
        //   color="success"
          fullWidth
          text={isOtpSent ? "Login":"Get Sign-in Code"}
          disabled={isVerifyLoading || isGeneratingOtp}
          loading={isVerifyLoading || isGeneratingOtp}
          onClickFn={()=>{isOtpSent ? handleVerifyLoginOtp() : handleSendOtp()}}
        >
          
        </Button>
      </Box>


      <Divider sx={{ my: 3, color: '#9E9E9E', fontSize: '14px' }}>OR</Divider>

      <GoogleButton successCallback={(token)=>handleOAuthSuccess(token)} handleError={()=>handleOauthFailure()}/>
        <AlertSlider message={alertStatus.message} severity={alertStatus.severity} open={alertStatus.open} onClose={()=>setAlertStatus({open: false})}/>
    </Box>
  );
}

export default SignInForm;

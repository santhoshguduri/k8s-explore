import React, {useState} from "react";
import GoogleButton from "../common/GoogleButton";
import FormInput, { InputVarient } from "../common/FormInput";
import TermsNotice from "../common/TermsNotice";
// import { Box, Typography, Divider, Button } from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '../common/Button'
import LinearProgress from "@mui/material/LinearProgress";
import { registerUser, resendOtp, sendOtpNewUser, verifyOtp } from "../../services/Register";
import { useNavigate } from "react-router-dom";
import OTPInput from "../common/OtpInput";
import AlertSlider from "../common/AlertSlider";
import { InputAdornment, Link } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/slices/UserSlice';
import { oAuthRegisterUser } from "../../services/OAuth";

const regex = {
  firstName: /^[a-zA-Z]{1}[a-zA-Z\s'-]{0,49}$/,
  lastName: /^[a-zA-Z]{1}[a-zA-Z\s'-]{0,49}$/,
  email: /^(?=.{1,256})[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/,
}

function Register({setStep}) {

  const [userData, setUserData] = React.useState({firstName: '', lastName: '' ,email: ''})
  const [error, setError] = useState({firstName: false, lastName: false, email: false});
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [alertStatus, setAlertStatus] = React.useState({open: false, message: '', severity: ''});
  const [isVerifyLoading, setVerifyLoading] = useState(false);
  const [isGeneratingOtp, setGeneratingOtp] = useState(false);
  const [otp, setOtp] = useState('');


  const dispatch = useDispatch();
  const navigate = useNavigate();
  let helperFucn = () => {}

  const onClickRegister = () =>{
    setGeneratingOtp(true)
    const {firstName, lastName, email} = error;
    if(!firstName && !lastName && !email){

      sendOtpNewUser({email: userData.email}).then((res)=>{
        console.log(res)
        
        setIsOtpSent(true);
      }).then(()=>setGeneratingOtp(false))
      .catch(err=>{
        console.log(err);
        if(err.status==400){
          setAlertStatus({
            open: true,
            message: err.response.data.detail,
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

  const resendPassword = () => {
    resendOtp({email: userData.email}).then((res)=>{
      console.log(res)
      
    }).catch(err=>console.log(err));
  }

  const handleOAuthSuccess = (token) =>{
    setVerifyLoading(true);
    oAuthRegisterUser({token})
      .then((res) => {
        console.log("Server Response:", res);
        dispatch(updateUser(res.data));
        setVerifyLoading(false);
        setStep(2);
      })
      .catch((err) => {
        setAlertStatus({
            open: true,
            message: `${ err.status==400 ? `${err.response.data.detail}! Please Login.` : 'Sign up failed!'}`,
            severity: 'error'
        })
        setVerifyLoading(false);
        console.error("Error:", err)
      });
  }

  const handleChange = (name, val) => {
    // console.log(name,val)
    const curUser = userData;
    curUser[name]= val;
    setUserData({...userData, ...curUser});

    handleErrors(name, val);
  }

  const handleErrors = (field, val) => {

    let isErrorval = false; 
    if(regex[field].test(val)){
      isErrorval = false;
    } else {
      isErrorval = true;
    }

    const curErrors = error;
    curErrors[field]= isErrorval;
    setError({...error, ...curErrors});

  }

  const handleOtpVerification = (val=otp) => {
    setVerifyLoading(true);
    const otpData={
      email: userData.email,
      otp: val
    }
    verifyOtp(otpData).then((res)=>{
      return registerUser(userData)
    }).then((res)=>{
      console.log(res);
      dispatch(updateUser(res.data));
      setVerifyLoading(false);
      setStep(2);
    }).catch((err)=>{
      if(err.status == 404 || err.status == 400){
        setAlertStatus({
          open: true,
          message: `${err.response.data.detail}!`,
          severity: 'error'
      })
      console.log(err);
      }
      setVerifyLoading(false);
    })
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

      <GoogleButton isRegister successCallback={(token) => handleOAuthSuccess(token)} />

      <Divider sx={{ my: 3, color:"#9E9E9E", fontSize: '14px' }}>OR</Divider>

      <form>
        <Box sx={{ display: 'flex', gap: '8px'}}>
          {!isOtpSent &&<><FormInput
            label="First Name"
            type="text"
            name="firstName"
            required
            error={error.firstName}
            // helperText={error.firstName && `Please provide valid first name`}
            variant={InputVarient.outlined}
            onChangeFn={(ev)=> handleChange(ev.target.name, ev.target.value)}
          />
          <FormInput
            label="Last Name"
            type="text"
            name="lastName"
            required
            error={error.lastName}
            // helperText={ error.lastName && `Please provide valid last name`}
            variant={InputVarient.outlined}
            onChangeFn={(ev)=> handleChange(ev.target.name, ev.target.value)}
          /></>}
        </Box>
        <FormInput
          label="Email Address"
          type="email"
          name="email"
          required
          disabled={isOtpSent}
          error={error.email}
          // helperText={error.email && `Please provide valid email`}
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
          onChangeFn={(ev)=> handleChange(ev.target.name, ev.target.value)}
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
            <OTPInput onChange={(val)=>setOtp(val)} onComplete={(val)=>handleOtpVerification(val)}/>
          </Box>
          <Typography variant="body2">
            A 4-digit OTP is sent on your email address
          </Typography>
          <Typography variant="body2">
            <Link href='#' onClick={()=>resendPassword()}>Didn’t receive OTP? Resend</Link>
          </Typography>
        </Box>}
          
        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={isVerifyLoading || isGeneratingOtp}
          text={isOtpSent ? 'Verify': 'Get Sign Up Code'}
          onClickFn={()=>{isOtpSent? handleOtpVerification() : onClickRegister()}}
          loading={isVerifyLoading || isGeneratingOtp}
        />
          
      </form>

      <TermsNotice />
      <AlertSlider message={alertStatus.message} severity={alertStatus.severity} open={alertStatus.open} onClose={()=>{setAlertStatus({open: false});helperFucn();}}/>

    </Box>
  );
}

export default Register;

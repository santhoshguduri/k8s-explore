import React, { useState } from 'react';
import {
  Box,
  InputAdornment,
  Typography,
} from '@mui/material';
import TermsNotice from '../TermsNotice';
import FormInput from '../FormInput';
import ToggleButton from '../ToggleButton';
import CreditCardForm from '../../CreditCardForm';
import { useDispatch, useSelector } from 'react-redux';
import { CheckCircle } from '@mui/icons-material';


const FreeTrialForm = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const currentUser = useSelector(state=> state.currentUser);


  const handleBillingCycleChange = (event, newCycle) => {
    if (newCycle) setBillingCycle(newCycle);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted!');
  };

  return (
    <Box
      sx={{
        maxWidth: 550,
        mx: "auto",
        my: 4,
        p: '45px',
        pt: '40px',
        border: "1px solid #ddd",
        borderRadius: 2,
        boxShadow: 3,
        textAlign: "center",
      }}
    >
      <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
        Get your Free Trial
      </Typography>
      <Typography variant="body2" align="center" marginBottom='16px'>
        After 6-Month Free Trial: $123.00/month <Typography variant="caption" align="center" color="textSecondary">+ applicable taxes</Typography>
      </Typography>
        
      <ToggleButton />
      <form onSubmit={handleSubmit}>
        {/* Account Details */}
        <Typography variant="subtitle1" align='left' fontWeight="bold">
          Account Detail
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: '8px',
          }}
        >
          <FormInput 
            label="First Name" 
            value={currentUser.firstname} 
            disabled 
            fullWidth 
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment>
                    <CheckCircle sx={{color: '#91C862'}} />
                  </InputAdornment>
                ),
              },
            }}
            required 
          />
          <FormInput 
            label="Last Name" 
            value={currentUser.lastname} 
            disabled 
            fullWidth 
            required 
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment>
                    <CheckCircle sx={{color: '#91C862'}} />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <FormInput 
            label="Email Address" 
            type="email" 
            value={currentUser.email}
            fullWidth 
            required 
            disabled
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment>
                    <CheckCircle sx={{color: '#91C862'}} />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        {/* Payment Information */}
        <Typography variant="subtitle1" align='left' fontWeight="bold">
          Payment Information
        </Typography>
        <Box
          sx={{
            margin: '8px 0'
          }}
        >
          <CreditCardForm />
        </Box>

        {/* <Typography variant="body2" align='left' margin="16px 0px" >
          <a href="#tax" style={{ color: '#000' }}>
            Do you have a tax number?
          </a>
        </Typography> */}

        {/* Submit Button */}
        

        <Typography>
          <TermsNotice /><Typography variant='caption' color="textSecondary"> and to receive marketing</Typography>
        </Typography>
        <Typography variant='caption' color="textSecondary">After your free trial, you can cancel anytime.</Typography>
      </form>
    </Box>
  );
};

export default FreeTrialForm;

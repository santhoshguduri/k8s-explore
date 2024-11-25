import React, { useState } from 'react';
import {
  Box,
  Typography,
} from '@mui/material';
import {
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import TermsNotice from '../TermsNotice';
import FormInput from '../FormInput';
import Button from '../Button'
import ToggleButton from '../ToggleButton';
import CreditCardForm from '../../CreditCardForm';

const stripePromise = loadStripe("pk_test_51QP5dDKgrLAHVIRdqsv7t6G2N30tWlgn2RJtB4bi2Z9zryMGMqhOjEMro50AAUoKxGqdKBGRGBK36jA4UxJQZzCG006XVApTzJ");

const FreeTrialForm = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

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
          <FormInput label="First Name" fullWidth required />
          <FormInput label="Last Name" fullWidth required />
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <FormInput label="Email Address" type="email" fullWidth required />
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
          <Elements stripe={stripePromise}>
            <CreditCardForm />
          </Elements>
        </Box>

        <Typography variant="body2" align='left' margin="16px 0px" >
          <a href="#tax" style={{ color: '#000' }}>
            Do you have a tax number?
          </a>
        </Typography>

        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          text='Start Free Trial'
        //   onClickFn={()=>onClickRegister()}
        />

        <Typography>
          <TermsNotice /><Typography variant='caption' color="textSecondary"> and to receive marketing</Typography>
        </Typography>
        <Typography variant='caption' color="textSecondary">After your free trial, you can cancel anytime.</Typography>
      </form>
    </Box>
  );
};

export default FreeTrialForm;

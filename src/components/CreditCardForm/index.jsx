import React, { useState } from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Box, Typography, CircularProgress } from "@mui/material";
import Button from '../common/Button'
import { loadStripe } from "@stripe/stripe-js";
import { verifyCard } from "../../services/Register";
import { useSelector } from "react-redux";
import AlertSlider from "../common/AlertSlider";
import { useNavigate } from "react-router-dom";

// Load Stripe (Replace with your Publishable Key)
const stripePromise = loadStripe("pk_test_51QP5dDKgrLAHVIRdqsv7t6G2N30tWlgn2RJtB4bi2Z9zryMGMqhOjEMro50AAUoKxGqdKBGRGBK36jA4UxJQZzCG006XVApTzJ");


const CreditCardForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [alertStatus, setAlertStatus] = React.useState({open: false, message: '', severity: ''});

  const navigate = useNavigate();
  const currentUser = useSelector(state=> state.currentUser);

  const handleSubmit = () => {
    // event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // Create a Payment Method (tokenization)
    stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    }).then(({error, paymentMethod})=>{
        if (error) {
            setAlertStatus({
                open: true,
                message: 'Error processing card details',
                severity: 'error'
              })
            throw new Error('')
        }
        return verifyCard({paymentMethodId: paymentMethod.id, email: currentUser.email })
    }).then((res)=>{
        console.log(res);
        setAlertStatus({
            open: true,
            message: 'Card verified and saved successfully!',
            severity: 'success'
          })
        // setMessage("Card verified and saved successfully!");
        setLoading(false);
        navigate('/app/dashboard');
    }).catch((err)=>{
        console.log(err);
        // setMessage(`Error: ${err}`);
        setLoading(false);
    });

  };

  return (
    <Box>
      <form>
        <Box
            sx={{
                padding: 2,
                borderRadius: 2,
                border:"1px solid #9E9E9E",
                marginBottom: '12px'
              }}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": { color: "#aab7c4" },
                },
                invalid: { color: "#9e2146" },
              },
            }}
          />
        </Box>
        
      </form>
      <Button
          variant="contained"
          color="primary"
          fullWidth
          text='Start Free Trial'
          loading={loading}
          onClickFn={()=>handleSubmit()}
        />
      <AlertSlider message={alertStatus.message} severity={alertStatus.severity} open={alertStatus.open} onClose={()=>{setAlertStatus({open: false});}}/>

    </Box>
  );
};


const CreditCardFormWrapper = () => {
    return(
        <Elements stripe={stripePromise}>
          <CreditCardForm />
        </Elements>
    )
};

export default CreditCardFormWrapper;
import React, { useState } from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button, Box, Typography, CircularProgress } from "@mui/material";

// Load Stripe (Replace with your Publishable Key)

const CreditCardForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    if (!stripe || !elements) {
      setMessage("Stripe is not loaded yet.");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // Create a Payment Method (tokenization)
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    // Send paymentMethod.id to your backend for verification and saving
    const response = await fetch("/api/verify-card", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentMethodId: paymentMethod.id }),
    });

    const result = await response.json();

    if (response.ok) {
      setMessage("Card verified and saved successfully!");
    } else {
      setMessage(`Error: ${result.error}`);
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        // maxWidth: 500,
        // margin: "auto",
        padding: 2,
        // boxShadow: 3,
        borderRadius: 2,
        border:"1px solid #9E9E9E",
        // backgroundColor: "white",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box>
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
      {message && (
        <Typography color={message.startsWith("Error") ? "error" : "success"} mt={2}>
          {message}
        </Typography>
      )}
    </Box>
  );
};


export default CreditCardForm;

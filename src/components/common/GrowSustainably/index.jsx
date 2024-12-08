import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

const benefits = ['Increase Revenue!', 'Save Your Money!', 'Free Up Time!'];

const GrowSustainably = () => {
  return (
    <Box sx={{ padding: '50px 20px', textAlign: 'center' }}>
      <Typography
       variant="h1"
       sx={{
       //   fontSize: "64px",
         fontWeight: "bold",
         background:
           "linear-gradient(90deg, #91C862 10%, #009ce1 45%, #8667d6 70%)",
         backgroundClip: "text",
         textFillColor: "transparent",
       }}
       >
        Grow Sustainably
      </Typography>
      <Typography variant="subtitle1" fontWeight="bold" fontSize="45px" sx={{ marginBottom: '20px' }}>
        Simple No-Code Platform!
      </Typography>
      <Grid container spacing={2}>
        {benefits.map((benefit, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Typography variant="body1" fontWeight="bold">
              {benefit}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GrowSustainably;

import React from 'react';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import dotBackground from './dot-background1.png'
import GrowIcon from './grow-icon.png';
import DollerIcon from './doller-icon.png';
import TimeIcon from './time-icon.png';

const benefits = [{name: 'Increase Revenue!', icon: GrowIcon}, {name: 'Save Your Money!', icon: DollerIcon }, {name: 'Free Up Time!', icon: TimeIcon }];

const GrowSustainably = () => {
  return (
    <Box sx={{ padding: '50px 20px', textAlign: 'center' }}>
      <Typography
       variant="h1"
       sx={{
         fontSize: "120px",
         fontWeight: "bold",
         background:
           "linear-gradient(90deg, #91C862 10%, #009ce1 45%, #8667d6 70%)",
         backgroundClip: "text",
         textFillColor: "transparent",
       }}
       >
        Grow Sustainably
      </Typography>
      <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
      <Typography variant="subtitle1" fontWeight="bold" fontSize="45px">
        Simple No-Code Platform!
      </Typography>
        <Grid 
          container
          spacing={2} 
          sx={{ 
            position: 'relative',
            '&::before': {
              position: 'absolute',
              content: '" "',
              width: '100%',
              height: '100%',
              top: -40,
              left: 0,
              backgroundSize: 'cover', 
              backgroundRepeat: 'no-repeat',
              zIndex: -1,
              backgroundImage: `url(${dotBackground})`, 
              paddingBottom: '110px'
            },
            padding: '40px 120px 0px 120px',
            marginBottom: '20px',
            }}>
          {benefits.map((benefit, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Box 
                sx={{
                  borderRadius:'40px', 
                  border: '1px solid #E0D9E4' ,
                  width:'110px', 
                  padding: '20px 35px', 
                  background: '#fff', 
                  boxShadow: 3,
                }} >
                <img src={`${benefit.icon}`} />
                <Typography variant="body1" fontWeight="bold">
                  {benefit.name}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default GrowSustainably;

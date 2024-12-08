import React from 'react';
import { Box, Typography } from '@mui/material';
import HomeImage2 from '../../../assets/images/HomeImage2.png';
import Star from '../../../assets/images/star-star.png';

const WhyChooseUs = () => {
  return (
    <Box sx={{
        display: 'flex',
        justifyContent: 'center'
    }}>

    <Box sx={{ py: '50px', display: 'flex', gap: '100px', width: '1240px' }}>
        <img src={HomeImage2} />
        <Box textAlign='left' paddingRight="80px">
            <Typography variant="h4" fontWeight="bold" fontSize="52px">
              You Don’t Need Multiple Platforms to Grow Your{` `}<span><img src={Star} /></span>
            </Typography>
            <Typography fontWeight="bold" fontSize="52px">Coaching Business</Typography>
            <Typography variant="body1" sx={{ marginTop: '20px' }}>
              Coaches & Creators trust Fuzia.AI as a one-stop platform to save money, grow revenue, free up time, and connect with visionaries.
            </Typography>
        </Box>
    </Box>
    </Box>
  );
};

export default WhyChooseUs;

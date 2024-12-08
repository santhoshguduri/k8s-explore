import React from 'react';
import { Grid, Typography, Box } from '@mui/material';

const features = [
  { title: 'Powered by Tech & AI', description: 'Automate your business' },
  { title: 'Trusted over 13+ Years', description: '' },
  { title: 'Spread in 35+ Countries', description: '' },
  { title: 'Loved by 5 Million women community', description: '' },
];

const FeaturesSection = () => {
  return (
    <Box sx={{ padding: '50px 20px', textAlign: 'center' }}>
      <Grid container spacing={2}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Box>
              <Typography variant="h6" fontWeight="bold">
                {feature.title}
              </Typography>
              <Typography variant="body2" sx={{ marginTop: '8px' }}>
                {feature.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FeaturesSection;

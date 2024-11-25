import React, { useState } from 'react';
import { Box, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';

const ToggleBtn = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const handleBillingCycleChange = (event, newCycle) => {
    if (newCycle) setBillingCycle(newCycle);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 2,
      }}
    >
      <ToggleButtonGroup
        value={billingCycle}
        exclusive
        onChange={handleBillingCycleChange}
        sx={{
          display: 'flex',
          borderRadius: 25,
          overflow: 'hidden',
          border: '1px solid #ccc',
        }}
      >
        <ToggleButton
          value="annual"
          sx={{
            borderRadius: '10px',
            padding: '4px 20px',
            fontWeight: 'bold',
            textTransform: 'none',
            border: 'none',
            '&.Mui-selected': {
              backgroundColor: '#31342F',
              color: '#fff',
              borderRadius: 25,
              '&:hover': {
                backgroundColor: '#31342F',
                color: '#fff', 
              }
            },
          }}
        >
          Annual
        </ToggleButton>
        <ToggleButton
          value="monthly"
          sx={{
            borderRadius: 25,
            padding: '4px 20px',
            fontWeight: 'bold',
            textTransform: 'none',
            border: 'none',
            '&.Mui-selected': {
              backgroundColor: '#31342F',
              color: '#fff',
              borderRadius: 25,
              '&:hover': {
                backgroundColor: '#31342F',
                color: '#fff', 
              }
            },
          }}
        >
          Monthly
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default ToggleBtn;

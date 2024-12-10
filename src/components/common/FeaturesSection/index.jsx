import React from 'react';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import FeatureDemo2 from './FeatureDemo1.png';
import FeatureDemo1 from './FeatureDemo2.png';

const FeaturesSection = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#F0F8E8',
        padding: '80px 100px',
        borderRadius: '8px',
      }}
    >
      <Box display='flex' gap='120px' marginBottom='80px'>
        <Box flex='9 1' padding="20px 0px" textAlign='left'>
          <Typography variant="h4" fontSize='28px' fontWeight="bold" marginBottom='40px'>
            Create your Digital Twin with AI
          </Typography>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            CRM & Smart Nudge
          </Typography>
          <Typography variant="body1" fontSize='20px' paragraph>
            Stay connected and engaged with your potential, existing, and past clients. Receive timely reminders for important actions, compassionate message suggestions, and automated follow-ups. With smart scheduling and real-time notifications, you’ll never miss a chance to deepen client relationships.
          </Typography>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Lead Magnet Builder
          </Typography>
        </Box>

        <Box flex='11 1'>
          <Box
            component="img"
            src={FeatureDemo1}
            alt="Above Section Image"
            sx={{
              width: '100%',
              borderRadius: '8px',
            }}
          />
        </Box>
      </Box>

      <Box display='flex' gap='120px'>
        <Box flex='11 1'>
          <Box
            component="img"
            src={FeatureDemo2}
            alt="Below Section Image"
            sx={{
              width: '100%',
              borderRadius: '8px',
            }}
          />
        </Box>

        <Box flex='9 1' padding="20px 0px" textAlign='left'>
          <Typography variant="h4" fontSize='28px' fontWeight="bold" marginBottom='40px'>
            Coach the Coach Community
          </Typography>
          <Typography variant="body1" fontSize='20px' paragraph>
            Stay connected and engaged with your potential, existing, and past clients. Receive timely reminders for important actions, compassionate message suggestions, and automated follow-ups. With smart scheduling and real-time notifications, you’ll never miss a chance to deepen client relationships.
          </Typography>
          <Typography variant="h6" fontWeight="bold" marginBottom='20px'>
            Amplify Your Leadership Story
          </Typography>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Outsource Smart, Hire the Best
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default FeaturesSection;

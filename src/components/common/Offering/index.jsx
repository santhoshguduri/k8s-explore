import { Box, Typography } from "@mui/material";
import backImage from './bg1.png';
import TextFieldButton from "../TextFieldButton";

const Offering = () => {
    return(
        <Box
          sx={{
            backgroundColor: "#fff",
            py: 4,
            mx: { xs: 2, md: 12 },
            my: 4,
            flexGrow: 1,
            backgroundImage: `url(${backImage})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'round',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
            <Box width="70%" py="40px">
            <Typography variant="h2" fontWeight='bold' marginBottom="32px">
                Technology + Expert = Complete Support Solution
            </Typography>
            <Typography>
                The combination of Fuzia.AI and Fuzia Talent offers a 360-degree 
            </Typography>
            <Typography marginBottom="32px"> support system that revolutionizes your workday.</Typography>
            <Typography marginBottom="32px">Take Control of Your Coaching Business Today</Typography>
            <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: '70px',
                }}
                >
            <Box
              sx={{
                  width: '60%'
              }}
              >
              <TextFieldButton />
              </Box>
          
            </Box>
            </Box>
        </Box>
    )
}

export default Offering;
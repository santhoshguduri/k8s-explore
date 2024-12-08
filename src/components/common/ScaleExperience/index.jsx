import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import React from "react";
import CircleCheck from '../../../assets/images/circle-check.png'
import bg1 from '../../../assets/images/Home10xBack.png'

export const Frame = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: "center" }}>
      <Box sx={{ width: "1240px" }} >
        <Grid sx={{ 
                textAlign: "center", 
                mt: 6,
                position: 'relative',
                "&::before": {
                    content: '""',
                    position: 'absolute',
                    top: 8,
                    left: 368,
                    width: "400px",
                    height: "100%",
                    backgroundImage: `url(${bg1})`, 
                    backgroundSize: 'contain', 
                    backgroundRepeat: 'no-repeat',
                    filter: 'blur(20px)',
                    zIndex: -1,
                }
             }}>
          <Typography sx={{ fontSize:"64px", display:"flex", fontWeight:"bold", justifyContent: 'center', alignItems: 'center'}} component="div">
            <Box>SCALE{" "}</Box>
            <Box component="span" 
                sx={{ 
                    fontWeight: "bold", 
                    fontSize: '160px', 
                    
                    padding: '0px 20px',
                    
                }}>
              10X
            </Box>{" "}
            <Box>Experience</Box>
          </Typography>
        </Grid>
      <Grid container spacing={`170px`} sx={{ position: 'relative', top: '-20px', justifyContent: 'center' }}>
        <Grid item xs={6}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <img src={CircleCheck} />
            <Typography sx={{ ml: 2 }}>
              Increased Email lists
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <img src={CircleCheck} />
            <Typography sx={{ ml: 2 }}>
              Retained Clients
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
          <img src={CircleCheck} />
          <Typography sx={{ ml: 2 }}>
            Saved cost of multiple tools
          </Typography>
          </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <img src={CircleCheck} />
              <Typography sx={{ ml: 2 }}>
                Enhanced Lead Pipelines
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <img src={CircleCheck} />
              <Typography sx={{ ml: 2 }}>
                Stronger Networking and Engagement
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img src={CircleCheck} />
              <Typography sx={{ ml: 2 }}>
                More time to work on your genius
              </Typography>
            </Box>
          </Grid>
          </Grid>
          </Box>
          </Box>
          );
};

export default Frame;


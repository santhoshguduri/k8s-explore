import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import TextFieldButton from "../../../components/common/TextFieldButton";
import SectionImage from './HomeImage1.png';

const HeroSection = () => {
  return (
    <Box
      sx={{
        background: "radial-gradient(circle, #CD8FFF26 , #EFF4CD26 , #91CA6126 , #C6DE6426 )",
        backgroundPosition: "top left",
        backgroundSize: "200% 200%", // Enlarges the gradient for clipping
        // clipPath: "polygon(0 0, 100% 0, 0 100%)",
        height: '650px',
        padding: "80px 20px",
        textAlign: "center",
        marginBottom: '160px'
      }}
    >
    <Box
        sx={{
        //   fontSize: "64px",
          fontWeight: "bold",
          display: 'flex',
          justifyContent: 'center'
        }}
    >
      <Typography
        variant="h1"
        sx={{
        //   fontSize: "64px",
          fontWeight: "bold",
          background:
            "linear-gradient(90deg, #91C862, #0091EA, #8667D6)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginRight: "1rem"
        }}
      >
        Your Partner
      </Typography>
      <Typography fontWeight='bold' variant="h1"> in</Typography>
      </Box>
      <Typography
        variant="h1"
        fontWeight='bold'
        sx={{}}
        >Scaling Success</Typography>

      <Typography
        // variant="h6"
        sx={{
          color: "#555",
          margin: "20px auto",
          maxWidth: "700px",
        }}
      >
        Grow Leads as Coaches & Solopreneurs, Stay Connected with Customers, and
        Scale Business with Your AI Twin & Tools.
      </Typography>
      <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '70px',
        }}
        >
      <Box
        sx={{
            width: '35%'
        }}
        >
        <TextFieldButton />
        </Box>

      </Box>
      <img src={SectionImage}/>
    </Box>
  );
};

export default HeroSection;

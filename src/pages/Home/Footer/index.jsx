import React from "react";
import { Box, Typography, Link } from "@mui/material";
import Grid from '@mui/material/Grid2';
import FuziaOriginal from './fuzia-original.png';
import FuziaTalent from './fuzia-talent.png';
import OpenGrowthImg from './opengrowth-logo.png';
import FuziaAIFade from './Fuzia-fade-background.png';

const Footer = () => {
  return (
    <>
    <Box
      sx={{
        backgroundColor: "#fff",
        paddingTop: 4,
        px: { xs: 2, md: 16 },
        flexGrow: 1,
      }}
    >
      <Grid container spacing={4}>
        {/* Powered By Section */}
        <Grid item xs={12} md={8} size={8} textAlign="left">
          <Typography variant="subtitle1" fontSize={20} marginBottom="20px">
            Powered By
          </Typography>
          <Box sx={{ display: "flex",gap: 2 }}>
            <img
              src={FuziaOriginal}
              alt="fuzia-logo"
            />
            <img
              src={FuziaTalent}
              alt="Fuzia Logo 2"
            />
          </Box>
          <Typography
            variant="subtitle1"
            fontSize={20}
            sx={{ mt: 3 }}
            marginBottom="20px"
          >
            An Initiative By
          </Typography>
          <img
            src={OpenGrowthImg}
            alt="Open Growth Logo"
          />
        </Grid>

        {/* Quick Links Section */}
        <Grid item xs={12} md={2} size={2}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Quick Links
          </Typography>
          <Box color="#31342F">
            <Link
              href="#"
              underline="none"
              color="inherit"
              display="block"
              sx={{ mb: 1 }}
            >
              Home
            </Link>
            <Link
              href="#"
              underline="none"
              color="inherit"
              display="block"
              sx={{ mb: 1 }}
            >
              About
            </Link>
            <Link
              href="#"
              underline="none"
              color="inherit"
              display="block"
              sx={{ mb: 1 }}
            >
              Services
            </Link>
            <Link
              href="#"
              underline="none"
              color="inherit"
              display="block"
              sx={{ mb: 1 }}
            >
              Testimonials
            </Link>
            <Link href="#" underline="none" color="inherit" display="block">
              FAQs
            </Link>
          </Box>
        </Grid>

        {/* Contact Section */}
        <Grid item xs={12} md={2} size={2}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Contact Us
          </Typography>
          <Box color="#31342F">
            <Link
              href="#"
              underline="none"
              color="inherit"
              display="block"
              sx={{ mb: 1 }}
            >
               +1 650 223 8066
            </Link>
            <Link
              href="#"
              underline="none"
              color="inherit"
              display="block"
              sx={{ mb: 1 }}
            >
              info@fuziatalent.com
            </Link>
            <Link
              href="#"
              underline="none"
              color="inherit"
              display="block"
              sx={{ mb: 1 }}
            >
              info@fuzia.com
            </Link>
          </Box>
        </Grid>
      </Grid>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 4,
          pt: 2,
        }}
      >
        <Typography variant="body2" color="#9E9E9E">
          © 2024 Fuzia.AI all rights reserved
        </Typography>
        <Typography variant="body2" color="#9E9E9E">
          <Link href="#" underline="none" color="inherit" sx={{ mr: 2 }}>
            Terms & Conditions
          </Link>
          |
          <Link href="#" underline="none" color="inherit" sx={{ ml: 2 }}>
            Privacy Policy
          </Link>
        </Typography>
      </Box>
    </Box>

    <Box
      component="img"
      src={FuziaAIFade}
      alt="Below Section Image"
      sx={{
        width: '100%',
        borderRadius: '8px',
      }}
    />
    </>
  );
};

export default Footer;

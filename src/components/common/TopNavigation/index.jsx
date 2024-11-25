import React from "react";
import MUIButton from "../Button";
// import * as styles from "./styles.scss";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import logo from '../../../assets/images/brand-logo.png';

function TopNavigation() {
  return (
    <AppBar 
      position="sticky"
      sx={{ 
        background: '#fff',
        borderBottomLeftRadius: 20,
        border: '1px solid #C6DE64',
        borderBottomRightRadius: 20 }}>
      <Toolbar 
        sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          
          height: '100px',}}>
        
          <img src={logo} alt="Fuzia.AI"  />
      
        <Box sx={{ display: "flex", gap: 2 }}>
          <MUIButton text="Features" secondary />
          <MUIButton text="Resources" secondary/>
          <MUIButton text="Pricing" secondary/>
          <MUIButton text="FAQs" secondary/>
        </Box>
        <Box display='flex' gap={2} >
          <MUIButton text="Login" secondary endIcon={<PersonIcon color="primary"/>} />
          <MUIButton text="Get Started" variant="contained" />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopNavigation;

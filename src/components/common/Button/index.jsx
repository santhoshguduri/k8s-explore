import React from "react";
import Button from "@mui/material/Button";

export const ButtonTheme = {
  TEXT: 'text',
  ICON : 'icon',
  STANDARD: 'standard' //both icon & text
}

function MUIButton({ text, variant = "text", secondary, fullWidth, startIcon, endIcon, onClickFn }) {
  return (
    <Button 
        variant={variant} 
        sx={{borderRadius:'80px', textTransform: 'none'}}
        color={ secondary ? 'secondary' : 'primary'}
        fullWidth={fullWidth}
        startIcon={startIcon}
        endIcon={endIcon}
        size="large"
        onClick={()=>onClickFn()}
    >
      {text}
    </Button>
  );
}

export default MUIButton;

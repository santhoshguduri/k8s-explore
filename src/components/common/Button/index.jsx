import React from "react";
import Button from "@mui/material/Button";
import LoadingButton from '@mui/lab/LoadingButton';

export const ButtonTheme = {
  TEXT: 'text',
  ICON : 'icon',
  STANDARD: 'standard' //both icon & text
}

function MUIButton({ text, variant = "text", secondary, disabled, loading, loadingText, fullWidth, startIcon, endIcon, onClickFn }) {
  return (
    <LoadingButton
      // size="small"
      onClick={()=>onClickFn()}
      loading={loading}
      loadingIndicator={loadingText}
      variant={variant} 
      loadingPosition="end"
      sx={{borderRadius:'80px', textTransform: 'none'}}
      color={ secondary ? 'secondary' : 'primary'}
      fullWidth={fullWidth}
      startIcon={startIcon}
      endIcon={endIcon}
      disabled={disabled}
    >
      {text}
    </LoadingButton>
  );
}

export default MUIButton;

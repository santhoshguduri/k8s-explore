import React from "react";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const InputVarient={
  outlined:"outlined",
}

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          borderColor:"#9E9E9E",
        },
      },
    },
  },
});

function FormInput({ label, name, type, variant, required, disabled, error, value, slotProps, helperText, onChangeFn }) {
  return (
    <ThemeProvider theme={theme}>
      <TextField
        fullWidth
        label={label}
        type={type}
        sx={{
          marginTop: '8px',
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: '#4caf50', 
            }
          },
          '& .MuiInputLabel-root': {
            // fontSize: '15px',
            color:"#9E9E9E",
            '&.Mui-focused': {
              color: '#4caf50'
            }
          }
        }}
        variant={variant}
        margin="normal"
        // size="small"
        name={name}
        disabled={disabled}
        required={required}
        error={error}
        slotProps={slotProps}
        helperText={helperText}
        defaultValue={value}
        onChange={(ev, val)=>onChangeFn(ev, val)}
      />
    </ThemeProvider>
  );
}

export default FormInput;

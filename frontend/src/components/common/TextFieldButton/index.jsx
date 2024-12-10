import ArrowDropDownIcon from "@mui/icons-material/Mail";
import { Box, Button, InputBase } from "@mui/material";
import React from "react";

const TextFieldButton = () => {
  return (
    <Box
      sx={{
        width: '100%',
        // height: 66,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: "white",
        borderRadius: "80px",
        border: "0.72px solid #c2c2c2",
        backdropFilter: "blur(21.82px) brightness(100%)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          pl: 2,
        }}
      >
        <ArrowDropDownIcon sx={{ color: "#c8c4cd" }} />
        <InputBase
          placeholder="Enter email address"
          sx={{
            ml: 1,
            color: "#c8c4cd",
            fontFamily: "Poppins, Helvetica",
            fontSize: "15.8px",
            fontWeight: 300,
          }}
        />
      </Box>
      <Button
        variant="contained"
        sx={{
          width: 187,
          height: 66,
          bgcolor: "#91c862",
          borderRadius: "80px",
          textTransform: "none",
          fontFamily: "Poppins, Helvetica",
          fontSize: "15.8px",
          fontWeight: 500,
        }}
      >
        Start Free Trail
      </Button>
    </Box>
  );
};

export default TextFieldButton;

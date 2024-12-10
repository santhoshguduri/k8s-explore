import React, { useState } from "react";
import { Snackbar, Alert } from "@mui/material";

const AlertSlider = ({open, message, severity = "error", onClose, duration = 3000}) => {

  return (
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={duration}
        onClose={onClose}
      >
        <Alert severity={severity} onClose={onClose}>
          {message}
        </Alert>
      </Snackbar>
  );
};

export default AlertSlider;

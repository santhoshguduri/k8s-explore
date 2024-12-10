import React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

function TermsNotice() {
  return (
    <Typography variant="caption" margin='8px 0px' color="#9E9E9E" sx={{ margin: '8px 0 !important', textAlign: "center" }}>
      By proceeding, you agree to our{" "}
      <Link href="#terms" underline="hover">
        Platform Terms
      </Link>{" "}
      &{" "}
      <Link href="#privacy" underline="hover">
        Privacy Notice
      </Link>.
    </Typography>
  );
}

export default TermsNotice;

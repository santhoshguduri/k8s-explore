import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

function GoogleButton({successCallback}) {
  const handleSuccess = (response) => {
    console.log("Encoded JWT ID token:", response.credential);

    // Send the token to the backend for validation
    successCallback(response.credential);
  };

  const handleError = () => {
    console.error("Login Failed");
  };

  return (
    <GoogleOAuthProvider clientId="520425927005-qorg9ek2lb9h80dcdnntqvdtjsn39kjm.apps.googleusercontent.com">
      <div>
        <GoogleLogin logo_alignment="center" shape="pill" onSuccess={handleSuccess} onError={handleError} />
      </div>
    </GoogleOAuthProvider>
  );
}

export default GoogleButton;

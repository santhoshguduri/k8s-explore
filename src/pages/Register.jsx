
import React, { useState } from "react";
import TopNavigation from "../components/common/TopNavigation";
import Register from "../components/register";
import FreeTrialForm from "../components/common/TrialRegistration";

function RegisterPage() {

  const [step, setStep] = useState(1);

  const handleFormStep=()=>{
    switch(step){
        case 1:
            return <Register setStep={(val)=>setStep(val)}/>;
        case 2:
            return <FreeTrialForm/>
    }
  }

  return (
    <>
      <TopNavigation />
      {
        handleFormStep()
      }
    </>
  );
}

export default RegisterPage;

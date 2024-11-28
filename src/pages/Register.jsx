// import * as React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { registerUser } from '../services/Register';

// export const Register = () => {

//     const navigate = useNavigate();

//     const [userData, setUserData] = React.useState({username: '', password: ''})

//     const onClickRegister = (ev) =>{
//         ev.preventDefault();

//         registerUser(userData).then((res)=>{

//             console.log(res)
//             navigate('/login');
//         });
//     }

//     const handleChange = (name, val) => {
//         console.log(name,val)
//         const curUser = userData;
//         curUser[name]= val;
//         setUserData(curUser);
//     }

//     return <div>
//         <input type='text' name='firstName' placeholder='First Name' onChange={(ev, val)=>handleChange(ev.target.name, ev.target.value)} defaultValue='' />
//         <input type='text' name='lastName' placeholder='Last Name' onChange={(ev, val)=>handleChange(ev.target.name, ev.target.value)} defaultValue='' />
//         <input type='text' name='email' placeholder='Email' onChange={(ev, val)=>handleChange(ev.target.name, ev.target.value)} defaultValue='' />
//         <input type='password' name='password' placeholder='Password' onChange={(ev, val)=>handleChange(ev.target.name, ev.target.value)} defaultValue='' />
//         {/* <input type='password' name='confirmPassword' placeholder='Confirm Password' onChange={(ev, val)=>handleChange(ev.target.name, ev.target.value)} defaultValue='' /> */}

//         <button onClick={(eve)=>onClickRegister(eve)}>Submit</button>
//     </div>
// }

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

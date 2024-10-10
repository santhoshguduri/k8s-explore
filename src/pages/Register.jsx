import * as React from 'react';
import { registerUser } from '../services/Register';

export const Register = () => {

    const userData = React.useState({})

    const onClickRegister = (ev) =>{
        ev.preventDefault();

        registerUser(userData).then((res)=>{
            
        });
    }

    return <div>
        <input type='text' placeholder='First Name' defaultValue='' />
        <input type='text' placeholder='Last Name' defaultValue='' />
        <input type='text' placeholder='Username / Email' defaultValue='' />
        <input type='password' placeholder='Password' defaultValue='' />

        <button onClick={(eve)=>onClickRegister(eve)}>Submit</button>
    </div>
}
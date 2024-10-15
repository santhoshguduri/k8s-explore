import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import { loginUser } from '../services/Login';
import { getLoggedProfile } from '../services/User';
import LocalStorageService from '../utils/LocalStorage'
import { useDispatch } from 'react-redux';
import { updateUser } from '../redux/slices/UserSlice';

export const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [userData, setUserData] = React.useState({username: '', password: ''})

    const onClickRegister = (ev) =>{
        ev.preventDefault();

        loginUser(userData).then((res)=>{
            LocalStorageService.setItemValue('token', res.data.access_token);
        }).then(()=>{
            return getLoggedProfile()
        }).then((res)=>{
            console.log(res)
            dispatch(updateUser(res.data));
            navigate('/app/dashboard')
        });
    }

    const handleChange = (name, val) => {
        console.log(name,val)
        const curUser = userData;
        curUser[name]= val;
        setUserData(curUser);
    }

    return <div>
        
        <input type='text' name='username' placeholder='Username / Email' onChange={(ev, val)=>handleChange(ev.target.name, ev.target.value)} defaultValue='' />
        <input type='password' name='password' placeholder='Password' onChange={(ev, val)=>handleChange(ev.target.name, ev.target.value)} defaultValue='' />

        <button onClick={(eve)=>onClickRegister(eve)}>Submit</button>
    </div>
}
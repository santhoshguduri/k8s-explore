import * as React from 'react';
import { removeToken } from '../utils/Auth';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Dashboard = () => {

    const navigate = useNavigate();
    const currentUser = useSelector(state=> state.currentUser);

    const onClickLogout = () =>{
        removeToken();
        navigate('/login');
    }
    
    return <div>
        Welcome {currentUser.firstname}!

        <button onClick={(eve)=>onClickLogout(eve)}>Logout</button>
    </div>
}
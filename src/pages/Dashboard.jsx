import * as React from 'react';
import { removeToken } from '../utils/Auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../redux/slices/UserSlice';
import { getLoggedProfile } from '../services/User';

export const Dashboard = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const currentUser = useSelector(state=> state.currentUser);

    React.useEffect(()=>{
        getLoggedProfile()
        .then((res)=>{
            console.log(res)
            dispatch(updateUser(res.data));
            // navigate('/app/dashboard')
        });
    })

    const onClickLogout = () =>{
        removeToken();
        navigate('/login');
    }
    
    return <div>
        Welcome {currentUser.firstname}!

        <button onClick={(eve)=>onClickLogout(eve)}>Logout</button>
    </div>
}
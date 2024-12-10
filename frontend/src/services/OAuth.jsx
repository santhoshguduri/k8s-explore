import axios from '../utils/Axios'
import auth from '../utils/Auth'

export const oAuthRegisterUser = (tokenData) =>{
    return axios({
        method: 'Post',
        url: 'http://localhost:8000/api/auth/create',
        headers: {
            'Authorization': `Bearer ${tokenData.token}`
        },
    })
}

export const oAuthLogin = (tokenData) =>{
    return axios({
        method: 'Post',
        url: 'http://localhost:8000/api/auth/google',
        headers: {
            'Authorization': `Bearer ${tokenData.token}`
        },
    }).then((res)=>{
        console.log(res);
        auth.setToken(res.data.access_token);
        return res;
    })
}

export const LogoutUser = () =>{
    return axios({
        method: 'Post',
        url: 'http://localhost:8000/api/auth/logout',
    }).then((res)=>{
        auth.removeToken();
        return res;
    })
}

export const verifyToken = () => {
    return axios({
        method: 'Get',
        url: 'http://localhost:8000/api/auth/verify-token',
    })
}

export const refreshToken = () => {
    return axios({
        method: 'Get',
        url: 'http://localhost:8000/api/auth/token-refresh',
    }).then((res)=>{
        console.log(res);
        auth.setToken(res.data.access_token);
        return res;
    }).catch((err)=>{
        auth.removeToken();
        return err;
    })
}
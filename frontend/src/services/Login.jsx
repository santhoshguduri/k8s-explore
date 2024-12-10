import axios from '../utils/Axios'
import auth from '../utils/Auth';

export const loginUser = (tokenData) =>{
    return axios({
        method: 'Post',
        url: 'http://localhost:8000/login',
        data: tokenData
    }).then((res)=>{
        console.log(res);
        auth.setToken(res.data.access_token);
        return res;
    })
}

export const sendOtpExistingUser = (userData) =>{
    return axios({
        method: 'Post',
        url: 'http://localhost:8000/otp/existing-user/send',
        data: userData
    })
}
import axios from '../utils/Axios'


export const loginUser = (tokenData) =>{
    return axios({
        method: 'Post',
        url: 'http://localhost:8000/login',
        data: tokenData
    })
}

export const sendOtpExistingUser = (userData) =>{
    return axios({
        method: 'Post',
        url: 'http://localhost:8000/otp/existing-user/send',
        data: userData
    })
}
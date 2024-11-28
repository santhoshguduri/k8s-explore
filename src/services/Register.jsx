import axios from '../utils/Axios'

export const registerUser = (userData) =>{
    return axios({
        method: 'Post',
        url: 'http://localhost:8000/user/create',
        data: userData
    })
}

export const sendOtpNewUser = (userData) =>{
    return axios({
        method: 'Post',
        url: 'http://localhost:8000/otp/new-user/send',
        data: userData
    })
}


export const verifyOtp = (userData) =>{
    return axios({
        method: 'Post',
        url: 'http://localhost:8000/otp/verify',
        data: userData
    })
}

export const resendOtp = (userData) =>{
    return axios({
        method: 'Post',
        url: 'http://localhost:8000/otp/resend',
        data: userData
    })
}

export const verifyCard = (userData) =>{
    return axios({
        method: 'Post',
        url: 'http://localhost:8000/card/verify',
        data: userData
    })
}
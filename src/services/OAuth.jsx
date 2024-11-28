import axios from '../utils/Axios'

export const oAuthRegisterUser = (tokenData) =>{
    return axios({
        method: 'Post',
        url: 'http://localhost:8000/api/auth/create',
        data: tokenData
    })
}

export const oAuthLogin = (tokenData) =>{
    return axios({
        method: 'Post',
        url: 'http://localhost:8000/api/auth/google',
        data: tokenData
    })
}

export const LogoutUser = () =>{
    return axios({
        method: 'Post',
        url: 'http://localhost:8000/api/auth/logout',
    })
}

export const verifyToken = () => {
    return axios({
        method: 'Get',
        url: 'http://localhost:8000/api/auth/verify-token',
    })
}
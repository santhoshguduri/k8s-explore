import AxiosInstance from '../utils/Axios'


export const loginUser = (credential) =>{
    return AxiosInstance({
        method: 'Post',
        url: '/login',
        data: credential
    })
}


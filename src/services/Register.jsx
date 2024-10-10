import AxiosInstance from '../utils/Axios'

export const registerUser = (userData) =>{
    return AxiosInstance({
        method: 'Post',
        url: '/user',
        data: userData
    })
}
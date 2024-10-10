import AxiosInstance from '../utils/Axios'


export const getLoggedProfile = () =>{
    return AxiosInstance({
        method: 'Get',
        url: '/user/me'
    })
}
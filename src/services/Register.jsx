import axios from 'axios'

export const registerUser = (userData) =>{
    return axios({
        method: 'Post',
        url: 'http://localhost:8000/user',
        data: userData
    })
}
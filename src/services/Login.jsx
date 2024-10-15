import axios from 'axios'


export const loginUser = (credential) =>{
    return axios({
        method: 'Post',
        url: 'http://localhost:8000/login',
        data: credential
    })
}


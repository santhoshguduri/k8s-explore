export const getToken = () => {
    return localStorage.getItem('token'); // or sessionStorage.getItem('token')
  };
  
  export const removeToken = () => {
    return localStorage.removeItem('token'); // or sessionStorage.removeItem('token')
  };
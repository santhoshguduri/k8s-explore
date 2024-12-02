import LocalStorage from "./LocalStorage";

const auth_key = 'access_token';

const getToken = () => {
    return LocalStorage.getItem(auth_key);
  };
  
const removeToken = () => {
  return LocalStorage.deleteItem(auth_key);
};

const setToken = (value) => {
  return LocalStorage.setItem(auth_key, value)
}

export default {
  getToken,
  setToken,
  removeToken
}
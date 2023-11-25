import axios from 'axios'
const api = axios.create({
    baseURL: 'http://localhost:8000/auth',
});

//export const getLoggedIn = () => api.get(`/loggedIn/`);
export const loginUser = (email, password) => {
    return api.post(`/login/`, {
        email : email,
        password : password
    })
}
export const logoutUser = () => api.post(`/logout/`)
export const registerUser = (username, email, password, passwordVerify) => {
    return api.post(`/register/`, {
        username : username,
        email : email,
        password : password,
        passwordVerify : passwordVerify
    })
}
const apis = {
   // getLoggedIn,
    registerUser,
    loginUser,
    logoutUser
}

export default apis

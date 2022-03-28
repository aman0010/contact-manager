import axios from 'axios'

export const signin = (email, password) => {
    return axios.post(process.env.REACT_APP_API_URL + '/api/signin', { email, password})
}

export const signup = (email, password) => {
    return axios.post(process.env.REACT_APP_API_URL + '/api/signup', { email, password})
}

export const logout = () => {
    localStorage.removeItem('token')
}
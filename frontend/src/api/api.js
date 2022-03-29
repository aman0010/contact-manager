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

export const getContacts = () => {
    return axios.get(process.env.REACT_APP_API_URL + '/api/contacts')
}

export const getContact = (id) => {
    return axios.get(process.env.REACT_APP_API_URL + `/api/contacts/${id}`)
}


export const addContact = (contact) => {
    return axios.post(process.env.REACT_APP_API_URL + '/api/contacts', contact)
}

export const updateFavourite = (id, favourite) => {
    return axios.put(process.env.REACT_APP_API_URL + `/api/contacts/${id}`, { favourite })
}

export const updateContact = (id, contact) => {
    return axios.put(process.env.REACT_APP_API_URL + `/api/contacts/${id}`, contact)
}

export const deleteContact = (id) => {
    return axios.delete(process.env.REACT_APP_API_URL + `/api/contacts/${id}`)
}
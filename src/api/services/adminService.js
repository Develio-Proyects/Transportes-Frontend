import axios from 'axios'

const API_URL = (import.meta.env.VITE_API_URL?.trim() || '') + '/api'

export const getUsers = async () => {
    const token = localStorage.getItem("token")
    
    try {
        return await axios.get(`${API_URL}/users`, 
            token && {
                headers: { Authorization: `Bearer ${token}` }
        })
    } catch (error) {
        if (error.status >= 400 && error.status <= 499) {
            return error.response
        } else{
            return { status: 500, data: { message: 'Error interno del sistema' } }
        }
    }
}

export const getPayments = async () => {
    const token = localStorage.getItem("token")
    
    try {
        return await axios.get(`${API_URL}/payment`, 
            token && {
                headers: { Authorization: `Bearer ${token}` }
        })
    } catch (error) {
        if (error.status >= 400 && error.status <= 499) {
            return error.response
        } else{
            return { status: 500, data: { message: 'Error interno del sistema' } }
        }
    }
}
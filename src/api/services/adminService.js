import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL + '/api'

export const getUsers = async () => {
    const token = localStorage.getItem("token")
    
    try {
        return await axios.get(`${API_URL}/users`, 
            token && {
                headers: { Authorization: `Bearer ${token}` }
        })
    } catch (error) {
        if (error.response) {
            throw error.response
        } else if (error.request) {
            throw { status: 500, data: { message: 'Error de conexión' } }
        } else {
            throw { status: 500, data: { message: 'Error inesperado' } }
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
        if (error.response) {
            throw error.response
        } else if (error.request) {
            throw { status: 500, data: { message: 'Error de conexión' } }
        } else {
            throw { status: 500, data: { message: 'Error inesperado' } }
        }
    }
}
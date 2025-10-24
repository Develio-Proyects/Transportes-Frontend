import axios from "axios"

const API_URL_DOCUMENT = (import.meta.env.VITE_API_URL?.trim() || '') + '/api/employee'

export const getEmployees = async () => {
    const token = localStorage.getItem("token")
    try {
        return await axios.get(`${API_URL_DOCUMENT}`, 
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

export const createEmployee = async (values) => {
    const token = localStorage.getItem("token")
    try {
        return await axios.post(`${API_URL_DOCUMENT}`, 
            values,
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

export const editEmployee = async (id, values) => {
    const token = localStorage.getItem("token")
    try {
        return await axios.post(`${API_URL_DOCUMENT}/${id}`, 
            values,
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
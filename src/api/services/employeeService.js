import axios from "axios"

const API_URL_DOCUMENT = import.meta.env.VITE_API_URL + '/api/employee'

export const getEmployees = async () => {
    const token = localStorage.getItem("token")
    try {
        return await axios.get(`${API_URL_DOCUMENT}`, 
            token && {
                headers: { Authorization: `Bearer ${token}` }
        })
    } catch (error) {
        return error
    }
}

export const createEmployees = async (values) => {
    const token = localStorage.getItem("token")
    try {
        return await axios.post(`${API_URL_DOCUMENT}`, 
            values,
            token && {
                headers: { Authorization: `Bearer ${token}` }
        })
    } catch (error) {
        return error
    }
}

export const editEmployees = async (id, values) => {
    const token = localStorage.getItem("token")
    try {
        return await axios.post(`${API_URL_DOCUMENT}/${id}`, 
            values,
            token && {
                headers: { Authorization: `Bearer ${token}` }
        })
    } catch (error) {
        return error
    }
}
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
        if (error.response) {
            throw error.response;
        } else if (error.request) {
            throw { status: 500, data: { message: 'Error de conexión' } };
        } else {
            throw { status: 500, data: { message: 'Error inesperado' } };
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
        if (error.response) {
            throw error.response;
        } else if (error.request) {
            throw { status: 500, data: { message: 'Error de conexión' } };
        } else {
            throw { status: 500, data: { message: 'Error inesperado' } };
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
        if (error.response) {
            throw error.response;
        } else if (error.request) {
            throw { status: 500, data: { message: 'Error de conexión' } };
        } else {
            throw { status: 500, data: { message: 'Error inesperado' } };
        }
    }
}
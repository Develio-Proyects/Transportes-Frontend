import axios from 'axios'

const API_URL = (import.meta.env.VITE_API_URL?.trim() || '') + '/api/auth'

export const login = async (credencials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credencials)
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response
    } catch (error) {
        if (error.status >= 400 && error.status <= 499) {
            return error.response
        } else{
            return { status: 500, data: { message: 'Error interno del sistema' } }
        }
    }
}

export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem("user")
    window.location.href = '/login'
}

export const validateToken = async (token) => {
    try {
        const response = await axios.post(`${API_URL}/validate-token`, token, {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response
    } catch (error) {
        if (error.status >= 400 && error.status <= 499) {
            return error.response
        } else{
            return { status: 500, data: { message: 'Error interno del sistema' } }
        }
    }
}

export const updatePassword = async (credentials) => {
    try {
        const response = await axios.put(`${API_URL}/update-password`, 
            credentials, {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response
    } catch (error) {
        if (error.status >= 400 && error.status <= 499) {
            return error.response
        } else{
            return { status: 500, data: { message: 'Error interno del sistema' } }
        }
    }
}
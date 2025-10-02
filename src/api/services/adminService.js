import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL + '/api/auth'

export const getUsers = async () => {
    try {
        const response = await axios.post(`${API_URL}/`, )
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response
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
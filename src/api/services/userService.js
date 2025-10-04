import axios from 'axios'
import { ROLESSIGNIN } from '../models/roles'

const API_URL = import.meta.env.VITE_API_URL + '/api/users'


export const signup = async (credencials) => {
    try {
        if(credencials.role === ROLESSIGNIN.FLOTA){
            credencials.lastname = null
        }
        const response = await axios.post(`${API_URL}`, credencials)
        if(response.data.token){
            localStorage.setItem('token', response.data.token)
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
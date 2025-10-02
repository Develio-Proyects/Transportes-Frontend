import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + '/api/payment'

export const payTrip = async (offerId) => {
    const token = localStorage.getItem("token")
    try {
        return await axios.post(`${API_URL}/create-preference?offerId=${offerId}`, 
            {},
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
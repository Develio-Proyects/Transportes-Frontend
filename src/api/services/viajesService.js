import axios from "axios";

const API_URL = 'http://localhost:8080/api/viajes'
const token = localStorage.getItem("token")

export const getViajes = async (page, size) => {
    try {
        return await axios.get(`${API_URL}/disponibles?page=${page}&size=${size}`, 
            token && {
                headers: { Authorization: `Bearer ${token}` }
        })
    } catch (error) {
        return error
    }
}

export const getDetalleViaje = async (id) => {
    try {
        return await axios.get(`${API_URL}/${id}`, 
            token && {
                headers: { Authorization: `Bearer ${token}` }
        })
    } catch (error) {
        return error
    }
}
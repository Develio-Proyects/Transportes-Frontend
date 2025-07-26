import axios from "axios";

const API_URL = 'http://localhost:8080/api/trip'

export const getViajes = async (page, size) => {
    const token = localStorage.getItem("token")
    try {
        return await axios.get(`${API_URL}/posted-trips?page=${page}&size=${size}`, 
            token && {
                headers: { Authorization: `Bearer ${token}` }
        })
    } catch (error) {
        return error
    }
}

export const getDetalleViaje = async (id) => {
    const token = localStorage.getItem("token")
    try {
        return await axios.get(`${API_URL}/${id}`, 
            token && {
                headers: { Authorization: `Bearer ${token}` }
        })
    } catch (error) {
        return error
    }
}

export const getMisViajes = async (page, size) => {
    const token = localStorage.getItem("token")
    try {
        return await axios.get(`${API_URL}/user-trips?page=${page}&size=${size}`, {
            headers: { Authorization: `Bearer ${token}`}
        })
    } catch (error) {
        return error
    }
}
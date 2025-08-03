import axios from "axios";

const API_URL_DOCUMENT = 'http://localhost:8080/api/document'
const API_URL_TRUCK = 'http://localhost:8080/api/truck'

export const getDocuemntsById = async (id) => {
    const token = localStorage.getItem("token")
    try {
        return await axios.get(`${API_URL_DOCUMENT}/${id}`, 
            token && {
                headers: { Authorization: `Bearer ${token}` }
        })
    } catch (error) {
        return error
    }
}

export const getTrucks = async () => {
    const token = localStorage.getItem("token")
    try {
        return await axios.get(`${API_URL_TRUCK}`, 
            token && {
                headers: { Authorization: `Bearer ${token}` }
        })
    } catch (error) {
        return error
    }
}
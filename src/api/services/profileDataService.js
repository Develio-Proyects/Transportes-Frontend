import axios from "axios";

const API_URL_DOCUMENT = import.meta.env.VITE_API_URL + '/api/document'

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
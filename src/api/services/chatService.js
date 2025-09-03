import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL + '/api/chat'

export const getChats = async (id) => {
    const token = localStorage.getItem("token")
    try {
        return await axios.get(`${API_URL}/` + id, 
            token && {
                headers: { Authorization: `Bearer ${token}` }
        })
    } catch (error) {
        return error
    }
}
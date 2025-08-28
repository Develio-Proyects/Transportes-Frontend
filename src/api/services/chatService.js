import axios from 'axios'

const API_URL = 'http://localhost:8080/api/chat'

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
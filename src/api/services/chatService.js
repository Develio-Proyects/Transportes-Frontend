import axios from 'axios'
import {BASE_API_URL} from "../../../config.js";

const API_URL = BASE_API_URL + '/api/chat'

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
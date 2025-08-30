import axios from "axios";
import {BASE_API_URL} from "../../../config.js";

const API_URL_DOCUMENT = BASE_API_URL + '/api/document'
const API_URL_TRUCK = BASE_API_URL + '/api/truck'

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
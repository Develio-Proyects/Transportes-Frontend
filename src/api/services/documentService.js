import axios from "axios";
import {BASE_API_URL} from "../../../config.js";

const API_URL_DOCUMENT = BASE_API_URL + '/api/document'

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

export const createDocument = async (values) => {
    const token = localStorage.getItem("token")
    try {
        const formData = new FormData()
        formData.append("idUser", values.idUser)
        formData.append("name", values.name)
        formData.append("image", values.image)

        return await axios.post(`${API_URL_DOCUMENT}`, formData, {
            headers: {
                ...(token && { Authorization: `Bearer ${token}` }),
                "Content-Type": "multipart/form-data",
            },
        })
    } catch (error) {
        return error
    }
}

export const editDocument = async (id, values) => {
    const token = localStorage.getItem("token")
    try {
        const formData = new FormData()
        formData.append("name", values.name)
        values.image && formData.append("image", values.image)
        
        return await axios.put(`${API_URL_DOCUMENT}/${id}`, formData, {
            headers: {
                ...(token && { Authorization: `Bearer ${token}` }),
                "Content-Type": "multipart/form-data",
            },
        })
    } catch (error) {
        return error
    }
}
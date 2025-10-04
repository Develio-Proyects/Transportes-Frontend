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
        if (error.status >= 400 && error.status <= 499) {
            return error.response
        } else{
            return { status: 500, data: { message: 'Error interno del sistema' } }
        }
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
        if (error.status >= 400 && error.status <= 499) {
            return error.response
        } else{
            return { status: 500, data: { message: 'Error interno del sistema' } }
        }
    }
}

export const editDocument = async (id, values) => {
    const token = localStorage.getItem("token")
    try {
        const formData = new FormData()
        formData.append("idUser", values.idUser)
        formData.append("name", values.name)
        values.image && formData.append("image", values.image)
        
        return await axios.put(`${API_URL_DOCUMENT}/${id}`, formData, {
            headers: {
                ...(token && { Authorization: `Bearer ${token}` }),
                "Content-Type": "multipart/form-data",
            },
        })
    } catch (error) {
        if (error.status >= 400 && error.status <= 499) {
            return error.response
        } else{
            return { status: 500, data: { message: 'Error interno del sistema' } }
        }
    }
}
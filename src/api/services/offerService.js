import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL + '/api/offer'

export const getOfferQuote = async (offerId) => {
    const token = localStorage.getItem("token")
    try {
        return await axios.get(`${API_URL}/quote/` + offerId, 
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

export const sendOffer = async (idTrip, mount) => {
    const token = localStorage.getItem("token")
    try {
        return await axios.post(`${API_URL}/` + idTrip +"?mount=" + mount, 
            {},
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

export const deleteOffer = async (idOffer) => {
    const token = localStorage.getItem("token")

    try {
        return await axios.delete(`${API_URL}/${idOffer}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {}
        })
    } catch (error) {
        if (error.response?.status >= 400 && error.response?.status <= 499) {
            return error.response
        } else {
            return { status: 500, data: { message: 'Error interno del sistema' } }
        }
    }
}
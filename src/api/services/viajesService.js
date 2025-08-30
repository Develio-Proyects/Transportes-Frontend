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

export const createTrip = async (values) => {
    const token = localStorage.getItem("token")
    try {
        return await axios.post(`${API_URL}`, 
            {
                origin: values.origin,
                destination: values.destination,
                departureDate: values.departureDate,
                basePrice: values.basePrice,
                cargoType: values.cargoType,
                weight: values.weight,
                dimensions: {
                  width: values.dimensions.width,
                  high: values.dimensions.high,
                  long: values.dimensions.long
                },
                observations: values.observations
            },
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

export const getMisPublicaciones = async (page, size) => {
    const token = localStorage.getItem("token")
    try {
        return await axios.get(`${API_URL}/user-posted-trips?page=${page}&size=${size}`, {
            headers: { Authorization: `Bearer ${token}`}
        })
    } catch (error) {
        return error
    }
}

export const getOfferQuote = async (offerId) => {
    const token = localStorage.getItem("token")
    try {
        return await axios.get(`${API_URL}/offer-quote/` + offerId, 
            token && {
                headers: { Authorization: `Bearer ${token}` }
        })
    } catch (error) {
        return error
    }
}

export const sendOffer = async (idTrip, mount) => {
    const token = localStorage.getItem("token")
    try {
        return await axios.post(`${API_URL}/offer/` + idTrip +"?mount=" + mount, 
            {},
            token && {
                headers: { Authorization: `Bearer ${token}` }
        })
    } catch (error) {
        return error
    }
}
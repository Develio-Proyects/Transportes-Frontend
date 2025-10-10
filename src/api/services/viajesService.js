import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL + '/api/trip'

export const getViajes = async (page, size) => {
    const token = localStorage.getItem("token")
    try {
        return await axios.get(`${API_URL}/posted-trips?page=${page}&size=${size}`, 
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
        if (error.status >= 400 && error.status <= 499) {
            return error.response
        } else{
            return { status: 500, data: { message: 'Error interno del sistema' } }
        }
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
        if (error.status >= 400 && error.status <= 499) {
            return error.response
        } else{
            return { status: 500, data: { message: 'Error interno del sistema' } }
        }
    }
}

export const getMisViajes = async (page, size) => {
    const token = localStorage.getItem("token")
    try {
        return await axios.get(`${API_URL}/user-trips?page=${page}&size=${size}`, {
            headers: { Authorization: `Bearer ${token}`}
        })
    } catch (error) {
        if (error.status >= 400 && error.status <= 499) {
            return error.response
        } else{
            return { status: 500, data: { message: 'Error interno del sistema' } }
        }
    }
}

export const getMisPublicaciones = async (page, size) => {
    const token = localStorage.getItem("token")
    try {
        return await axios.get(`${API_URL}/user-posted-trips?page=${page}&size=${size}`, {
            headers: { Authorization: `Bearer ${token}`}
        })
    } catch (error) {
        if (error.status >= 400 && error.status <= 499) {
            return error.response
        } else{
            return { status: 500, data: { message: 'Error interno del sistema' } }
        }
    }
}

export const changeTripStatus = async (id, state) => {
    const token = localStorage.getItem("token")
    try {
        return await axios.post(`${API_URL}/change-state/${id}?state=${state}`, 
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

export const cancelTrip = async (idTrip) => {
    const token = localStorage.getItem("token")

    try {
        return await axios.delete(`${API_URL}/${idTrip}`, {
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
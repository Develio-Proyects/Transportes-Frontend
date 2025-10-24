import axios from "axios";

const API_URL = (import.meta.env.VITE_API_URL?.trim() || '') + '/api/truck'

export const getTrucks = async () => {
    const token = localStorage.getItem("token")
    try {
        return await axios.get(`${API_URL}`, 
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

export const createTruck = async (data) => {
    const token = localStorage.getItem("token");
  
    try {
        return await axios.post(
			`${API_URL}`,
			{
				brand: data.brand,
				model: data.model,
				patent: data.patent,
			},
			{
				headers: token ? { Authorization: `Bearer ${token}` } : {},
			}
		)
    } catch (error) {
        if (error.status >= 400 && error.status <= 499) {
            return error.response
        } else{
            return { status: 500, data: { message: 'Error interno del sistema' } }
        }
    }
}

export const editTruck = async (id, data) => {
    const token = localStorage.getItem("token");
  
    try {
        return await axios.put(
			`${API_URL}/${id}`,
			{
				brand: data.brand,
				model: data.model,
				patent: data.patent,
			},
			{
				headers: token ? { Authorization: `Bearer ${token}` } : {},
			}
		)
    } catch (error) {
        if (error.status >= 400 && error.status <= 499) {
            return error.response
        } else{
            return { status: 500, data: { message: 'Error interno del sistema' } }
        }
    }
}
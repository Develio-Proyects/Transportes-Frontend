import axios from "axios";

const API_URL = import.meta.env.API_URL + '/api/truck'

export const getTrucks = async () => {
    const token = localStorage.getItem("token")
    try {
        return await axios.get(`${API_URL}`, 
            token && {
                headers: { Authorization: `Bearer ${token}` }
        })
    } catch (error) {
        return error
    }
}

export const createTruck = async (data) => {
    const token = localStorage.getItem("token");
  
    try {
        const response = await axios.post(
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
  
      	return response.data
    } catch (error) {
        return error.response || error
    }
}

export const editTruck = async (id, data) => {
    const token = localStorage.getItem("token");
  
    try {
        const response = await axios.put(
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
  
      	return response.data
    } catch (error) {
        return error.response || error
    }
}
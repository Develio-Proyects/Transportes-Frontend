import axios from "axios";

const API_URL = 'http://localhost:8080/api/payment'

export const payTrip = async (offerId) => {
    const token = localStorage.getItem("token")
    try {
        return await axios.post(`${API_URL}/create-preference?offerId=${offerId}`, 
            {},
            token && {
                headers: { Authorization: `Bearer ${token}` }
        })
    } catch (error) {
        return error
    }
}
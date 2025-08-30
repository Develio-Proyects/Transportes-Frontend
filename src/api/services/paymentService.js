import axios from "axios";
import {BASE_API_URL} from "../../../config.js";

const API_URL = BASE_API_URL + '/api/payment'

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
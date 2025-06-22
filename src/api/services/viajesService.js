import axios from "axios";

const API_URL = 'http://localhost:8080/api/viajes'

export const getViajes = async (page, size) => {
    try{
        return await axios.get(`${API_URL}/disponibles?page=${page}&size=${size}`)
    }catch(error){
        return error
    }
}
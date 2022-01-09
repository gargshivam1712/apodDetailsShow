import axios from "axios"

export const apodAPI = axios.get('/api/apodRoute').then((res)=>res.data)

export const apodAPIByDate = (date)=>axios.get(`/api/apodRoute?date=${date}`).then((res)=>res.data)
import axios from 'axios'
import {getToken} from '../utility/services-jwt'

const http = axios.create({
    baseURL: process.env.REACT_APP_ENDPOINT,
    headers: {
        'Content-Type': 'application/json',
        "Accept": 'application/json',
    }
})


http.interceptors.request.use(
    function (req) {
        const token = `${getToken()}`
        if (token) {
            req.headers.Authorization = `Bearer ${token}`
        }
        return req
    },
    function (err) {
        return Promise.reject(err)
    }
)


export default http


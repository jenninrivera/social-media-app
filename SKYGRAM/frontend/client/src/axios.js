import axios from 'axios'

const baseURL = 'http://127.0.0.1:8000'

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        Authorization: localStorage.getItem('token')
        ? 'JWT ' + localStorage.getItem('token')
        : null,
        'Content-Type': 'application/json'
    },
}
)

export default axiosInstance;
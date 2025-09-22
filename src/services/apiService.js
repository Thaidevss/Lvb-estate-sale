import axios from 'axios'
import { getToken } from './tokenService'

const API_URL = import.meta.env.VITE_BASE_API_URL;

const apiService = axios.create({
  // baseURL: 'http://10.2.182.23:8000'
  baseURL: API_URL
})

// apiService.interceptors.request.use(config => {
// //   const token = localStorage.getItem('token')
//   const token = getToken();
//   if (token) {
//     config.headers.Authorization = token
//     config.headers['Content-Type'] = 'application/json'
//     config.headers['Content-Type'] = 'multipart/form-data'
//   }
//   return config
// })

apiService.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = token;
    // ตั้งค่า Content-Type เฉพาะเมื่อไม่ได้กำหนดไว้
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
    }
  }
  return config;
});


export default apiService;
import axios from 'axios'
import { getToken } from './tokenService'

const apiService = axios.create({
  baseURL: 'http://10.2.182.23:8000'
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
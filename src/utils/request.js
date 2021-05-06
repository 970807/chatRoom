import axios from 'axios'
import Vue from 'vue'
const service = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 5000,
  withCredentials: false
})

service.interceptors.response.use(
  response => {
    if(response.data.code !== '2000') {
      return Promise.reject(response.data)
    } else {
      return response.data
    }
  },
  error => {
    Vue.prototype.$message.error(error.message)
  }
)

export default service
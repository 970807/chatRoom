import axios from 'axios'
import Vue from 'vue'

const baseURL =
  process.env.NODE_ENV === 'development'
    ? '//localhost:3002/api'
    : '//chatroom.ggh0807.cn/api'

const service = axios.create({
  baseURL,
  timeout: 5000,
  withCredentials: false
})

service.interceptors.response.use(
  (response) => {
    if (response.data.code !== '2000') {
      return Promise.reject(response.data)
    } else {
      return response.data
    }
  },
  (error) => {
    Vue.prototype.$message.error(error.message)
  }
)

export default service

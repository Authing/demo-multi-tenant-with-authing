import Axios from 'axios'
import { config } from '../config'

export const httpClient = Axios.create({
  baseURL: config.apiBaseUrl,
})

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authorization_token')
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    }
  }
  return config
})

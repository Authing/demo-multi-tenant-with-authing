import Axios from 'axios'
import { config } from '../config'

export const httpClient = Axios.create({
  baseURL: config.apiBaseUrl,
})

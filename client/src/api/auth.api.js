import axios from 'axios';
import { URL } from './api.config'

const signup = payload => axios.post(`${URL}/signup`, payload)

export { signup }

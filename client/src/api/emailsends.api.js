import axios from 'axios';
import { URL } from './api.config'

const fetchEmailSends = params => axios.get(`${URL}/emailsends`, { params: { ...params } });
const fetchSingleSend = params => axios.get(`${URL}/singlesend`, { params: { ...params } });

export { fetchEmailSends, fetchSingleSend }
import axios from 'axios';
import { URL } from './api.config'

const fetchCompanies = params => axios.get(`${URL}/companies`, { params: { ...params } })

const addCompany = company => axios.post(`${URL}/addcompany`, company);

const editCompany = ({ id, name, email }) => axios.patch(`${URL}/editcompany/${id}`, { name, email })

const removeCompany = (company_id) => axios.delete(`${URL}/deletecompany/${company_id}`);

const updateUnsubscribes = () => axios.get(`${URL}/unsubscribes`);

export {
    fetchCompanies,
    addCompany,
    editCompany,
    removeCompany,
    updateUnsubscribes
}

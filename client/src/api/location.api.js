import { URL } from './api.config'
import axios from 'axios';

const fetchData = (path) => axios.get(`${URL}${path}`);

const addCounty = (county) => axios.post(`${URL}/addcounty`, { county })

const editCounty = ({ county, county_id }) => axios.patch(`${URL}/editcounty/${county_id}`, { county })

const addCitytown = ({ citytown, county_id }) => axios.post(`${URL}/addcitytown`, { citytown, county_id })

const editCitytown = ({ citytown, citytown_id }) => axios.patch(`${URL}/editcitytown/${citytown_id}`, { citytown })

export {
    fetchData,
    addCounty,
    editCounty,
    addCitytown,
    editCitytown
}
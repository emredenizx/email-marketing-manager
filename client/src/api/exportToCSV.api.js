import { URL } from './api.config'
import axios from 'axios';
import { formatYear } from '../utils/common'

const exportToCSV = async (params) => {
    try {
        const response = await axios.get(`${URL}/exportcsv`, {
            params: {
                ...params
            }
        }, { responseType: 'blob' })

        const { csv, firstRecordDate, lastRecordDate, selectedActivities, selectedLocation } = response.data
        return {
            data: csv,
            firstRecordDate: formatYear(firstRecordDate),
            lastRecordDate: formatYear(lastRecordDate),
            selectedActivities,
            selectedLocation
        }
    } catch (error) {
        console.log(error)
    }
};

export {
    exportToCSV
}


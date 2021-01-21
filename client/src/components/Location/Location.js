import React, { useContext } from 'react'
import { toastError } from '../../utils/toasts';
import { Modal } from '../../context/modal'
import { Location as LocationContext } from '../../context/location'
import { fetchData } from '../../api/location.api'
import Dropdown from '../UI/Dropdown'
import { map } from './utils'
import { modal_addCounty, modal_editCounty, modal_addCitytown, modal_editCitytown } from "../Modal/AddEdit/utils/modal_actions";


const paths = {
    counties: '/counties',
    citytowns: (id) => `/counties/${id}`
}

const Location = ({ type, addEditButtons }) => {
    const { setModal } = useContext(Modal);
    const {
        location,
        setCitytownOptions,
        setLocationSelection,
        isLoading
    } = useContext(LocationContext)

    const { counties } = location.options;
    const citytowns = location.options.citytowns[type]

    const {
        county,
        county_id,
        citytown,
        citytown_id
    } = location.selections[type]

    const onCountySelect = async (county, county_id) => {
        setLocationSelection(type, {
            county,
            county_id,
            citytown: '',
            citytown_id: null
        })
        if (county) {
            try {
                const response = await fetchData(paths.citytowns(county_id));
                setCitytownOptions(type, map(response.data))
            } catch (error) {
                console.log(error)
            }
        }
    }

    const onCitytownSelect = (citytown, citytown_id) => {
        setLocationSelection(type, { citytown, citytown_id });
    }

    const onAddEdit = (action, field) => {

        const actionType = `${action}_${field}`.toUpperCase();
        let content;

        if (!county && (actionType === 'EDIT_COUNTY' || actionType === 'ADD_CITYTOWN')) {
            toastError('County should be selected!');
            return;
        }
        else if (!citytown && actionType === 'EDIT_CITYTOWN') {
            toastError('County and City/Town should be selected!');
            return;
        } else {
            if (actionType === 'ADD_COUNTY') {
                content = modal_addCounty();
            }
            if (actionType === 'EDIT_COUNTY') {
                content = modal_editCounty({ county, county_id });
            }
            if (actionType === 'ADD_CITYTOWN') {
                content = modal_addCitytown({ county, county_id });
            }
            if (actionType === 'EDIT_CITYTOWN') {
                content = modal_editCitytown({
                    county,
                    county_id,
                    citytown,
                    citytown_id
                });
            }
            setModal(content)
        }
    }

    return (
        <>
            <Dropdown
                label='County'
                name='county'
                options={counties}
                value={county}
                onChange={onCountySelect}
                addEditButtons={addEditButtons}
                onAddEdit={onAddEdit}
                isLoading={isLoading}
            />
            <Dropdown
                label='City/Town'
                name='citytown'
                options={citytowns}
                value={citytown}
                disabled={!county}
                onChange={onCitytownSelect}
                addEditButtons={addEditButtons}
                onAddEdit={onAddEdit}
                isLoading={isLoading}
            />
        </>
    )
}

export default Location;

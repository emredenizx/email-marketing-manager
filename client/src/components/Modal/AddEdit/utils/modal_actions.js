import { fields } from "../../../../utils/config";
import { addCompany, editCompany } from "../../../../api/companies.api";
import { addCounty, editCounty, addCitytown, editCitytown } from "../../../../api/location.api";
import { validateCompanies, validateCounty, validateCitytown } from "./modal_validations";

export const modal_addCompany = (data) => {
    return {
        action: 'ADD_COMPANY',
        title: 'Add Company',
        content: {
            data: {
                ...data,
                name: '',
                email: ''
            },
            fields: [
                { ...fields.county, disabled: true },
                { ...fields.citytown, disabled: true },
                { ...fields.email },
                { ...fields.name },
            ]
        },
        api: ({ name, email, citytown_id }) => {
            const payload = {
                name: name.trim(),
                email: email.toLowerCase().trim(),
                citytown_id
            }
            return addCompany(payload)
        },
        validation: (fields) => validateCompanies(fields)
    }
}

export const modal_editCompany = (data) => {
    return {
        action: 'EDIT_COMPANY',
        title: 'Edit Company',
        content: {
            data: {
                ...data
            },
            fields: [
                { ...fields.county, disabled: true },
                { ...fields.citytown, disabled: true },
                { ...fields.email },
                { ...fields.name },
            ]
        },
        api: ({ id, name, email }) => {
            const payload = {
                id,
                name: name.trim(),
                email: email.toLowerCase().trim(),
            }
            return editCompany(payload)
        },
        validation: (fields) => validateCompanies(fields)
    }
}

export const modal_addCounty = (data) => {
    return {
        action: 'ADD_COUNTY',
        title: 'Add County',
        content: {
            data: {
                county: ''
            },
            fields: [
                { ...fields.county }
            ]
        },
        api: ({ county }) => addCounty(county),
        validation: (fields) => validateCounty(fields)
    }
}

export const modal_editCounty = (data) => {
    return {
        action: 'EDIT_COUNTY',
        title: 'Edit County',
        content: {
            data: {
                ...data
            },
            fields: [
                { ...fields.county }
            ]
        },
        api: ({ county, county_id }) => editCounty({ county, county_id }),
        validation: (fields) => validateCounty(fields)
    }
}

export const modal_addCitytown = (data) => {
    return {
        action: 'ADD_CITYTOWN',
        title: 'Add City/Town',
        content: {
            data: {
                ...data,
                citytown: ''
            },
            fields: [
                { ...fields.county, disabled: true },
                { ...fields.citytown }
            ]
        },
        api: ({ citytown, county_id }) => addCitytown({ citytown, county_id }),
        validation: (fields) => validateCitytown(fields)
    }
}

export const modal_editCitytown = (data) => {
    return {
        action: 'EDIT_CITYTOWN',
        title: 'Edit City/Town',
        content: {
            data: {
                ...data
            },
            fields: [
                { ...fields.county, disabled: true },
                { ...fields.citytown }
            ]
        },
        api: ({ citytown_id, citytown }) => editCitytown({ citytown_id, citytown }),
        validation: (fields) => validateCitytown(fields)
    }
}
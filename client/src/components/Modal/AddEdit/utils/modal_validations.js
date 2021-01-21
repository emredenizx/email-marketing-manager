import { checkValidation, checkEmail, checkRequired, checkMaxLength } from '../../../../utils/validation'

export const validateCompanies = (fields) => {
    const { name, email } = fields;
    const validateEmail = checkValidation(email, 'Email', checkEmail, checkRequired, checkMaxLength)
    const validateName = checkValidation(name, 'Name', checkRequired, checkMaxLength)
    return [...validateEmail, ...validateName]
}

export const validateCounty = (fields) => {
    const { county } = fields;
    return checkValidation(county, 'County', checkRequired, checkMaxLength)
}

export const validateCitytown = (fields) => {
    const { citytown } = fields;
    return checkValidation(citytown, 'City/Town', checkRequired, checkMaxLength)
}
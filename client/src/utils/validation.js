export const checkEmail = (input) => {
    if (input) {
        const email = input.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g)
        return email ? null : 'Email is not valid'
    }
    else return null;
}

export const checkRequired = (input, fieldName) => {
    return input ? null : `${fieldName} is required`
}

export const checkMaxLength = (input) => input.length > 255 ? 'Max 255 characters allowed' : null


export const checkPasswordMatch = (values) => {
    if (values.length > 0) {
        const [password, password2] = values;
        return password === password2 ? null : 'Passwords do not match'
    }
    else return null;
}

export const checkValidation = (input, fieldName, ...validations) => {
    let errors = []
    for (const validation of validations) {
        const error = validation(input, fieldName)
        if (error) {
            errors.push(error)
        }
    }
    return errors;
}


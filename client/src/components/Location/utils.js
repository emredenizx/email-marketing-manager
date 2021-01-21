const map = (options) => {
    return options.map(option => ({
        key: option.id,
        text: option.name,
        value: option.name
    }))
}

const optionId = (value, options) => {
    let key = '';
    if (value) {
        key = options.find(item => item.value === value).key || ''
    }
    return key;
}

export { map, optionId }
export const formatDate = (data) => {
  if (!data) return null;
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }
  const convertToLocal = new Date(data);
  const datetimeformat = new Intl.DateTimeFormat('tr-TR', options)
  return datetimeformat.format(convertToLocal)
}

export const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.substring(1);

export const formatYear = (data) => {
  if (!data) return null;
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  }
  const convertToLocal = new Date(data);
  const datetimeformat = new Intl.DateTimeFormat('tr-TR', options)
  return datetimeformat.format(convertToLocal)
}

export const formatModalLabel = str => str
  .replace(/[_/,]/g, ' ')
  .replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())

export const formatDuplicateMsg = msg => msg.split('=')[1].replace(/[()=,0-9]/g, "").replace(/\s.*/, ' ') + 'already exists!'

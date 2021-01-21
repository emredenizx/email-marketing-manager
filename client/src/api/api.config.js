import axios from 'axios';

let URL;

if (process.env.NODE_ENV !== 'production') {
    URL = 'http://localhost:3001';
} else {
    URL = 'https://email-subscription-manager-api.herokuapp.com';
}

const injectAuthorization = () => {
    axios.defaults.headers.common['Authorization'] = ''
    delete axios.defaults.headers.common['Authorization'];

    const token = localStorage.getItem('user_token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
}

export { URL, injectAuthorization }

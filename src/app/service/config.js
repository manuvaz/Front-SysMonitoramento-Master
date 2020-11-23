import axios from 'axios';
import store from '../store/main';

const http = axios.create({
    baseURL: "http://localhost:5000"
});

http.interceptors.request.use(config => {
    const user = store.getters.authenticatedUser;

    if (user) {
        config.headers['x-auth-token'] = user.token;
    }
    return config;
});

http.interceptors.response.use(response => {
    return response;
}, config => {
    throw config.response;
});

export default http;
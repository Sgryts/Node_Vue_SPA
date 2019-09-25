import axios from 'axios';
import store from '@/store/store';

export default () => {
    return axios.create({
        baseURL: process.env.VUE_APP_BASE_URL || process.env.VUE_APP_BASE_URL_LOCAL,
        headers: {
            Authorization: `Bearer ${store.state.token}`,
        },
    });
};

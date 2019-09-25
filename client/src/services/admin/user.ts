import IUser from "@/models/user";
import api from '../../api/api';

export default {
    index() {
        return api().get(`/admin/users`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    },
    register(data: IUser) {
        return api().post(`/admin/register`, data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    },
    login(data: IUser) {
        return api().post('/admin/login', data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    },
    logout() {
        return api().post('/admin/logout',
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    },
};

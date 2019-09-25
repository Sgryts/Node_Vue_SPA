import IPhoto from '@/models/photo';
import api from '../../api/api';

export default {
    index() {
        return api().get('/admin/photos');
    },
    show(id: number) {
        return api().get(`admin/photos/${id}`);
    },
    post(data: IPhoto) {
        // console.log('api', data);
        return api().post('/admin/photos', data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    },
    put(id: number, data: IPhoto) {
        return api().put(`/admin/photos/${id}`, data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    },
    destroy(id: number) {
        return api().delete(`admin/photos/${id}`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    },
};

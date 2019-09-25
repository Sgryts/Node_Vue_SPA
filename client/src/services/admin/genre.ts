import IGenre from '@/models/genre';
import api from '../../api/api';

export default {
    index() {
        return api().get('/admin/genres', {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    show(id: number) {
        return api().get(`admin/genres/${id}`, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    showPhotos(id: number) {
        return api().get(`/genres/${id}/photos`, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    post(data: any) {
        return api().post(`admin/genres`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    put(id: number, data: IGenre) {
        return api().put(`admin/genres/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    destroy(id: number) {
        return api().delete(`admin/genres/${id}`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    },
};

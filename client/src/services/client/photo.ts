import IPhoto from '@/models/photo';
import {AxiosResponse} from 'axios';
import api from '../../api/api';

class PhotoService {
    public async index(): Promise<AxiosResponse<IPhoto[]>> {
        return await api().get<IPhoto[]>('api/photos');
    };

    public async show(id: string): Promise<AxiosResponse<IPhoto>> {
        return await api().get<IPhoto>(`api/photos/${id}`);
    };
};

export const photoService = new PhotoService();

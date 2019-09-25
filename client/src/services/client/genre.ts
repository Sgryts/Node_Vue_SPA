import IGenre from '@/models/genre';
import IPhoto from '@/models/photo';
import {AxiosResponse} from 'axios';
import api from '../../api/api';

class GenreService {
    public async index(): Promise<AxiosResponse<IGenre[]>> {
        return await api().get<IGenre[]>('api/genres');
    };

    public async show(id: string): Promise<AxiosResponse<IGenre>> {
        return await api().get<IGenre>(`api/genres/${id}`);
    };

    public async showPhotosByGenre(id: string): Promise<AxiosResponse<IPhoto[]>> {
        return await api().get(`api/genres/${id}/photos`);
    };
}

export const genreService = new GenreService();



import IGenre from '@/models/genre';

export default interface IPhoto {
    id: number;
    name: string;
    file: string;
    path: string;
    genres?: IGenre[];
}

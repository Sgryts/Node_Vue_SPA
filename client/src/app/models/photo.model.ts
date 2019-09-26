import IGenre from './genre.model';

export default interface IPhoto {
    id: number;
    name: string;
    file: string;
    path: string;
    genres?: IGenre[];
}

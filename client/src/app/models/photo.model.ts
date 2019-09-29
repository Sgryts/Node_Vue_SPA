import IGenre from './genre.model';

export default interface IPhoto {
    id: string;
    name: string;
    file: string;
    path: string;
    genres?: IGenre[];
}

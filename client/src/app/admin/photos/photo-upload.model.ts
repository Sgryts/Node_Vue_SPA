import IGenre from '../../models/genre.model';

export interface IPhotoUpload {
  name: string,
  genres: IGenre[],
  file: File,
}

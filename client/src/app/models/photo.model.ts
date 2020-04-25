import { IModel } from './abstract.model';
import IGenre from './genre.model';

export default interface IPhoto extends IModel {
  file: string;
  path: string;
  genres?: IGenre[];
}

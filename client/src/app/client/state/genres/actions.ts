import {createAction, props} from '@ngrx/store';
import IGenre from '../../../models/genre.model';

export const loadAllGenres = createAction('[CLIENT] Load All Genres');
export const loadAllGenresSuccess = createAction('[CLIENT] Load All Genres Success', props<{ payload: IGenre[] }>());
export const loadAllGenresFail = createAction('[CLIENT] Load All Genres Fail', props<{ error: any }>());

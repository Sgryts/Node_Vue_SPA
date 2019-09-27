import {createAction, props} from '@ngrx/store';
import IGenre from '../../models/genre.model';
import IPhoto from '../../models/photo.model';

export const loadAllGenres = createAction('[CLIENT] Load All Genres');
export const loadAllGenresSuccess = createAction('[CLIENT] Load All Genres Success', props<{ payload: IGenre[] }>());
export const loadAllGenresFail = createAction('[CLIENT] Load All Genres Fail', props<{ error: any }>());

export const loadPhotosByGenre = createAction('[CLIENT] Load Photos', props<{ params: string }>());
export const loadPhotosByGenreSuccess = createAction('[CLIENT] Load Photos Success', props<{ payload: IPhoto[] }>());
export const loadPhotosByGenreFail = createAction('[CLIENT] Load Photos Fail', props<{ error: any }>());

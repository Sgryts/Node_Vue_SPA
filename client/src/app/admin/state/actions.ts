import {createAction, props} from '@ngrx/store';
import IGenre from '../../models/genre.model';
import IPhoto from '../../models/photo.model';

export const loadAllGenres = createAction('[CLIENT] Load All Genres');
export const loadAllGenresSuccess = createAction('[CLIENT] Load All Genres Success', props<{ payload: IGenre[] }>());
export const loadAllGenresFail = createAction('[CLIENT] Load All Genres Fail', props<{ error: any }>());

export const loadAllPhotos = createAction('[CLIENT] Load All Photos');
export const loadAllPhotosSuccess = createAction('[CLIENT] Load All Photos Success', props<{ payload: IPhoto[] }>());
export const loadAllPhotosFail = createAction('[CLIENT] Load All Photos Fail', props<{ error: any }>());

export const loadAllPhotosByGenre = createAction('[CLIENT] Load All Photos', props<{ params: string }>());
export const loadAllPhotosByGenreSuccess = createAction('[CLIENT] Load All Photos Success', props<{ payload: IPhoto[] }>());
export const loadAllPhotosByGenreFail = createAction('[CLIENT] Load All Photos Fail', props<{ error: any }>());

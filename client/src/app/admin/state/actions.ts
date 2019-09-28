import {createAction, props} from '@ngrx/store';
import IGenre from '../../models/genre.model';
import IPhoto from '../../models/photo.model';

export const loadAllGenres = createAction('[ADMIN] Load All Genres');
export const loadAllGenresSuccess = createAction('[ADMIN] Load All Genres Success', props<{ payload: IGenre[] }>());
export const loadAllGenresFail = createAction('[ADMIN] Load All Genres Fail', props<{ error: any }>());

export const loadGenre = createAction('[ADMIN] Load Genre');
export const loadGenreSuccess = createAction('[ADMIN] Load Genre Success', props<{ payload: IGenre }>());
export const loadGenreFail = createAction('[ADMIN] Load Genre Fail', props<{ error: any }>());

export const updateGenre = createAction('[ADMIN] Update Genre');
export const updateGenreSuccess = createAction('[ADMIN] Update Genre Success', props<{ payload: IGenre }>());
export const updateGenreFail = createAction('[ADMIN] Update Genre Fail', props<{ error: any }>());

export const deleteGenre = createAction('[ADMIN] Delete Genre');
export const deleteGenreSuccess = createAction('[ADMIN] Delete Genre Success');
export const deleteGenreFail = createAction('[ADMIN] Delete Genre Fail', props<{ error: any }>());

export const loadAllPhotos = createAction('[ADMIN] Load All Photos');
export const loadAllPhotosSuccess = createAction('[ADMIN] Load All Photos Success', props<{ payload: IPhoto[] }>());
export const loadAllPhotosFail = createAction('[ADMIN] Load All Photos Fail', props<{ error: any }>());

export const loadPhotosByGenre = createAction('[ADMIN] Load Photos By Genre', props<{ params: string }>());
export const loadPhotosByGenreSuccess = createAction('[ADMIN] Load Photos By Genre Success', props<{ payload: IPhoto[] }>());
export const loadPhotosByGenreFail = createAction('[ADMIN] Load Photos By Genre Fail', props<{ error: any }>());

export const loadPhoto = createAction('[ADMIN] Load Photo');
export const loadPhotoSuccess = createAction('[ADMIN] Load Photo Success', props<{ payload: IPhoto }>());
export const loadPhotoFail = createAction('[ADMIN] Load Photo Fail', props<{ error: any }>());

export const updatePhoto = createAction('[ADMIN] Update Photo');
export const updatePhotoSuccess = createAction('[ADMIN] Update Photo Success', props<{ payload: IPhoto }>());
export const updatePhotoFail = createAction('[ADMIN] Update Photo Fail', props<{ error: any }>());

export const deletePhoto = createAction('[ADMIN] Delete Photo');
export const deletePhotoSuccess = createAction('[ADMIN] Delete Photo Success');
export const deletePhotoFail = createAction('[ADMIN] Delete Photo Fail', props<{ error: any }>());

export const login = createAction('[ADMIN AUTH] Login');
export const loginSuccess = createAction('[ADMIN AUTH] Login Success');
export const loginFail = createAction('[ADMIN AUTH] Login Fail');

export const signup = createAction('[ADMIN AUTH] Signup');
export const signupSuccess = createAction('[ADMIN AUTH] Signup Success');
export const signupFail = createAction('[ADMIN AUTH] Signup Fail');

export const getStatus = createAction('[ADMIN AUTH] Get Status');





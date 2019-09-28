import {createAction, props} from '@ngrx/store';
import IPhoto from '../../../models/photo.model';

export const loadAllPhotos = createAction('[ADMIN PHOTO PHOTO] Load All Photos');
export const loadAllPhotosSuccess = createAction('[ADMIN PHOTO] Load All Photos Success', props<{ payload: IPhoto[] }>());
export const loadAllPhotosFail = createAction('[ADMIN PHOTO] Load All Photos Fail', props<{ error: any }>());

export const loadPhotosByGenre = createAction('[ADMIN PHOTO] Load Photos By Genre', props<{ params: string }>());
export const loadPhotosByGenreSuccess = createAction('[ADMIN PHOTO] Load Photos By Genre Success', props<{ payload: IPhoto[] }>());
export const loadPhotosByGenreFail = createAction('[ADMIN PHOTO] Load Photos By Genre Fail', props<{ error: any }>());

export const loadPhoto = createAction('[ADMIN PHOTO] Load Photo', props<{ params: string }>());
export const loadPhotoSuccess = createAction('[ADMIN PHOTO] Load Photo Success', props<{ payload: IPhoto }>());
export const loadPhotoFail = createAction('[ADMIN PHOTO] Load Photo Fail', props<{ error: any }>());

export const updatePhoto = createAction('[ADMIN PHOTO] Update Photo', props<{ params: IPhoto }>());
export const updatePhotoSuccess = createAction('[ADMIN PHOTO] Update Photo Success', props<{ payload: IPhoto }>());
export const updatePhotoFail = createAction('[ADMIN PHOTO] Update Photo Fail', props<{ error: any }>());

export const deletePhoto = createAction('[ADMIN PHOTO] Delete Photo', props<{ params: string }>());
export const deletePhotoSuccess = createAction('[ADMIN PHOTO] Delete Photo Success');
export const deletePhotoFail = createAction('[ADMIN PHOTO] Delete Photo Fail', props<{ error: any }>());

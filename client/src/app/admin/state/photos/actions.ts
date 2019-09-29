import {createAction, props} from '@ngrx/store';
import {error} from 'selenium-webdriver';
import IPhoto from '../../../models/photo.model';

export const loadAllPhotos = createAction('[ADMIN PHOTO PHOTO] Load All Photos');
export const loadAllPhotosSuccess = createAction('[ADMIN PHOTO] Load All Photos Success', props<{ payload: IPhoto[] }>());
export const loadAllPhotosFail = createAction('[ADMIN PHOTO] Load All Photos Fail', props<{ error: any }>());

export const loadPhotosByGenre = createAction('[ADMIN PHOTO] Load Photos By Genre', props<{ id: string }>());
export const loadPhotosByGenreSuccess = createAction('[ADMIN PHOTO] Load Photos By Genre Success', props<{ payload: IPhoto[] }>());
export const loadPhotosByGenreFail = createAction('[ADMIN PHOTO] Load Photos By Genre Fail', props<{ error: any }>());

// export const loadPhoto = createAction('[ADMIN PHOTO] Load Photo', props<{ id: string }>());
// export const loadPhotoSuccess = createAction('[ADMIN PHOTO] Load Photo Success', props<{ payload: IPhoto }>());
// export const loadPhotoFail = createAction('[ADMIN PHOTO] Load Photo Fail', props<{ error: any }>());

// export const createPhoto = createAction('[ADMIN PHOTO] Create Photo', props<{ params: Partial<IPhoto> }>());
// export const createPhotoSuccess = createAction('[ADMIN PHOTO] Create Photo Success', props<{ payload: IPhoto }>());
// export const createPhotoFail = createAction('[ADMIN PHOTO] Create Photo Fail', props<{ error: any }>());

export const uploadRequest = createAction('[ADMIN PHOTO] Upload Request', props<{ params: File }>());
export const uploadCancel = createAction('[ADMIN PHOTO] Upload Cancel');
export const uploadReset = createAction('[ADMIN PHOTO] Upload Reset');
export const uploadStarted = createAction('[ADMIN PHOTO] Upload Started');
export const uploadProgress = createAction('[ADMIN PHOTO] Upload Progress', props<{ progress: number }>());
export const uploadCompleted = createAction('[ADMIN PHOTO] Upload Success');
export const uploadCompletedSuccess = createAction('[ADMIN PHOTO] Upload Success', props<{ payload: any }>()); // TODO: change to IPhoto
export const uploadFail = createAction('[ADMIN PHOTO] Upload Fail', props<{ error: any }>());

export const updatePhoto = createAction('[ADMIN PHOTO] Update Photo', props<{ id: string, params: Partial<IPhoto> }>());
export const updatePhotoSuccess = createAction('[ADMIN PHOTO] Update Photo Success', props<{ payload: IPhoto }>());
export const updatePhotoFail = createAction('[ADMIN PHOTO] Update Photo Fail', props<{ error: any }>());

export const deletePhoto = createAction('[ADMIN PHOTO] Delete Photo', props<{ id: string }>());
export const deletePhotoSuccess = createAction('[ADMIN PHOTO] Delete Photo Success', props<{ id: string }>());
export const deletePhotoFail = createAction('[ADMIN PHOTO] Delete Photo Fail', props<{ error: any }>());

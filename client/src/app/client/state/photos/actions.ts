import { createAction, props } from '@ngrx/store';
import IPhoto from '../../../models/photo.model';

export const loadPhotosByGenre = createAction('[CLIENT PHOTO] Load Photos', props<{ id: string }>());
export const loadPhotosByGenreSuccess = createAction('[CLIENT PHOTO] Load Photos Success', props<{ payload: IPhoto[] }>());
export const loadPhotosByGenreFail = createAction('[CLIENT PHOTO] Load Photos Fail', props<{ error: any }>());



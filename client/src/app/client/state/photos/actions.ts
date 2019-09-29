import {createAction, props} from '@ngrx/store';
import IPhoto from '../../../models/photo.model';

export const loadPhotosByGenre = createAction('[CLIENT PHOTOS] Load Photos', props<{ id: string }>());
export const loadPhotosByGenreSuccess = createAction('[CLIENT PHOTOS] Load Photos Success', props<{ payload: IPhoto[] }>());
export const loadPhotosByGenreFail = createAction('[CLIENT PHOTOS] Load Photos Fail', props<{ error: any }>());

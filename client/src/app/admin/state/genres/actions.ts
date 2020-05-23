import { createAction, props } from '@ngrx/store';
import IGenre from '../../../models/genre.model';

export const loadAllGenres = createAction('[ADMIN GENRE] Load All Genres');
export const loadAllGenresSuccess = createAction('[ADMIN GENRE] Load All Genres Success', props<{ payload: IGenre[] }>());
export const loadAllGenresFail = createAction('[ADMIN GENRE] Load All Genres Fail', props<{ error: any }>());

// export const loadGenre = createAction('[ADMIN GENRE] Load Genre', props<{ id: string }>());
// export const loadGenreSuccess = createAction('[ADMIN GENRE] Load Genre Success', props<{ payload: IGenre }>());
// export const loadGenreFail = createAction('[ADMIN GENRE] Load Genre Fail', props<{ error: any }>());

export const createGenre = createAction('[ADMIN GENRE] Create Genre', props<{ params: string }>());
export const createGenreSuccess = createAction('[ADMIN GENRE] Create Genre Success', props<{ payload: IGenre }>());
export const createGenreFail = createAction('[ADMIN GENRE] Create Genre Fail', props<{ error: any }>());

export const updateGenre = createAction('[ADMIN GENRE] Update Genre', props<{ params: IGenre }>());
export const updateGenreSuccess = createAction('[ADMIN GENRE] Update Genre Success', props<{ payload: IGenre }>());
export const updateGenreFail = createAction('[ADMIN GENRE] Update Genre Fail', props<{ error: any }>());

export const deleteGenre = createAction('[ADMIN GENRE] Delete Genre', props<{ id: string }>());
export const deleteGenreSuccess = createAction('[ADMIN GENRE] Delete Genre Success', props<{ id: string }>());
export const deleteGenreFail = createAction('[ADMIN GENRE] Delete Genre Fail', props<{ error: any }>());





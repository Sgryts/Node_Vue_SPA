import { createAction, props } from '@ngrx/store';
import IGenre from '../../../models/genre.model';

export const loadAllGenres = createAction('[CLIENT GENRE] Load All Genres');
export const loadAllGenresSuccess = createAction('[CLIENT GENRE] Load All Genres Success', props<{ payload: IGenre[] }>());
export const loadAllGenresFail = createAction('[CLIENT GENRE] Load All Genres Fail', props<{ error: any }>());

export const loadingStarted = createAction('[CLIENT GENRE] Loading Started');


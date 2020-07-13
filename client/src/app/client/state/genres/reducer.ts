import { Action, createReducer, on } from '@ngrx/store';
import * as GenreActions from './actions';
import IGenre from '../../../models/genre.model';

export interface State {
  genres: IGenre[];
  isLoaded: boolean;
  error: string;
}

const initialState: State = {
  genres: [],
  isLoaded: false,
  error: null
};

const genresReducer = createReducer(initialState,
  on(GenreActions.loadingStarted, (state,) => ({
    ...state,
    isLoaded: false
  })),
  on(GenreActions.loadAllGenresSuccess, (state, { payload }) => ({
    ...state,
    genres: payload || [],
    isLoaded: true,
    error: null
  })),

  on(GenreActions.loadAllGenresFail, (state, { error }) => ({
    ...state,
    isLoaded: true,
    error: error
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return genresReducer(state, action);
}

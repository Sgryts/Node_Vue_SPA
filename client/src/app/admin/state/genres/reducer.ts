import { Action, createReducer, on } from '@ngrx/store';
import * as GenreActions from './actions';
import IGenre from '../../../models/genre.model';

export interface State {
  genres: IGenre[];
  isLoaded: boolean;
  error: string
}

const initialState: State = {
  genres: [],
  isLoaded: false,
  error: null
};

const genresReducer = createReducer(initialState,
  on(GenreActions.loadAllGenresSuccess, (state, { payload }) => ({
    ...state,
    genres: payload || [],
    error: null
  })),

  on(GenreActions.loadAllGenresFail, (state, { error }) => ({
    ...state,
    error: error
  })),

  on(GenreActions.createGenreSuccess, (state, { payload }) => ({
    ...state,
    genres: [...state.genres, payload],
    error: null
  })),

  on(GenreActions.createGenreFail, (state, { error }) => ({
    ...state,
    error: error
  })),

  on(GenreActions.updateGenreSuccess, (state, { payload }) => ({
    ...state,
    genres: state.genres.map((genre: IGenre): IGenre => payload._id === genre._id ? payload : genre),
    error: null
  })),

  on(GenreActions.updateGenreFail, (state, { error }) => ({
    ...state,
    error: error
  })),

  on(GenreActions.deleteGenreSuccess, (state, { id }) => ({
    ...state,
    genres: state.genres.filter((genre: IGenre): boolean => genre._id !== id),
    error: null
  })),

  on(GenreActions.deleteGenreFail, (state, { error }) => ({
    ...state,
    error: error
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return genresReducer(state, action);
}

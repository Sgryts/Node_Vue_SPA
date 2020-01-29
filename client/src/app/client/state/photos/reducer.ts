import { Action, createReducer, on } from '@ngrx/store';
import { error } from 'selenium-webdriver';
import * as GenreActions from './actions';
import IPhoto from '../../../models/photo.model';

export interface State {
  photos: IPhoto[];
  isLoaded: boolean,
  error: string;
}

const initialState: State = {
  photos: [],
  isLoaded: false,
  error: null
};

const photosReducer = createReducer(initialState,
  on(GenreActions.loadPhotosByGenreSuccess, (state, { payload }) => ({
    ...state,
    photos: payload || [],
    isLoaded: true,
    error: null
  })),

  on(GenreActions.initLoadPhotosByGenreSuccess, (state, { payload }) => ({
    ...state,
    photos: payload || [],
    isLoaded: true,
    error: null
  })),

  on(GenreActions.loadPhotosByGenreFail, (state, { error }) => ({
    ...state,
    isLoaded: true,
    error: error
  })),

  on(GenreActions.initLoadPhotosByGenreFail, (state, { error }) => ({
    ...state,
    isLoaded: true,
    error: error
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return photosReducer(state, action);
}

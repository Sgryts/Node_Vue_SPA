import { Action, createReducer, on } from '@ngrx/store';
import { error } from 'selenium-webdriver';
import * as PhotoActions from './actions';
import IPhoto from '../../../models/photo.model';

export interface State {
  photos: IPhoto[];
  isLoaded: boolean;
  error: string;
}

const initialState: State = {
  photos: [],
  isLoaded: false,
  error: null
};

const photosReducer = createReducer(initialState,
  on(PhotoActions.loadingStarted, (state,) => ({
    ...state,
    isLoaded: false
  })),
  on(PhotoActions.loadPhotosByGenreSuccess, (state, { payload }) => ({
    ...state,
    photos: payload || [],
    isLoaded: true,
    error: null
  })),

  on(PhotoActions.loadPhotosByGenreFail, (state, { error }) => ({
    ...state,
    isLoaded: true,
    error: error
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return photosReducer(state, action);
}

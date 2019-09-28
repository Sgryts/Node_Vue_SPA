import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromAuth from './auth/reducer';
import * as fromGenres from './genres/reducer';
import * as fromPhotos from './photos/reducer';

export const FEATURE_NAME = 'admin';

export interface State {
    [FEATURE_NAME]: FeatureState;
}

export interface FeatureState {
    auth: fromAuth.State,
    genres: fromGenres.State,
    photos: fromPhotos.State,
}

export const reducers: ActionReducerMap<FeatureState> = {
    auth: fromAuth.reducer,
    genres: fromGenres.reducer,
    photos: fromPhotos.reducer,
};

export const selectFeatureState = createFeatureSelector<FeatureState>(FEATURE_NAME);

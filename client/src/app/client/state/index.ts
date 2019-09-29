import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromGenres from './genres/reducer';
import * as fromPhotos from './photos/reducer';

export const FEATURE_NAME = 'client';

export interface State {
    [FEATURE_NAME]: FeatureState;
}

export interface FeatureState {
    genres: fromGenres.State;
    photos: fromPhotos.State
}

export const reducers: ActionReducerMap<FeatureState> = {
    genres: fromGenres.reducer,
    photos: fromPhotos.reducer,
};

export const selectFeatureState = createFeatureSelector<FeatureState>(FEATURE_NAME);

export const selectGenres = createSelector(selectFeatureState, (state) => state.photos);

export const selectPhotos = createSelector(selectFeatureState, (state) => state.photos);

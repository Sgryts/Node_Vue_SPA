import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromClient from './reducer';

// TODO: import genre, photos reducers
export const FEATURE_NAME = 'client';

export interface State {
    [FEATURE_NAME]: FeatureState;
}

export interface FeatureState {
    client: fromClient.State;
}

export const reducers: ActionReducerMap<FeatureState> = {
    client: fromClient.reducer,
};

export const selectFeatureState = createFeatureSelector<FeatureState>(FEATURE_NAME);

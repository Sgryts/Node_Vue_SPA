import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
// import * as fromAuth from './auth/reducer';
import * as fromClient from './reducer';
// import * as fromAdmin from './admin/reducer';


export const FEATURE_NAME = 'sgpixels';

export interface State {
    [FEATURE_NAME]: FeatureState;
}

export interface FeatureState {
    // auth: fromAuth.State;
    client: fromClient.State;
    // admin: fromAdmin.State;
}

export const reducers: ActionReducerMap<FeatureState> = {
    // auth: fromAuth.State,
    client: fromClient.reducer,
    // admin: fromAdmin.State,
};

export const selectFeatureState = createFeatureSelector<FeatureState>(FEATURE_NAME);

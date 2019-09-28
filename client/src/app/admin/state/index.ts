import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
// import * as fromAuth from './auth/reducer';
// import * as fromUser from './auth/reducer';
// import * as fromAdmin from './admin/reducer';


export const FEATURE_NAME = 'admin';

export interface State {
    [FEATURE_NAME]: FeatureState;
}

export interface FeatureState {
    // auth: fromAuth.State;
    // user: fromUser.State;
    // admin: fromAdmin.State;
}

export const reducers: ActionReducerMap<FeatureState> = {
    // auth: fromAuth.State,
    // user: fromUser.State;
    // admin: fromAdmin.State,
};

export const selectFeatureState = createFeatureSelector<FeatureState>(FEATURE_NAME);

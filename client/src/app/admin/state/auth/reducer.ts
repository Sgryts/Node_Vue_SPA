import {Action, createReducer, on} from '@ngrx/store';
import * as AuthActions from './actions';
import IUser from '../../../models/user.model';

export interface State {
    user: IUser;
    error: string;
}

const initialState: State = {
    user: null,
    error: null
};

const adminReducer = createReducer(initialState,
    on(AuthActions.loginSuccess, (state, {payload}) => ({
        ...state,
        user: payload,
        error: null
    })),

    on(AuthActions.loginFail, (state, {error}) => ({
        ...state,
        user: null,
        error: error
    })),
);

export function reducer(state: State | undefined, action: Action) {
    return adminReducer(state, action);
}

import {Action, createReducer, on} from '@ngrx/store';
import * as GenreActions from './actions';
import IUser from '../../models/user.model';
import IGenre from '../../models/genre.model';
import IPhoto from '../../models/photo.model';

export interface State {
    genres: IGenre[];
    photos: IPhoto[];
    user: IUser;
    isAuthenticated: boolean;
    errors: any[]; // TODO: define a type
}

const initialState: State = {
    genres: [],
    photos: [],
    user: null,
    isAuthenticated: false,
    errors: []
};

const adminReducer = createReducer(initialState,
    on(GenreActions.loadAllGenresSuccess, (state, {payload}) => ({
        ...state,
        genres: payload || [],
    })),

    on(GenreActions.loadAllGenresFail, (state, {error}) => ({
        ...state,
        genres: [],
        errors: [...error]
    })),

    on(GenreActions.loadPhotosByGenreSuccess, (state, {payload}) => ({
        ...state,
        photos: payload || []
    })),

    on(GenreActions.loadPhotosByGenreFail, (state, {error}) => ({
        ...state,
        photos: [],
        errors: [...error]
    }))
);

export function reducer(state: State | undefined, action: Action) {
    return adminReducer(state, action);
}

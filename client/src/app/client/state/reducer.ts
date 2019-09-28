import {Action, createReducer, on} from '@ngrx/store';
import * as GenreActions from './actions';
import IGenre from '../../models/genre.model';
import IPhoto from '../../models/photo.model';

export interface State {
    genres: IGenre[];
    photos: IPhoto[];
    error: string;
}

const initialState: State = {
    genres: [],
    photos: [],
    error: null
};

const clientReducer = createReducer(initialState,
    on(GenreActions.loadAllGenresSuccess, (state, {payload}) => ({
        ...state,
        genres: payload || []
    })),

    on(GenreActions.loadAllGenresFail, (state, {error}) => ({
        ...state,
        genres: [],
        error: error
    })),

    on(GenreActions.loadPhotosByGenreSuccess, (state, {payload}) => ({
        ...state,
        photos: payload || []
    })),

    on(GenreActions.loadPhotosByGenreFail, (state, {error}) => ({
        ...state,
        genres: [],
        error: error
    })),
);

export function reducer(state: State | undefined, action: Action) {
    return clientReducer(state, action);
}

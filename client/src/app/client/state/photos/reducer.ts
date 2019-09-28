import {Action, createReducer, on} from '@ngrx/store';
import * as GenreActions from './actions';
import IPhoto from '../../../models/photo.model';

export interface State {
    photos: IPhoto[];
    error: string;
}

const initialState: State = {
    photos: [],
    error: null
};

const photosReducer = createReducer(initialState,
    on(GenreActions.loadPhotosByGenreSuccess, (state, {payload}) => ({
        ...state,
        photos: payload || []
    })),

    on(GenreActions.loadPhotosByGenreFail, (state, {error}) => ({
        ...state,
        photos: [],
        error: error
    })),
);

export function reducer(state: State | undefined, action: Action) {
    return photosReducer(state, action);
}

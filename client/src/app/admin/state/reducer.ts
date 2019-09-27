import {Action, createReducer, on} from '@ngrx/store';
import * as GenreActions from './actions';
import IGenre from '../../models/genre.model';
import IPhoto from '../../models/photo.model';

export interface State {
    genres: IGenre[];
    photos: IPhoto[];
}

const initialState: State = {
    genres: [],
    photos: [],
};

const clientReducer = createReducer(initialState,
    on(GenreActions.loadAllGenresSuccess, (state, {payload}) => ({
        ...state,
        genres: payload || []
    })),

    on(GenreActions.loadAllPhotosSuccess, (state, {payload}) => ({
        ...state,
        photos: payload || []
    }))
);

export function reducer(state: State | undefined, action: Action) {
    return clientReducer(state, action);
}

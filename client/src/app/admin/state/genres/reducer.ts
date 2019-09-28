import {Action, createReducer, on} from '@ngrx/store';
import * as GenreActions from './actions';
import IGenre from '../../../models/genre.model';

export interface State {
    genres: IGenre[];
    error: string
}

const initialState: State = {
    genres: [],
    error: null
};

const genresReducer = createReducer(initialState,
    on(GenreActions.loadAllGenresSuccess, (state, {payload}) => ({
        ...state,
        genres: payload || [],
    })),

    on(GenreActions.loadAllGenresFail, (state, {error}) => ({
        ...state,
        genres: [],
        error: error
    })),
);

export function reducer(state: State | undefined, action: Action) {
    return genresReducer(state, action);
}

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
        error: null
    })),

    on(GenreActions.loadAllGenresFail, (state, {error}) => ({
        ...state,
        error: error
    })),

    on(GenreActions.createGenreSuccess, (state, {payload}) => ({
        ...state,
        genres: [...state.genres, payload],
        error: null
    })),

    on(GenreActions.createGenreFail, (state, {error}) => ({
        ...state,
        error: error
    })),

    on(GenreActions.updateGenreSuccess, (state, {payload}) => ({
        ...state,
        genres: state.genres.map((genre: IGenre) => payload.id === genre.id ? payload : genre),
        error: null
    })),

    on(GenreActions.updateGenreFail, (state, {error}) => ({
        ...state,
        error: error
    })),

    on(GenreActions.deleteGenreSuccess, (state, {id}) => ({
        ...state,
        genres: state.genres.filter(genre => genre.id !== id),
        error: null
    })),

    on(GenreActions.deleteGenreFail, (state, {error}) => ({
        ...state,
        error: error
    })),
    )
;

export function reducer(state: State | undefined, action: Action) {
    return genresReducer(state, action);
}

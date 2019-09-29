import {Action, createReducer, on} from '@ngrx/store';
import * as PhotosActions from './actions';
import IPhoto from '../../../models/photo.model';

enum UploadStatus {
    Ready = 'Ready',
    Requested = 'Requested',
    Started = 'Started',
    Failed = 'Failed',
    Completed = 'Completed'
}

export interface State {
    photos: IPhoto[];
    photo: IPhoto,
    status: UploadStatus;
    progress: number | null;
    error: string | null;
}

const initialState: State = {
    photos: [],
    photo: null,
    status: UploadStatus.Ready,
    progress: null,
    error: null
};

const photosReducer = createReducer(initialState,
    on(PhotosActions.loadPhotosByGenreSuccess, (state, {payload}) => ({
        ...state,
        photos: payload || [],
        error: null
    })),

    on(PhotosActions.loadPhotosByGenreFail, (state, {error}) => ({
        ...state,
        photos: [],
        error: error
    })),

    on(PhotosActions.loadPhotoSuccess, (state, {payload}) => ({
        ...state,
        photo: payload,
        error: null
    })),

    on(PhotosActions.loadPhotoFail, (state, {error}) => ({
        ...state,
        error: error
    }))
);

export function reducer(state: State | undefined, action: Action) {
    return photosReducer(state, action);
}

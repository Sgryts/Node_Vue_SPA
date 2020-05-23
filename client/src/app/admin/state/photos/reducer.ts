import { Action, createReducer, on } from '@ngrx/store';
import IGenre from '../../../models/genre.model';
import * as GenreActions from '../genres/actions';
import { uploadRequest } from './actions';
import * as PhotosActions from './actions';
import IPhoto from '../../../models/photo.model';

export enum UploadStatus {
  Ready = 'Ready',
  Requested = 'Requested',
  Started = 'Started',
  Failed = 'Failed',
  Completed = 'Completed'
}

export interface State {
  photos: IPhoto[];
  status: UploadStatus;
  isLoaded: boolean;
  progress: number | null;
  error: string | null;
}

const initialState: State = {
  photos: [],
  status: UploadStatus.Ready,
  isLoaded: false,
  progress: null,
  error: null
};

const photosReducer = createReducer(initialState,
  on(PhotosActions.loadPhotosByGenreSuccess, (state, { payload }) => ({
    ...state,
    photos: payload || [],
    isLoaded: true,
    error: null
  })),

  on(PhotosActions.loadPhotosByGenreFail, (state, { error }) => ({
    ...state,
    photos: [],
    isLoaded: true,
    error: error
  })),

  on(PhotosActions.uploadRequest, (state) => ({
    ...state,
    status: UploadStatus.Requested,
    progress: null,
    isLoaded: false,
    error: null
  })),

  on(PhotosActions.uploadCancel, (state) => ({
    ...state,
    status: UploadStatus.Ready,
    progress: null,
    isLoaded: true,
    error: null
  })),

  on(PhotosActions.uploadReset, (state) => ({
    ...state,
    status: UploadStatus.Ready,
    progress: null,
    isLoaded: true,
    error: null
  })),

  on(PhotosActions.uploadFail, (state, { error }) => ({
    ...state,
    status: UploadStatus.Failed,
    isLoaded: true,
    progress: null,
    error: error
  })),

  on(PhotosActions.uploadStarted, (state) => ({
    ...state,
    status: UploadStatus.Started,
    isLoaded: false,
    progress: 0,
    error: null
  })),

  on(PhotosActions.uploadProgress, (state, { progress }) => ({
    ...state,
    progress: progress,
    isLoaded: false,
    error: null
  })),

  on(PhotosActions.uploadCompleted, (state) => ({
    ...state,
    status: UploadStatus.Completed,
    isLoaded: true,
    progress: 100,
    error: null
  })),

  on(PhotosActions.uploadCompletedSuccess, (state, { payload }) => ({
    ...state,
    genres: [...state.photos, payload],
    error: null
  })),

  on(PhotosActions.updatePhotoSuccess, (state, { payload }) => ({
    ...state,
    photos: state.photos.map((photo: IPhoto) => payload._id === photo._id ? payload : photo),
    isLoaded: true,
    error: null
  })),

  on(PhotosActions.updatePhotoFail, (state, { error }) => ({
    ...state,
    isLoaded: true,
    error: error
  })),

  on(PhotosActions.deletePhotoSuccess, (state, { id }) => ({
    ...state,
    photos: state.photos.filter((photo: IPhoto) => photo._id !== id),
    isLoaded: true,
    error: null
  })),

  on(PhotosActions.deletePhotoFail, (state, { error }) => ({
    ...state,
    isLoaded: true,
    error: error
  }))
);


export function reducer(state: State | undefined, action: Action) {
  return photosReducer(state, action);
}

import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromAuth from './auth/reducer';
import * as fromGenres from './genres/reducer';
import * as fromPhotos from './photos/reducer';
import {UploadStatus} from './photos/reducer';

export const FEATURE_NAME = 'admin';

export interface State {
    [FEATURE_NAME]: FeatureState;
}

export interface FeatureState {
    auth: fromAuth.State,
    genres: fromGenres.State,
    photos: fromPhotos.State,
}

export const reducers: ActionReducerMap<FeatureState> = {
    auth: fromAuth.reducer,
    genres: fromGenres.reducer,
    photos: fromPhotos.reducer,
};

export const selectFeatureState = createFeatureSelector<FeatureState>(FEATURE_NAME);
export const selectAuthError = createSelector(selectFeatureState, (state) => state.auth.error);
export const selectGenres = createSelector(selectFeatureState, (state) => state.genres);
export const selectGenresError = createSelector(selectFeatureState, (state) => state.genres.error);

export const selectPhotos = createSelector(selectFeatureState, (state) => state.photos);
export const selectPhotosError = createSelector(selectFeatureState, (state) => state.photos.error);

export const selectPhotoUploadStarted = createSelector(selectFeatureState, (state) =>
    state.photos.status === UploadStatus.Started);
export const selectPhotoUploadRequested = createSelector(selectFeatureState, (state) =>
    state.photos.status === UploadStatus.Requested);
export const selectPhotoUploadReady = createSelector(selectFeatureState, (state) =>
    state.photos.status === UploadStatus.Ready);
export const selectPhotoUploadProgress = createSelector(selectFeatureState, (state) =>
    state.photos.progress);
export const selectPhotoUploadInProgress = createSelector(selectFeatureState, (state) =>
    state.photos.status === UploadStatus.Started && state.photos.progress >= 0);
export const selectPhotoUploadFail = createSelector(selectFeatureState, (state) =>
    state.photos.status === UploadStatus.Failed);
export const selectPhotoUploadCompleted = createSelector(selectFeatureState, (state) =>
    state.photos.status === UploadStatus.Completed);


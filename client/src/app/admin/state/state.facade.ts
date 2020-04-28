import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import IGenre from '../../models/genre.model';
import IPhoto from '../../models/photo.model';
import * as authActions from './auth/actions';
import * as genresActions from './genres/actions';
import {
  selectAuthError,
  selectGenres,
  selectGenresError,
  selectPhotos,
  selectPhotosError, selectPhotoUploadCompleted,
  selectPhotoUploadFail,
  selectPhotoUploadInProgress,
  selectPhotoUploadProgress,
  selectPhotoUploadReady,
  selectPhotoUploadRequested, selectPhotoUploadStarted,
  State
} from './index';
import * as photosActions from './photos/actions';

@Injectable()
export class AdminStateFacade {
  constructor(private store$: Store<State>) {
  }

  // GENRE
  getGenres$: Observable<IGenre[]> = this.store$.select(selectGenres);

  loadGenres(): void {
    this.store$.dispatch(genresActions.loadAllGenres());
  }

  createGenre$(params: string) {
    return this.store$.dispatch(genresActions.createGenre({ params }));
  }

  updateGenre$(id: string, params: string) {
    return this.store$.dispatch(genresActions.updateGenre({ id, params }));
  }

  deleteGenre$(id: string) {
    return this.store$.dispatch(genresActions.deleteGenre({ id }));
  }

  getGenresError$ = this.store$.select(selectGenresError);

  // PHOTO
  getPhotos$ = this.store$.select(selectPhotos);


  uploadPhoto$(params: File) {
    return this.store$.dispatch(photosActions.uploadRequest({ params }));
  }

  getPhotoUploadReady$ = this.store$.select(selectPhotoUploadReady);
  getPhotoUploadRequested$ = this.store$.select(selectPhotoUploadRequested);
  getPhotoUploadStarted$ = this.store$.select(selectPhotoUploadStarted);
  getPhotoUploadProgress$ = this.store$.select(selectPhotoUploadProgress);
  getPhotoUploadInProgress$ = this.store$.select(selectPhotoUploadInProgress);
  getPhotoUploadCompleted$ = this.store$.select(selectPhotoUploadCompleted);
  getPhotoUploadError$ = this.store$.select(selectPhotoUploadFail);

  updatePhoto$(id: string, params: Partial<IPhoto>) {
    return this.store$.dispatch(photosActions.updatePhoto({ id, params }))
  }

  deletePhoto$(id: string) {
    return this.store$.dispatch(photosActions.deletePhoto({ id }));
  }

  getPhotosError$ = this.store$.select(selectPhotosError);

  // AUTH
  login$(email: string, password: string) {
    return this.store$.dispatch(authActions.login({ email, password }));
  }

  logout$() {
    return this.store$.dispatch(authActions.logout())
  }

  getAuthError$ = this.store$.select(selectAuthError);

}

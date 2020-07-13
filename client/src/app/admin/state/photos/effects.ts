import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  takeUntil,
  withLatestFrom
} from 'rxjs/operators';
import IPhoto from '../../../models/photo.model';
import { PhotoService } from '../../services/photo.service';
import { State, selectGenres } from '../index';
import * as PhotoActions from './actions';
import find from 'lodash/find';
import IGenre from 'src/app/models/genre.model';

@Injectable()
export class PhotosEffects {
  constructor(private action$: Actions, private store$: Store<State>,
    private photoService: PhotoService) {
  }

  loadPhotosByGenre$: Observable<Action> = createEffect(() => {
    return this.action$.pipe(
      ofType(PhotoActions.loadPhotosByGenre),
      withLatestFrom(this.store$.select(selectGenres)),
      switchMap(([{ id }, genres]: [{ id: string }, Array<IGenre>]) => {
        if (id === '') {
          id = (find(genres, (g: IGenre): boolean => g.name === 'All'))?._id;
        }
        return this.photoService.getPhotosByGenre(id).pipe(
          map((payload) => PhotoActions.loadPhotosByGenreSuccess({ payload })),
          catchError((error) => of(PhotoActions.loadPhotosByGenreFail({ error }))));
      })
    );
  });

  // @Effect()
  // loadPhoto$: Observable<Action> = createEffect(() =>
  //     this.action$.pipe(
  //         ofType(PhotoActions.loadPhoto),
  //         mergeMap(({id}) => {
  //             return this.photoService.getPhoto(id).pipe(
  //                 map((payload) => PhotoActions.loadPhotoSuccess({payload})),
  //                 catchError(error => of(PhotoActions.loadPhotoFail({error}))));
  //         })
  //     ));

  uploadPhoto$: Observable<Action> = createEffect(() => {
    return this.action$.pipe(
      ofType(PhotoActions.uploadRequest),
      switchMap(({ params }) => {
        return this.photoService.uploadPhoto(params).pipe(
          takeUntil(this.action$.pipe(ofType(PhotoActions.uploadCancel))),
          map(event => this.photoService.getActionFromHttpEvent(event)),
          // TODO: Reinitialize after the upload?
          // mergeMap((payload) => of(PhotoActions.uploadCompletedSuccess({ payload }))),
          catchError(error => of(PhotoActions.updatePhotoFail({ error })))
        )
      })
    );
  });

  updatePhoto$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(PhotoActions.updatePhoto),
      mergeMap(({ params }) => {
        return this.photoService.updatePhoto(params).pipe(
          map((payload: IPhoto) => PhotoActions.updatePhotoSuccess({ payload })),
          catchError(error => of(PhotoActions.updatePhotoFail({ error }))));
      })
    ));

  deletePhoto$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(PhotoActions.deletePhoto),
      mergeMap(({ id }) => {
        return this.photoService.deletePhoto(id).pipe(
          map(() => PhotoActions.deletePhotoSuccess({ id })),
          catchError(error => of(PhotoActions.deletePhotoFail({ error }))));
      })
    ));
}

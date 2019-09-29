import {Injectable} from '@angular/core';
import {Actions, Effect, ofType, createEffect} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, concatMap, map, mergeMap, takeUntil} from 'rxjs/operators';
import IPhoto from '../../../models/photo.model';
import {PhotoService} from '../../services/photo.service';
import {State} from '../index';
import * as PhotoActions from './actions';

@Injectable()
export class PhotosEffects {
    constructor(private action$: Actions, private store$: Store<State>,
                private photoService: PhotoService) {
    }

    @Effect()
    loadPhotos$: Observable<Action> = createEffect(() =>
        this.action$.pipe(
            ofType(PhotoActions.loadPhotosByGenre),
            mergeMap(({id}) => {
                return this.photoService.getPhotosByGenre(id).pipe(
                    map((payload) => PhotoActions.loadPhotosByGenreSuccess({payload})),
                    catchError(error => of(PhotoActions.loadPhotosByGenreFail({error}))));
            })
        ));

    @Effect()
    loadPhoto$: Observable<Action> = createEffect(() =>
        this.action$.pipe(
            ofType(PhotoActions.loadPhoto),
            mergeMap(({id}) => {
                return this.photoService.getPhoto(id).pipe(
                    map((payload) => PhotoActions.loadPhotoSuccess({payload})),
                    catchError(error => of(PhotoActions.loadPhotoFail({error}))));
            })
        ));

    @Effect()
    createPhoto$: Observable<Action> = createEffect(() => {
        return this.action$.pipe(
            ofType(PhotoActions.uploadRequest),
            mergeMap(({params}) => {
                return this.photoService.uploadPhoto(params).pipe(
                    takeUntil(this.action$.pipe(ofType(PhotoActions.uploadCancel))),
                    map(event => this.photoService.getActionFromHttpEvent(event)),
                    catchError(error => of(PhotoActions.updatePhotoFail({error})))
                )
            })
        );
    });

    @Effect()
    updatePhoto$: Observable<Action> = createEffect(() =>
        this.action$.pipe(
            ofType(PhotoActions.updatePhoto),
            mergeMap(({id, photo}) => {
                return this.photoService.updatePhoto(id, photo).pipe(
                    map((payload: IPhoto) => PhotoActions.updatePhotoSuccess({payload})),
                    catchError(error => of(PhotoActions.updatePhotoFail({error}))));
            })
        ));

    @Effect()
    deletePhoto$: Observable<Action> = createEffect(() =>
        this.action$.pipe(
            ofType(PhotoActions.deletePhoto),
            mergeMap(({id}) => {
                return this.photoService.deletePhoto(id).pipe(
                    map(() => PhotoActions.deletePhotoSuccess({id})),
                    catchError(error => of(PhotoActions.deletePhotoFail({error}))));
            })
        ));
}

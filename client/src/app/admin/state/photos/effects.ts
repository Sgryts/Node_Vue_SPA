import {Injectable} from '@angular/core';
import {Actions, Effect, ofType, createEffect} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {PhotoService} from '../../services/photo.service';
import {State} from '../index';
import * as PhotoActions from './actions';

@Injectable()
export class PhotosEffects {
    constructor(private action$: Actions, private store$: Store<State>,
                private photoService: PhotoService) {
    }

    @Effect()
    loadPhotos$ = createEffect(() =>
        this.action$.pipe(
            ofType(PhotoActions.loadPhotosByGenre),
            mergeMap(({params}) => {
                return this.photoService.getPhotosByGenre(params).pipe(
                    map((payload) => PhotoActions.loadPhotosByGenreSuccess({payload})),
                    catchError(error => of(PhotoActions.loadPhotosByGenreFail({error}))));
            })
        ));
}

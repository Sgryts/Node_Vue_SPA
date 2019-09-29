import {Injectable} from '@angular/core';
import {Actions, Effect, ofType, createEffect} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
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
    loadPhotos$: Observable<Action> = createEffect(() => {
        return this.action$.pipe(
            ofType(PhotoActions.loadPhotosByGenre),
            mergeMap(({id}) => {
                return this.photoService.getPhotosByGenre(id).pipe(
                    map((payload) => PhotoActions.loadPhotosByGenreSuccess({payload})),
                    catchError((error) => of(PhotoActions.loadPhotosByGenreFail({error}))));
            })
        );
    });
}

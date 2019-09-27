import {Injectable} from '@angular/core';
import {Actions, Effect, ofType, createEffect} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {State} from '.';
import {GenreService} from '../services/genre.service';
import {PhotoService} from '../services/photo.service';
import * as ClientActions from './actions';

@Injectable()
export class ClientEffects {
    constructor(private action$: Actions, private store$: Store<State>,
                private photoService: PhotoService, private genreService: GenreService) {
    }

    @Effect()
    loadGenres$ = createEffect(() =>
        this.action$.pipe(
            ofType(ClientActions.loadAllGenres),
            mergeMap(() => {
                return this.genreService.getAllGenres().pipe(
                    map((payload) => ClientActions.loadAllGenresSuccess({payload})),
                    catchError(error => of(ClientActions.loadAllGenresFail({error}))));
            })
        ));

    @Effect()
    loadPhotos$ = createEffect(() =>
        this.action$.pipe(
            ofType(ClientActions.loadPhotosByGenre),
            mergeMap(({params}) => {
                return this.photoService.getPhotosByGenre(params).pipe(
                    map((payload) => ClientActions.loadPhotosByGenreSuccess({payload})),
                    catchError(error => of(ClientActions.loadPhotosByGenreFail({error}))));
            })
        ));
}

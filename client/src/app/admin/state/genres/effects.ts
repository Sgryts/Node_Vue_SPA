import {Injectable} from '@angular/core';
import {Actions, Effect, ofType, createEffect} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {State} from '../index';
import {GenreService} from '../../services/genre.service';
import * as GenreActions from './actions';

@Injectable()
export class GenresEffects {
    constructor(private action$: Actions, private store$: Store<State>,
                private genreService: GenreService) {
    }

    @Effect()
    loadGenres$: Observable<Action> = createEffect(() =>
        this.action$.pipe(
            ofType(GenreActions.loadAllGenres),
            mergeMap(() => {
                return this.genreService.getAllGenres().pipe(
                    map((payload) => GenreActions.loadAllGenresSuccess({payload})),
                    catchError(error => of(GenreActions.loadAllGenresFail({error}))));
            })
        ));

    @Effect()
    loadGenre$: Observable<Action> = createEffect(() =>
        this.action$.pipe(
            ofType(GenreActions.loadGenre),
            mergeMap(({id}) => {
                return this.genreService.getGenre(id).pipe(
                    map((payload) => GenreActions.loadGenreSuccess({payload})),
                    catchError(error => of(GenreActions.loadGenreFail({error}))));
            })
        ));

    @Effect()
    createGenre$: Observable<Action> = createEffect(() =>
        this.action$.pipe(
            ofType(GenreActions.createGenre),
            mergeMap(({params}) => {
                return this.genreService.createGenre(params.name).pipe(
                    map((payload) => GenreActions.createGenreSuccess({payload})),
                    catchError(error => of(GenreActions.createGenreFail({error}))));
            })
        ));

    @Effect()
    updateGenre$: Observable<Action> = createEffect(() => {
        return this.action$.pipe(
            ofType(GenreActions.updateGenre),
            mergeMap(({params}) => {
                return this.genreService.updateGenre(params.id, params.name).pipe(
                    map((payload) => GenreActions.updateGenreSuccess({payload})),
                    catchError(error => of(GenreActions.updateGenreFail({error}))));
            })
        );
    });

    @Effect()
    deleteGenre$: Observable<Action> = createEffect(() =>
        this.action$.pipe(
            ofType(GenreActions.deleteGenre),
            mergeMap(({id}) => {
                return this.genreService.deleteGenre(id).pipe(
                    map(() => GenreActions.deleteGenreSuccess({id})),
                    catchError(error => of(GenreActions.deleteGenreFail({error}))));
            })
        ));
}

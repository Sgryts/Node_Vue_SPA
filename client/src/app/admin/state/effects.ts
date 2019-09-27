import {Injectable} from '@angular/core';
import {Actions, Effect, ofType, createEffect} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {State} from '.';
import * as ClientActions from './actions';

@Injectable()
export class ClientEffects {
    constructor(private action$: Actions, private store$: Store<State>) {
    }

    @Effect()
    loadGenres$ = createEffect(() => this.action$.pipe(
        ofType(ClientActions.loadAllGenres),
        // mergeMap(() => {
        //     return this.countryRefDataService.loadLocationIdToCountryMap()
        //         .pipe(map((v) => Object.values(v)),
        //             map((countries) => ClientActions.loadAllGenresSuccess({payload})));
        //
        // }),
        // catchError(error => of(ClientActions.loadAllGenresFail({error})))
    ));
}

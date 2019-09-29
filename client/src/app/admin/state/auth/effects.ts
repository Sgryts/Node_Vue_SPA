import {Injectable} from '@angular/core';
import {Actions, Effect, ofType, createEffect} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {of} from 'rxjs';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';
import {State} from '../index';
import * as AuthActions from './actions';

@Injectable()
export class AuthEffects {
    constructor(private action$: Actions, private store$: Store<State>,
                private authService: AuthService) {
    }

    @Effect()
    logIn$ = createEffect(() =>
        this.action$.pipe(
            ofType(AuthActions.login),
            mergeMap(({email, password}) => {
                return this.authService.logIn(email, password).pipe(
                    map((payload) => AuthActions.loginSuccess({payload})), // TODO : set token
                    catchError(error => of(AuthActions.loginFail({error}))));
            })
        ));

    @Effect()
    logOut$ = createEffect(() =>
        this.action$.pipe(
            ofType(AuthActions.logout),
            tap(() => this.authService.logOut())));
}

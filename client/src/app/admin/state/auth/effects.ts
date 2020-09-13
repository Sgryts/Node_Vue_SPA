import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of, Observable } from 'rxjs';
import { catchError, map, tap, switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import * as AuthActions from './actions';

@Injectable()
export class AuthEffects {
    constructor(private action$: Actions, private authService: AuthService) {
    }

    logIn$: Observable<Action> = createEffect(() =>
        this.action$.pipe(
            ofType(AuthActions.login),
            switchMap(({ email, password }) => {
                return this.authService.logIn(email, password).pipe(
                    map((payload) => {
                        this.authService.setToken(payload.token);
                        return AuthActions.loginSuccess({ payload })
                    }),
                    catchError(error => of(AuthActions.loginFail({ error }))));
            })
        ));
    logOut$: Observable<Action> = createEffect(() =>
        this.action$.pipe(
            ofType(AuthActions.logout),
            tap(() => this.authService.logOut())));
}

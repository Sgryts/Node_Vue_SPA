import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of, Observable } from 'rxjs';
import { catchError, map, tap, switchMap } from 'rxjs/operators';
import { IUser } from 'src/app/models/user.model';
import { AuthService } from '../../services/auth.service';
import * as AuthActions from './actions';

@Injectable()
export class AuthEffects {
    constructor(private action$: Actions, private authService: AuthService) {
    }

    logIn$: Observable<Action> = createEffect(() =>
        this.action$.pipe(
            ofType(AuthActions.login),
            switchMap(({ email, password }: { email: string, password: string }) => {
                return this.authService.logIn(email, password).pipe(
                    map((payload: IUser) => {
                        this.authService.setToken(payload.token);
                        this.authService.setRefreshToken(payload.refreshToken);
                        this.authService.startRefreshTokenTimer();
                        return AuthActions.loginSuccess({ payload })
                    }),
                    catchError(error => of(AuthActions.loginFail({ error }))));
            })
        ));

    refreshToken$: Observable<Action> = createEffect(() => this.action$.pipe(
        ofType(AuthActions.refreshToken),
        switchMap(_ => this.authService.refreshToken()),
        map(({ token, refreshToken }: { token: string, refreshToken: string }) =>
            AuthActions.refreshTokenSuccess({ token, refreshToken })),
        catchError(error => of(AuthActions.refreshTokenFail({ error })))
    ));

    logOut$: Observable<Action> = createEffect(() =>
        this.action$.pipe(
            ofType(AuthActions.logout),
            tap(() => this.authService.logOut())));
}

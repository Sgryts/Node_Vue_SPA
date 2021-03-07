import { createAction, props } from '@ngrx/store';
import { IUser } from '../../../models/user.model';

export const login = createAction('[ADMIN AUTH] Login', props<{ email: string, password: string }>());
export const loginSuccess = createAction('[ADMIN AUTH] Login Success', props<{ payload: IUser }>());
export const loginFail = createAction('[ADMIN AUTH] Login Fail', props<{ error: any }>());

export const refreshToken = createAction('[ADMIN AUTH] Refresh Token');
export const refreshTokenSuccess = createAction('[ADMIN AUTH] Refresh Token', props<{ token: string, refreshToken: string }>());
export const refreshTokenFail = createAction('[ADMIN AUTH] Refresh Token Fail', props<{ error: any }>());

export const logout = createAction('[ADMIN AUTH] Logout');






import {createAction, props} from '@ngrx/store';
import IUser from '../../../models/user.model';

export const login = createAction('[ADMIN AUTH] Login', props<{ params: { email, password } }>());
export const loginSuccess = createAction('[ADMIN AUTH] Login Success', props<{ payload: IUser }>());
export const loginFail = createAction('[ADMIN AUTH] Login Fail', props<{ error: any }>());

export const logout = createAction('[ADMIN AUTH] Logout');







import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IUser } from '../../models/user.model';
import { take, map, catchError, tap } from 'rxjs/operators';
import { IPayload } from 'src/app/models/payload.model';

@Injectable()
export class AuthService {
    private readonly baseUrl = `${environment.baseUrl}/api`;

    constructor(private http: HttpClient) {
    }

    public getToken(): string {
        return localStorage.getItem('token') ?? '';
    }

    public getRefreshToken(): string {
        return localStorage.getItem('refreshToken') ?? '';
    }

    public setToken(token: string): void {
        localStorage.setItem('token', token);
    }

    public setRefreshToken(token: string): void {
        localStorage.setItem('refreshToken', token);
    }

    private getTokenExpiration(): number {
        if (!this.getToken().length) { return 0 };
        return (JSON.parse(atob(this.getToken().split('.')[1])))?.exp;
    }

    public isTokenExpired(): boolean {
        const exp = this.getTokenExpiration();
        if (!exp) { return true; }
        return new Date().getTime() >= new Date(this.getTokenExpiration() * 1000).getTime();
    }

    public removeToken(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
    }

    public logIn(email: string, password: string): Observable<IUser> {
        const url = `${this.baseUrl}/login`;
        return this.http.post<IPayload<IUser>>(url, { email, password })
            .pipe(map((data: IPayload<IUser>): IUser => data.data), take(1), catchError(this.handleError));
    }

    public refreshToken(): Observable<{ token: string, refreshToken: string }> {
        return this.http.post<IPayload<IUser>>(`${this.baseUrl}/refresh`, { 'refreshToken': this.getRefreshToken() })
            .pipe(map((data: IPayload<IUser>): { token: string, refreshToken: string } => {
                return {
                    token: data.data.token,
                    refreshToken: data.data.refreshToken
                }
            }), take(1), catchError(this.handleError));
    }

    public logOut(): void {
        this.removeToken();
    }

    private handleError(err: HttpErrorResponse): Observable<never> {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        return throwError(errorMessage);
    }

    // TODO: not used as of right now
    // signUp(email: string, password: string): Observable<IUser> {
    //     const url = `${this.baseUrl}/register`;
    //     return this.http.post<IUser>(url, {email, password});
    // }
}

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IUser } from '../../models/user.model';
import { take, map, catchError } from 'rxjs/operators';
import { IPayload } from 'src/app/models/payload.model';

@Injectable()
export class AuthService {
    private readonly baseUrl = `${environment.baseUrl}/api`;

    constructor(private http: HttpClient) {
    }

    public getToken(): string {
        return localStorage.getItem('token');
    }


    public removeToken(): void {
        localStorage.removeItem('token');
    }

    public logIn(email: string, password: string): Observable<any> {
        const url = `${this.baseUrl}/login`;
        return this.http.post<IPayload<IUser>>(url, { email, password })
            .pipe(take(1), catchError(this.handleError));
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

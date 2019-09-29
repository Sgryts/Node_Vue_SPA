import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import IUser from '../../models/user.model';

@Injectable()
export class AuthService {

    readonly baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) {
    }

    getToken(): string {
        return localStorage.getItem('token');
    }

    removeToken(): void {
        localStorage.removeItem('token');
    }

    logIn(email: string, password: string): Observable<any> {
        const url = `${this.baseUrl}/login`;
        return this.http.post<IUser>(url, {email, password});
    }

    logOut(): void {
        this.removeToken()
    }

    signUp(email: string, password: string): Observable<IUser> {
        const url = `${this.baseUrl}/register`;
        return this.http.post<IUser>(url, {email, password});
    }
}

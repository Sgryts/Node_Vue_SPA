import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import IGenre from '../../models/genre.model';

@Injectable()
export class GenreService {

    readonly baseUrl = environment.baseUrl;
    readonly headers = new HttpHeaders({'Content-Type': 'application/json'});

    constructor(private httpClient: HttpClient) {
    }

    getAllGenres(): Observable<IGenre[]> {
        let url = this.baseUrl + '/api/genres';
        return this.httpClient.get<IGenre[]>(url, {headers: this.headers}).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse): Observable<never> {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}

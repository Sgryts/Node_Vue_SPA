import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import IGenre from '../../models/genre.model';
import IPhoto from '../../models/photo.model';

@Injectable()
export class GenreService {

    readonly baseUrl = environment.baseUrl + '/api/genres/';

    constructor(private httpClient: HttpClient) {
    }

    getAllGenres(): Observable<IGenre[]> {
        const url = this.baseUrl;
        return this.httpClient.get<IGenre[]>(url).pipe(
            catchError(this.handleError)
        );
    }

    // getGenre(id: string): Observable<IGenre> {
    //     const url = `${this.baseUrl}/${id}`;
    //     return this.httpClient.get<IGenre>(url).pipe(
    //         catchError(this.handleError)
    //     );
    // }

    createGenre(genre: string): Observable<IGenre> {
        const url = this.baseUrl;
        return this.httpClient.post<IGenre>(url, genre).pipe(
            catchError(this.handleError)
        );
    }

    updateGenre(id: string, genre: string): Observable<IGenre> {
        const url = `${this.baseUrl}/${id}`;
        return this.httpClient.put<IGenre>(url, genre).pipe(
            catchError(this.handleError)
        );
    }

    deleteGenre(id: string): Observable<Partial<IGenre>> {
        const url = `${this.baseUrl}/${id}`;
        return this.httpClient.delete<Partial<IGenre>>(url).pipe(
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
        return throwError(errorMessage);
    }
}

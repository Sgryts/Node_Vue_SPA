import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { genre } from '../../../../../server/src/api/genres/genre.route';
import { environment } from '../../../environments/environment';
import IGenre from '../../models/genre.model';
import { IPayload } from '../../models/payload.model';
import flatten from 'lodash/flatten';

@Injectable()
export class GenreService {

  private readonly baseUrl = environment.baseUrl + '/api/admin/genres';
  private readonly headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private httpClient: HttpClient) {
  }

  getAllGenres(): Observable<IGenre[]> {
    const url = this.baseUrl;
    return this.httpClient.get<IPayload<IGenre[]>>(url, { headers: this.headers }).pipe(
      map(payload => flatten(payload.data)),
      catchError(this.handleError)
    );
  }

  // getGenre(id: string): Observable<IGenre> {
  //     const url = `${this.baseUrl}/${id}`;
  //     return this.httpClient.get<IGenre>(url).pipe(
  //         catchError(this.handleError)
  //     );
  // }

  createGenre(name: string): Observable<IGenre> {
    const url = this.baseUrl;
    const genre = { name: name };
    return this.httpClient.post<IPayload<IGenre>>(url, genre, { headers: this.headers }).pipe(
      map(payload => payload.data),
      catchError(this.handleError)
    );
  }

  updateGenre(id: string, name: string): Observable<IGenre> {
    const url = `${this.baseUrl}/${id}`;
    const genre = { _id: id, name: name };
    return this.httpClient.put<IPayload<IGenre>>(url, genre, { headers: this.headers }).pipe(
      map(payload => payload.data),
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

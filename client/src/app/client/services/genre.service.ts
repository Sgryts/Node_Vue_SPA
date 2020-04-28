import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { IPayload } from '../../models/payload.model';
import IGenre from '../../models/genre.model';
import {flatten} from 'lodash';

@Injectable()
export class GenreService {

  private readonly baseUrl = environment.baseUrl + '/api';
  private readonly headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private httpClient: HttpClient) {
  }

  getAllGenres(): Observable<IGenre[]> {
    const url = this.baseUrl + '/genres';
    return this.httpClient.get<IPayload<IGenre[]>>(url, { headers: this.headers }).pipe(
      map(genres => flatten(genres.data)),
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

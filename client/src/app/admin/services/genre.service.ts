import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import IGenre from '../../models/genre.model';
import { IPayload } from '../../models/payload.model';
import flatten from 'lodash/flatten';
import { NotificationService } from 'src/app/shared/notification.service';

@Injectable()
export class GenreService {

  private readonly baseUrl = environment.baseUrl + '/api/admin/genres';
  private readonly headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private httpClient: HttpClient, private notificationService: NotificationService) {
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
      map(payload => {
        this.notificationService.showSuccess(payload.message, 'Success');
        return payload.data;
      }),
      catchError(this.handleError)
    );
  }

  updateGenre(genre: IGenre): Observable<IGenre> {
    const url = `${this.baseUrl}/${genre._id}`;
    return this.httpClient.put<IPayload<IGenre>>(url, genre, { headers: this.headers }).pipe(
      map(payload => {
        this.notificationService.showSuccess(payload.message, 'Success')
        return payload.data;
      }),
      catchError(this.handleError)
    );
  }

  deleteGenre(id: string): Observable<Partial<IGenre>> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete<Partial<IGenre>>(url).pipe(
      tap(_ => this.notificationService.showSuccess('Deleted', 'Success')),
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
    this.notificationService.showError('Please try again', 'Error');
    return throwError(errorMessage);
  }
}

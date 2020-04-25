import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { IPayload } from '../../models/payload.model';
import IPhoto from '../../models/photo.model';
import { flatten } from 'lodash';

@Injectable()
export class PhotoService {

  readonly baseUrl = environment.baseUrl + '/api';
  readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/vnd.photosforgenre+json'
  });

  constructor(private httpClient: HttpClient) {
  }

  getPhotosByGenre(id: string): Observable<IPhoto[]> {
    const url = `${this.baseUrl}/photos`;
    const params = new HttpParams().set('genre', id);
    return this.httpClient.get<IPayload<IPhoto[]>>(url, { headers: this.headers, params: params })
      .pipe(
        map(photos => flatten(photos.data)),
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

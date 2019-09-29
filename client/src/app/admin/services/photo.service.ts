import {HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import IPhoto from '../../models/photo.model';
import * as fromPhotoActions from '../state/photos/actions';

@Injectable()
export class PhotoService {

    readonly baseUrl = environment.baseUrl + '/admin';

    constructor(private httpClient: HttpClient) {
    }

    getPhotosByGenre(id: string): Observable<IPhoto[]> {
        const url = `${this.baseUrl}/genres/${id}/photos`;
        return this.httpClient.get<IPhoto[]>(url).pipe(
            catchError(this.handleError)
        );
    }

    getPhoto(id: string): Observable<IPhoto> {
        const url = `${this.baseUrl}/photos/${id}`;
        return this.httpClient.get<IPhoto>(url).pipe(
            catchError(this.handleError)
        );
    }

    uploadPhoto(file: File): Observable<HttpEvent<{}>> {
        const url = `${this.baseUrl}/photos`;
        const formData = new FormData();
        formData.append('files', file, file.name);

        return this.httpClient.post<HttpEvent<{}>>(url, formData, {reportProgress: true}).pipe(
            catchError(this.handleError)
        );
    }

    updatePhoto(id: string, photo: Partial<IPhoto>): Observable<IPhoto> {
        const url = `${this.baseUrl}/photos/${id}`;
        return this.httpClient.put<IPhoto>(url, photo).pipe(
            catchError(this.handleError)
        );
    }

    getActionFromHttpEvent(event: HttpEvent<any>) {
        switch (event.type) {
            case HttpEventType.Sent: {
                return fromPhotoActions.uploadStarted;
            }
            case HttpEventType.UploadProgress: {
                return fromPhotoActions.uploadProgress({
                    progress: Math.round((100 * event.loaded) / event.total)
                });
            }
            case HttpEventType.ResponseHeader:
            case HttpEventType.Response: {
                if (event.status === 201) {
                    return fromPhotoActions.uploadCompleted;
                } else {
                    return fromPhotoActions.uploadFail({
                        error: event.statusText
                    });
                }
            }
            default: {
                return fromPhotoActions.uploadFail({
                    error: `Unknown Event: ${JSON.stringify(event)}`
                });
            }
        }
    }

    deletePhoto(id: string): Observable<Partial<IPhoto>> {
        const url = `${this.baseUrl}/photos/${id}`;
        return this.httpClient.delete<Partial<IPhoto>>(url).pipe(
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

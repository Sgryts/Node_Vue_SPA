import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { serializeError } from 'serialize-error';
import { Injectable } from '@angular/core';
import { TypedAction } from '@ngrx/store/src/models';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { IPayload } from '../../models/payload.model';
import IPhoto from '../../models/photo.model';
import { IPhotoUpload } from '../photos/photo-upload.model';
import * as fromPhotoActions from '../state/photos/actions';
import { NotificationService } from 'src/app/shared/notification.service';

@Injectable()
export class PhotoService {

    private readonly baseUrl = environment.baseUrl + '/api/admin/photos';
    private readonly headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.photosforgenre+json'
    });

    constructor(private httpClient: HttpClient, private notificationService: NotificationService) {
    }

    getPhotosByGenre(id: string): Observable<IPhoto[]> {
        const url = `${this.baseUrl}`;
        const params = new HttpParams().set('genre', id);
        return this.httpClient.get<IPayload<IPhoto[]>>(url, { headers: this.headers, params: params })
            .pipe(
                map(photos => photos.data.flat()),
                catchError(this.handleError)
            );
    }

    // getPhoto(id: string): Observable<IPhoto> {
    //     const url = `${this.baseUrl}/photos/${id}`;
    //     return this.httpClient.get<IPhoto>(url).pipe(
    //         catchError(this.handleError)
    //     );
    // }

    uploadPhoto(upload: IPhotoUpload): Observable<HttpEvent<{}>> {
        const formData: FormData = new FormData();
        formData.append('image', upload.file, upload.file.name);
        formData.append('name', upload.name);
        formData.append('genres', JSON.stringify(upload.genres));
        const headers = new HttpHeaders({
            // 'Content-Type': 'application/x-www-form-urlencoded',
            // 'Content-Type': undefined,
            // 'Accept': 'application/json'
        });
        const options = {
            headers,
            observe: 'events',
            reportProgress: true
        };
        // console.log(file);

        return this.httpClient.post<HttpEvent<{}>>(this.baseUrl, formData, {
            observe: 'events',
            reportProgress: true
        }).pipe(
            catchError(this.handleError)
        );
    }

    updatePhoto(photo: Partial<IPhoto>): Observable<IPhoto> {
        const url = `${this.baseUrl}/${photo._id}`;
        return this.httpClient.put<IPhoto>(url, { name: photo.name, genres: photo.genres }).pipe(
            catchError(this.handleError)
        );
    }

    getActionFromHttpEvent(event: HttpEvent<any>): TypedAction<any> {
        switch (event.type) {
            case HttpEventType.Sent: {
                return fromPhotoActions.uploadStarted();
            }
            case HttpEventType.DownloadProgress:
            case HttpEventType.UploadProgress: {
                this.notificationService.showInfo('Image upload started', 'Info');
                return fromPhotoActions.uploadProgress({
                    progress: Math.round((100 * event.loaded) / event.total)
                });
            }
            case HttpEventType.ResponseHeader:
            case HttpEventType.Response: {
                if (event.status === 201 || event.status === 200) {
                    this.notificationService.showSuccess('Image upload completed', 'Success');
                    return fromPhotoActions.uploadCompleted();
                } else {
                    this.notificationService.showWarning('Image wasn\'t uploaded', 'Error');
                    return fromPhotoActions.uploadFail({
                        error: event.statusText
                    });
                }
            }
            default: {
                this.notificationService.showWarning('Image upload failed', 'Error');
                return fromPhotoActions.uploadFail({
                    error: `Unknown Event: ${JSON.stringify(event)}`
                });
            }
        }
    }

    deletePhoto(id: string): Observable<Partial<IPhoto>> {
        const url = `${this.baseUrl}/${id}`;
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
        console.error('err', serializeError(errorMessage));
        this.notificationService.showWarning('Image upload failed', 'Error');
        return throwError(errorMessage);
    }
}

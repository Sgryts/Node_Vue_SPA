import { Injectable } from '@angular/core';
import { IEmailForm } from '../../models/email.model';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { IPayload } from 'src/app/models/payload.model';
import { catchError, take, tap } from 'rxjs/operators';
import { NotificationService } from 'src/app/shared/notification.service';

@Injectable()
export class ContactService {
    private readonly baseUrl = environment.baseUrl + '/api';
    private readonly headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(private httpClient: HttpClient, private notifcationService: NotificationService) {
    }

    public sendEmail(email: IEmailForm): Observable<any> {
        return this.httpClient.post<IPayload<{}>>(`${this.baseUrl}/contact`, email, { headers: this.headers })
            .pipe(tap((data) => this.notifcationService.showSuccess(data.message, 'Success')), catchError(this.handleError), take(1))
    }


    private handleError(err: HttpErrorResponse): Observable<never> {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        this.notifcationService.showError('Email wasn\'t sent', 'Error');
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}

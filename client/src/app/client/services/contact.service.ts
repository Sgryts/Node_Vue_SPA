import { Injectable } from '@angular/core';
import { IEmailForm } from '../../models/email.model';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { IPayload } from 'src/app/models/payload.model';
import { catchError, map, take } from 'rxjs/operators';

@Injectable()
export class ContactService {
    private readonly baseUrl = environment.baseUrl + '/api';
    private readonly headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(private httpClient: HttpClient) {
    }

    public sendEmail(email: IEmailForm): Observable<any> {
        return this.httpClient.post<IPayload<{}>>(`${this.baseUrl}/contact`, email, { headers: this.headers })
            .pipe(map((data) => data), catchError(this.handleError), take(1))
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
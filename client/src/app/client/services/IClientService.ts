import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IClientService {
  readonly baseUrl: string;
  readonly headers: HttpHeaders;

  httpCall(params?: string): Observable<any>;

  handleError(err: HttpErrorResponse): Observable<never>;
}

import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    request = request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`,
        // 'Accept': 'application/json',
        // 'Content-Type': 'application/json'
      }
    });
    return next.handle(request);
  }
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private router: Router, private authService: AuthService) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(catchError((err: HttpErrorResponse): Observable<never> => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          this.authService.removeToken();
          this.router.navigate(['/admin/login'])
        } else if (err instanceof HttpErrorResponse && err.status === 403) {
          this.handle403error(request, next);
        } else {
          this.router.navigate(['/admin/login'])
          return throwError(err);
        }
      }));
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`,
      }
    })
  }

  private handle403error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((data: {
          token: string;
          refreshToken: string;
        }): Observable<HttpEvent<any>> => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(data.token);
          return next.handle(this.addToken(request, data.token));
        }), take(1));

    } else {
      return this.refreshTokenSubject.pipe(
        filter((token: string): boolean => !!token),
        switchMap((token: string): Observable<HttpEvent<any>> => {
          return next.handle(this.addToken(request, token));
        }), take(1));
    }
  }
}

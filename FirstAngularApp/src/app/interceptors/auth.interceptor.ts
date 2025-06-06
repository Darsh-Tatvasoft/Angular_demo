// src/app/interceptors/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import {
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const AuthLoginInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const getCookie = (name: string): string | null => {
    const matches = document.cookie.match(
      new RegExp(
        '(?:^|; )' +
          name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
          '=([^;]*)'
      )
    );
    return matches ? decodeURIComponent(matches[1]) : null;
  };

  const setCookie = (name: string, value: string, days = 7): void => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(
      value
    )}; expires=${expires}; path=/`;
  };

  const jwtToken = getCookie('JwtToken');
  const refreshToken = getCookie('RefreshToken');

  let headers = req.headers;
  if (jwtToken) headers = headers.set('Authorization', `Bearer ${jwtToken}`);
  if (refreshToken) headers = headers.set('Refresh-Token', refreshToken);

  const authReq = req.clone({ headers });
  const router = inject(Router);

  return next(authReq).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        const newJwtToken =
          event.headers.get('authorization') ||
          event.headers.get('Authorization');
        const newRefreshToken =
          event.headers.get('refresh-token') ||
          event.headers.get('Refresh-Token');

        if (newJwtToken) {
          setCookie('JwtToken', newJwtToken);
        }
        if (newRefreshToken) {
          setCookie('RefreshToken', newRefreshToken);
        }
      }
    }),
    catchError((error: HttpErrorResponse) => {
      if (error?.status === 401) {
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};

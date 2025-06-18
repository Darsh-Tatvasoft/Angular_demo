// import { HttpInterceptorFn } from '@angular/common/http';
// import {
//   HttpRequest,
//   HttpHandlerFn,
//   HttpEvent,
//   HttpErrorResponse,
//   HttpResponse,
// } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError, tap } from 'rxjs/operators';
// import { inject } from '@angular/core';
// import { Router } from '@angular/router';

// export const AuthLoginInterceptor: HttpInterceptorFn = (
//   req: HttpRequest<unknown>,
//   next: HttpHandlerFn
// ): Observable<HttpEvent<unknown>> => {
//   const getCookie = (name: string): string | null => {
//     const matches = document.cookie.match(
//       new RegExp(
//         '(?:^|; )' +
//           name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
//           '=([^;]*)'
//       )
//     );
//     return matches ? decodeURIComponent(matches[1]) : null;
//   };

//   const setCookie = (name: string, value: string, days = 7): void => {
//     const expires = new Date(Date.now() + days * 864e5).toUTCString();
//     document.cookie = `${name}=${encodeURIComponent(
//       value
//     )}; expires=${expires}; path=/`;
//   };

//   const jwtToken = getCookie('JwtToken');
//   const refreshToken = getCookie('RefreshToken');

//   let headers = req.headers;
//   if (jwtToken) headers = headers.set('Authorization', `Bearer ${jwtToken}`);
//   if (refreshToken) headers = headers.set('Refresh-Token', refreshToken);

//   const authReq = req.clone({ headers });
//   const router = inject(Router);

//   return next(authReq).pipe(
//     tap((event) => {
//       if (event instanceof HttpResponse) {
//         const newJwtToken =
//           event.headers.get('authorization') ||
//           event.headers.get('Authorization');
//         const newRefreshToken =
//           event.headers.get('refresh-token') ||
//           event.headers.get('Refresh-Token');

//         if (newJwtToken) {
//           setCookie('JwtToken', newJwtToken);
//         }
//         if (newRefreshToken) {
//           setCookie('RefreshToken', newRefreshToken);
//         }
//       }
//     }),
//     catchError((error: HttpErrorResponse) => {
//       if (error?.status === 401) {
//         router.navigate(['/login']);
//       }
//       return throwError(() => error);
//     })
//   );
// };

import {
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpInterceptorFn,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ApiResponse } from '../models/auth.model';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

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

  const router = inject(Router);
  const authService = inject(AuthService);

  const jwtToken = getCookie('JwtToken');
  const refreshToken = getCookie('RefreshToken');

  // Clone request with tokens if they exist
  let authReq = req;
  if (jwtToken) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwtToken}`,
        ...(refreshToken ? { 'Refresh-Token': refreshToken } : {}),
      },
    });
  }

  return next(authReq).pipe(
    // Handle successful responses to update tokens from headers
    tap((event) => {
      debugger;
      if (event instanceof HttpResponse) {
        const newJwtToken =
          event.headers.get('Authorization') ||
          event.headers.get('authorization');
        const newRefreshToken =
          event.headers.get('Refresh-Token') ||
          event.headers.get('refresh-token');

        if (newJwtToken) {
          setCookie('JwtToken', newJwtToken.replace('Bearer ', ''));
        }
        if (newRefreshToken) {
          setCookie('RefreshToken', newRefreshToken);
        }
      }
    }),
    // Handle errors
    catchError((error: HttpErrorResponse) => {
      // Only handle 401 errors
      if (error.status !== 401) {
        return throwError(() => error);
      }

      // If no refresh token, redirect to login
      if (!refreshToken) {
        router.navigate(['/login']);
        return throwError(() => error);
      }

      // Skip interceptor for requests with 'skip' header
      if (authReq.headers.get('skip')) {
        return next(req);
      }

      // If not already refreshing, start the refresh process
      if (!isRefreshing) {
        isRefreshing = true;
        refreshTokenSubject.next(null);

        return authService.getToken(refreshToken).pipe(
          switchMap((response: ApiResponse<any | null>) => {
            isRefreshing = false;

            if (response.result && response.data) {
              const data = response.data;
              const newAccessToken = data.token;
              const newRefreshToken = data.refreshToken;
              console.log(
                'New tokens received:',
                newAccessToken,
                newRefreshToken
              );
              setCookie('JwtToken', '', -1); // Clear the JwtToken cookie
              setCookie('RefreshToken', '', -1); // Clear the RefreshToken cookie
              setCookie('JwtToken', newAccessToken);
              setCookie('RefreshToken', newRefreshToken);

              refreshTokenSubject.next(newAccessToken);

              // Retry the original request with new token
              const retryReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newAccessToken}`,
                  'Refresh-Token': newRefreshToken,
                },
              });
              return next(retryReq);
            } else {
              router.navigate(['/login']);
              return throwError(() => new Error('Token refresh failed'));
            }
          }),
          catchError((err) => {
            isRefreshing = false;
            router.navigate(['/login']);
            return throwError(() => err);
          })
        );
      } else {
        // If refresh is already in progress, wait for the new token
        return refreshTokenSubject.pipe(
          filter((token) => token !== null),
          take(1),
          switchMap((token) => {
            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`,
                'Refresh-Token': refreshToken, // Using original refresh token
              },
            });
            return next(retryReq);
          })
        );
      }
    })
  );
};

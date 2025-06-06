import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  // Move getCookie here to avoid SSR errors
  const getCookie = (name: string): string | null => {
    if (typeof document === 'undefined') return null; // ✅ Avoid SSR crash
    const matches = document.cookie.match(
      new RegExp(
        '(?:^|; )' +
          name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
          '=([^;]*)'
      )
    );
    return matches ? decodeURIComponent(matches[1]) : null;
  };

  const jwtToken = getCookie('JwtToken');
  const refreshToken = getCookie('RefreshToken');

  if (jwtToken && refreshToken) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};

export const loginGuard: CanActivateFn = () => {
  const router = inject(Router);

  const getCookie = (name: string): string | null => {
    if (typeof document === 'undefined') return null; // ✅ Avoid SSR crash
    const matches = document.cookie.match(
      new RegExp(
        '(?:^|; )' +
          name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
          '=([^;]*)'
      )
    );
    return matches ? decodeURIComponent(matches[1]) : null;
  };

  const jwtToken = getCookie('JwtToken');
  const refreshToken = getCookie('RefreshToken');

  if (jwtToken && refreshToken) {
    router.navigate(['/library/books']);
    return false;
  }

  return true;
};

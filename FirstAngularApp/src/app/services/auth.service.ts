// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse, Register } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post(`${this.baseUrl}/Authentication/login`, loginData, {
      withCredentials: true,
    });
  }

  register(user: Register): Observable<any> {
    return this.http.post(`${this.baseUrl}/Authentication/register`, user, {
      withCredentials: true,
    });
  }

  getToken(refreshToken: string) {
    return this.http.post<ApiResponse<any | null>>(
      `${this.baseUrl}/Tokens/Tokens`,
      JSON.stringify(refreshToken),
      { headers: { 'Content-Type': 'application/json', skip: 'true' } }
    );
  }
}

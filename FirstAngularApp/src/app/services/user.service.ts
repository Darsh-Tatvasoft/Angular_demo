import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getAllUsers(
    searchTerm: string = '',
    pageSize: number = 5,
    pageNumber: number = 1
  ): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/User/Users`, {
      params: {
        searchTerm,
        pageSize: pageSize.toString(),
        pageNumber: pageNumber.toString(),
      },
      withCredentials: true,
    });
  }
}

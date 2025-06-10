import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Book/Books`, {
      withCredentials: true,
    });
  }

  addBook(book: Book): Observable<any> {
    return this.http.post(`${this.baseUrl}/Book/AddBook`, book, {
      withCredentials: true,
    });
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Book/DeleteBook?id=${id}`, {
      withCredentials: true,
    });
  }

  getBookData(id: number): Observable<{ data: Book; result: boolean; message: string }> {
    return this.http.get<{ data: Book; result: boolean; message: string }>(`${this.baseUrl}/Book/EditBookData?id=${id}`, {
      withCredentials: true,
    });
  }

  updateBook(book: Book): Observable<any> {
    return this.http.put(`${this.baseUrl}/Book/UpdateBook`, book, {
      withCredentials: true,
    });
  }

  updateBookAvailability(
    bookId: number,
    isavailable: boolean
  ): Observable<any> {
    return this.http.patch(
      `${this.baseUrl}/Book/UpdateAvailability?id=${bookId}`,
      isavailable,
      {
        withCredentials: true,
      }
    );
  }
}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  getUser(): Observable<{ name: string }> {
    return of({ name: 'Real User' });
  }
}

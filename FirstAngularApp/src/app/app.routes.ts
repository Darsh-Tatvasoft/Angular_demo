import { Routes } from '@angular/router';
import { Login } from '../app/login/login';
import { Books } from './books/books';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'library/books', component: Books }
];

import { Routes } from '@angular/router';
import { Login } from '../app/login/login';
import { Books } from './books/books';
import { authGuard, loginGuard } from './guards/auth.guard';
import { Register } from './register/register';
import { Users } from './users/users';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login, canActivate: [loginGuard] },
  { path: 'register', component: Register, canActivate: [loginGuard] },
  { path: 'library/books', component: Books, canActivate: [authGuard] },
  { path: 'users/userlist', component: Users, canActivate: [authGuard] },
];

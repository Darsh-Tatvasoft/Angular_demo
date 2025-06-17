import { Routes } from '@angular/router';
import { TodoComponent } from './todo/todo';
import { App } from './app';
import { About } from './about/about';

export const routes: Routes = [
  { path: '', component: App },
  { path: 'about', component: About },
];

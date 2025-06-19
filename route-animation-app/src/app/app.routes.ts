import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { About } from './pages/about/about';
import { Home } from './pages/home/home';


export const routes: Routes = [
  { path: '', component: Home, data: { animation: 'HomePage' } },
  {
    path: 'about',
    component: About,
    data: { animation: 'AboutPage' },
  },
];

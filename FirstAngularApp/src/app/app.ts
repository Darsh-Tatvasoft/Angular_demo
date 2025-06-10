import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from './header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'FirstAngularApp';
  constructor(public router: Router) {}

  isLoginRoute(): boolean {
    return this.router.url === '/login';
  }
}

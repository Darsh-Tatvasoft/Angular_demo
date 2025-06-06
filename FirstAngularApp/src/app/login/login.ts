// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  email = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  onLogin() {
    this.auth.login(this.email, this.password).subscribe({
      next: (res) => {
        this.cookieService.set('JwtToken', res.token);
        this.cookieService.set('RefreshToken', res.refreshToken);
        setTimeout(() => {
          this.router.navigate(['/library/books'], { replaceUrl: true });
        }, 200);
      },
      error: (err) => {
        console.log('Login failed: ' + err.error.message || 'Unknown error');
      },
    });
  }
}

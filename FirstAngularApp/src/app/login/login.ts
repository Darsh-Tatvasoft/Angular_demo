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
        if (res.result) {
          const token = res.data.token;
          const refreshToken = res.data.refreshToken;

          this.cookieService.set('JwtToken', token);
          this.cookieService.set('RefreshToken', refreshToken);

          setTimeout(() => {
            this.router.navigate(['/library/books'], { replaceUrl: true });
          }, 200);
        } else {
          console.error('Login failed: ' + res.message);
          // Show toastr or UI error if needed
        }
      },
      error: (err) => {
        const message = err?.error?.message || 'Unknown error';
        console.error('Login failed: ' + message);
        // Optional: show alert/toastr with error message
      },
    });
  }
}

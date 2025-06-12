// src/app/login/login.component.ts
// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
  ],
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
          this.cookieService.set('JwtToken', token, 7);
          this.cookieService.set('RefreshToken', refreshToken, 7);

          setTimeout(() => {
            this.router.navigate(['/library/books'], { replaceUrl: true });
          }, 200);
        } else {
          console.error('Login failed: ' + res.message);
        }
      },
      error: (err) => {
        const message = err?.error?.message || 'Unknown error';
        console.error('Login failed: ' + message);
      },
    });
  }
}

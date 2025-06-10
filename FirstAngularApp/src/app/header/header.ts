import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(private router: Router, private cookieService: CookieService) {}

  logout() {
    this.cookieService.delete('token');
    this.cookieService.delete('refreshToken');
    this.router.navigate(['/login']); 
  }
}

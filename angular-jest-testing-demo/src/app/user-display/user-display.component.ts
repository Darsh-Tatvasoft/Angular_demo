import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-user-display',
  standalone: true,
  template: `<p>User Name: {{ userName }}</p>`,
})
export class UserDisplayComponent implements OnInit {
  userName!: string;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUser().subscribe((user) => (this.userName = user.name));
  }
}

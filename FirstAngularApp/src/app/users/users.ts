import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { PageEvent } from '@angular/material/paginator';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './users.html',
  styleUrls: ['./users.css'],
})
export class Users implements OnInit, OnDestroy {
  users: User[] = [];
  totalRecords = 0;
  pageSize = 5;
  pageNumber = 1;
  searchTerm = '';

  private searchSubject = new Subject<string>();
  private searchSubscription!: Subscription;

  displayedColumns: string[] = [
    'id',
    'role',
    'name',
    'mobilenumber',
    'email',
    'action',
  ];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();

    // Debounced search trigger
    this.searchSubscription = this.searchSubject
      .pipe(debounceTime(1000))
      .subscribe((term) => {
        this.pageNumber = 1;
        this.loadUsers();
      });
  }

  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
  }

  loadUsers(): void {
    this.userService
      .getAllUsers(this.searchTerm, this.pageSize, this.pageNumber)
      .subscribe({
        next: (res) => {
          if (res.result) {
            this.users = res.data.users ?? [];
            this.totalRecords = res.data.totalRecords ?? 0;
          }
        },
        error: (err) => {
          console.error(
            'Failed to load users:',
            err?.error?.message || 'Unknown error'
          );
        },
      });
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex + 1;
    this.loadUsers();
  }

  onSearchTermChange(): void {
    this.searchSubject.next(this.searchTerm);
  }
}

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Validators } from '@angular/forms';
import { DynamicFormField } from './dynamic-form/dynamic-form.model';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <button mat-raised-button color="primary" (click)="openUserForm()">
        Open Dynamic user Form
      </button>
      <button mat-raised-button color="primary" (click)="openBookForm()">
        Open Dynamic book Form
      </button>
    </div>
  `,
  styles: [
    `
      .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }
    `,
  ],
})
export class AppComponent {
  constructor(private dialog: MatDialog) {}
  openUserForm() {
    const userFields: DynamicFormField[] = [
      {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
        validators: [Validators.required],
      },
      {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        validators: [Validators.required, Validators.email],
      },
      {
        name: 'age',
        label: 'Age',
        type: 'number',
        validators: [Validators.min(0), Validators.max(120)],
      },
    ];

    const dialogRef = this.dialog.open(DynamicFormComponent, {
      width: '400px',
      data: { title: 'Dynamic User Form', fields: userFields }, // ✅ Fixed
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Form Data:', result);
      } else {
        console.log('Form cancelled');
      }
    });
  }

  openBookForm() {
    const bookFields: DynamicFormField[] = [
      {
        name: 'bookName',
        label: 'Book Name',
        type: 'text',
        validators: [Validators.required],
      },
      {
        name: 'author',
        label: 'Author',
        type: 'text',
        validators: [Validators.required],
      },
      {
        name: 'price',
        label: 'Price',
        type: 'number',
        validators: [Validators.min(0.01)],
      },
    ];

    const dialogRef = this.dialog.open(DynamicFormComponent, {
      width: '400px',
      data: { title: 'Dynamic Book Form', fields: bookFields }, // ✅ Fixed
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Form Data:', result);
      } else {
        console.log('Form cancelled');
      }
    });
  }    
}

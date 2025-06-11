import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormGroupDirective,
  NgForm,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-book-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
  ],
  templateUrl: './book-dialog.html',
  styleUrls: ['./book-dialog.css'],
})
export class BookDialog implements OnInit {
  bookForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  bookFields = [
    {
      key: 'title',
      label: 'Title',
      type: 'text',
      errors: {
        required: 'Title is required.',
        maxlength: 'Title cannot exceed 200 characters.',
      },
    },
    {
      key: 'author',
      label: 'Author',
      type: 'text',
      errors: {
        required: 'Author is required.',
        maxlength: 'Author cannot exceed 100 characters.',
      },
    },
    {
      key: 'isbn',
      label: 'ISBN',
      type: 'text',
      errors: {
        required: 'ISBN is required.',
        maxlength: 'ISBN cannot exceed 20 characters.',
      },
    },
    {
      key: 'genre',
      label: 'Genre',
      type: 'text',
      errors: {
        required: 'Genre is required.',
        maxlength: 'Genre cannot exceed 50 characters.',
      },
    },
    {
      key: 'language',
      label: 'Language',
      type: 'text',
      errors: {
        required: 'Language is required.',
        maxlength: 'Language cannot exceed 50 characters.',
      },
    },
    {
      key: 'publisher',
      label: 'Publisher',
      type: 'text',
      errors: {
        required: 'Publisher is required.',
        maxlength: 'Publisher cannot exceed 100 characters.',
      },
    },
    {
      key: 'price',
      label: 'Price',
      type: 'number',
      errors: {
        required: 'Price is required.',
        min: 'Price must be greater than 0.01.',
      },
    },
    {
      key: 'pagecount',
      label: 'Page Count',
      type: 'number',
      errors: {
        required: 'Page count is required.',
        min: 'Page count must be at least 1.',
      },
    },
    {
      key: 'stockquantity',
      label: 'Stock Quantity',
      type: 'number',
      errors: {
        required: 'Stock quantity is required.',
        min: 'Stock quantity must be at least 1.',
      },
    },
  ];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<BookDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.bookForm = this.fb.group({
      id: [0],
      title: ['', [Validators.required, Validators.maxLength(200)]],
      author: ['', [Validators.required, Validators.maxLength(100)]],
      isbn: ['', [Validators.required, Validators.maxLength(20)]],
      genre: ['', [Validators.required, Validators.maxLength(50)]],
      language: ['', [Validators.required, Validators.maxLength(50)]],
      publisher: ['', [Validators.required, Validators.maxLength(100)]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      pagecount: [0, [Validators.required, Validators.min(1)]],
      stockquantity: [0, [Validators.required, Validators.min(1)]],
      publisheddate: ['', Validators.required],
      isavailable: [true],
    });
  }

  ngOnInit(): void {
    if (this.data.bookData) {
      this.bookForm.patchValue(this.data.bookData);
    }
  }

  submitBook(): void {
    if (this.bookForm.valid) {
      this.dialogRef.close(this.bookForm.value);
    }
  }
}

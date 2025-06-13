import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book.model';
import { BookService } from '../services/book.service';
import { CookieService } from 'ngx-cookie-service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { DeleteDialogComponent } from './delete.book.modal';
import { MatDialog } from '@angular/material/dialog';
import { BookDialog } from '../book-dialog/book-dialog';
declare var bootstrap: any;

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatCardModule,
  ],
  templateUrl: './books.html',
  styleUrls: ['./books.css'],
})
export class Books implements OnInit {
  books: Book[] = [];
  bookForm: FormGroup;
  bookToEditId: number | null = null;
  bookToDeleteId: number | null = null;
  displayedColumns: string[] = [
    'id',
    'title',
    'author',
    'stockquantity',
    'price',
    'isavailable',
    'publisheddate',
    'action',
  ];

  objectKeys = Object.keys; 

  // bookFields = [
  //   {
  //     key: 'title',
  //     label: 'Title',
  //     type: 'text',
  //     errors: {
  //       required: 'Title is required.',
  //       maxlength: 'Title cannot exceed 200 characters.',
  //     },
  //   },
  //   {
  //     key: 'author',
  //     label: 'Author',
  //     type: 'text',
  //     errors: {
  //       required: 'Author is required.',
  //       maxlength: 'Author cannot exceed 100 characters.',
  //     },
  //   },
  //   {
  //     key: 'isbn',
  //     label: 'ISBN',
  //     type: 'text',
  //     errors: {
  //       required: 'ISBN is required.',
  //       maxlength: 'ISBN cannot exceed 20 characters.',
  //     },
  //   },
  //   {
  //     key: 'genre',
  //     label: 'Genre',
  //     type: 'text',
  //     errors: {
  //       required: 'Genre is required.',
  //       maxlength: 'Genre cannot exceed 50 characters.',
  //     },
  //   },
  //   {
  //     key: 'language',
  //     label: 'Language',
  //     type: 'text',
  //     errors: {
  //       required: 'Language is required.',
  //       maxlength: 'Language cannot exceed 50 characters.',
  //     },
  //   },
  //   {
  //     key: 'publisher',
  //     label: 'Publisher',
  //     type: 'text',
  //     errors: {
  //       required: 'Publisher is required.',
  //       maxlength: 'Publisher cannot exceed 100 characters.',
  //     },
  //   },
  //   {
  //     key: 'price',
  //     label: 'Price',
  //     type: 'number',
  //     errors: {
  //       required: 'Price is required.',
  //       min: 'Price must be greater than 0.01.',
  //     },
  //   },
  //   {
  //     key: 'pagecount',
  //     label: 'Page Count',
  //     type: 'number',
  //     errors: {
  //       required: 'Page count is required.',
  //       min: 'Page count must be at least 1.',
  //     },
  //   },
  //   {
  //     key: 'stockquantity',
  //     label: 'Stock Quantity',
  //     type: 'number',
  //     errors: {
  //       required: 'Stock quantity is required.',
  //       min: 'Stock quantity must be at least 1.',
  //     },
  //   },
  // ];

  constructor(
    private bookService: BookService,
    private cookieService: CookieService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    // this.bookForm = this.fb.group({
    //   id: [0],
    //   title: ['', [Validators.required, Validators.maxLength(200)]],
    //   author: ['', [Validators.required, Validators.maxLength(100)]],
    //   isbn: ['', [Validators.required, Validators.maxLength(20)]],
    //   genre: ['', [Validators.required, Validators.maxLength(50)]],
    //   language: ['', [Validators.required, Validators.maxLength(50)]],
    //   publisher: ['', [Validators.required, Validators.maxLength(100)]],
    //   price: [0, [Validators.required, Validators.min(0.01)]],
    //   pagecount: [0, [Validators.required, Validators.min(1)]],
    //   stockquantity: [0, [Validators.required, Validators.min(1)]],
    //   publisheddate: ['', Validators.required],
    //   isavailable: [true],
    // });
  }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getAllBooks().subscribe({
      next: (res) => {
        if (res.result) {
          this.books = res.data ?? [];
        } else {
          console.error('Error loading books:', res.message);
        }
      },
      error: (err) => {
        const message = err?.error?.message || 'Unknown error';
        console.error('Failed to load books:', message);
      },
    });
  }

  // openAddModal(): void {
  //   this.bookToEditId = null;
  //   this.bookForm.reset({
  //     id: 0, // NEW: Always 0 for add
  //     title: '',
  //     author: '',
  //     isbn: '',
  //     genre: '',
  //     language: '',
  //     publisher: '',
  //     price: 0,
  //     pagecount: 0,
  //     stockquantity: 0,
  //     publisheddate: '',
  //     isavailable: true,
  //   });

  //   const modalElement = document.getElementById('bookModal');
  //   if (modalElement) {
  //     const modal = new bootstrap.Modal(modalElement);
  //     modal.show();
  //   }
  // }

  // openEditModal(bookId: number): void {
  //   this.bookToEditId = bookId;

  //   this.bookService.getBookData(bookId).subscribe({
  //     next: (response) => {
  //       if (response.result && response.data) {
  //         const book = response.data;

  //         this.bookForm.patchValue({
  //           id: book.id,
  //           title: book.title,
  //           author: book.author,
  //           isbn: book.isbn,
  //           genre: book.genre,
  //           language: book.language,
  //           publisher: book.publisher,
  //           price: book.price,
  //           pagecount: book.pagecount,
  //           stockquantity: book.stockquantity,
  //           publisheddate: book.publisheddate.split('T')[0],
  //           isavailable: book.isavailable,
  //         });

  //         const modalElement = document.getElementById('bookModal');
  //         if (modalElement) {
  //           const modal = new bootstrap.Modal(modalElement);
  //           modal.show();
  //         }
  //       } else {
  //         console.error('Failed to load book data:', response.message);
  //       }
  //     },
  //     error: (error) => {
  //       console.error(
  //         'Failed to load book data for edit:',
  //         error?.error?.message || error.message || error
  //       );
  //     },
  //   });
  // }

  // submitBook(): void {
  //   if (this.bookForm.invalid) {
  //     this.bookForm.markAllAsTouched();
  //     return;
  //   }

  //   const bookData = this.bookForm.value;

  //   if (bookData.id && bookData.id > 0) {
  //     // Edit
  //     this.bookService.updateBook(bookData).subscribe({
  //       next: (res) => {
  //         if (res.result === false) {
  //           console.error('Failed to update book:', res.message);
  //           return;
  //         }
  //         console.log(res.message || 'Book updated successfully.');
  //         this.closeModal();
  //         this.loadBooks();
  //       },
  //       error: (error) => {
  //         console.error(
  //           'Failed to update book:',
  //           error?.error?.message || 'Unknown error'
  //         );
  //       },
  //     });
  //   } else {
  //     // Add
  //     this.bookService.addBook({ ...bookData, id: 0 }).subscribe({
  //       next: (res) => {
  //         if (res.result === false) {
  //           console.error('Failed to add book:', res.message);
  //           return;
  //         }
  //         console.log(res.message || 'Book added successfully.');
  //         this.closeModal();
  //         this.loadBooks();
  //       },
  //       error: (error) => {
  //         console.error(
  //           'Failed to add book:',
  //           error.message || 'Unknown error'
  //         );
  //       },
  //     });
  //   }
  // }

  // closeModal(): void {
  //   const modalElement = document.getElementById('bookModal');
  //   if (modalElement) {
  //     const modalInstance = bootstrap.Modal.getInstance(modalElement);
  //     modalInstance?.hide();
  //   }
  // }

  openAddModal(): void {
    const dialogRef = this.dialog.open(BookDialog, {
      width: '900px',
      height: '700px',
      data: {
        bookToEditId: null,
        bookData: {
          id: 0,
          title: '',
          author: '',
          isbn: '',
          genre: '',
          language: '',
          publisher: '',
          price: 0,
          pagecount: 0,
          stockquantity: 0,
          publisheddate: '',
          isavailable: true,
        },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.submitBook(result);
      }
    });
  }

  // Replace your openEditModal() method with:
  openEditModal(bookId: number): void {
    this.bookService.getBookData(bookId).subscribe({
      next: (response) => {
        if (response.result && response.data) {
          const book = response.data;

          const dialogRef = this.dialog.open(BookDialog, {
            width: '800px',
            data: {
              bookToEditId: bookId,
              bookData: {
                id: book.id,
                title: book.title,
                author: book.author,
                isbn: book.isbn,
                genre: book.genre,
                language: book.language,
                publisher: book.publisher,
                price: book.price,
                pagecount: book.pagecount,
                stockquantity: book.stockquantity,
                publisheddate: book.publisheddate.split('T')[0],
                isavailable: book.isavailable,
              },
            },
          });

          dialogRef.afterClosed().subscribe((result) => {
            if (result) {
              this.submitBook(result);
            }
          });
        } else {
          console.error('Failed to load book data:', response.message);
        }
      },
      error: (error) => {
        console.error(
          'Failed to load book data for edit:',
          error?.error?.message || error.message || error
        );
      },
    });
  }

  // Update your submitBook() method to accept data parameter:
  submitBook(bookData: any): void {
    if (bookData.id && bookData.id > 0) {
      // Edit
      this.bookService.updateBook(bookData).subscribe({
        next: (res) => {
          if (res.result === false) {
            console.error('Failed to update book:', res.message);
            return;
          }
          console.log(res.message || 'Book updated successfully.');
          this.loadBooks();
        },
        error: (error) => {
          console.error(
            'Failed to update book:',
            error?.error?.message || 'Unknown error'
          );
        },
      });
    } else {
      // Add
      this.bookService.addBook({ ...bookData, id: 0 }).subscribe({
        next: (res) => {
          if (res.result === false) {
            console.error('Failed to add book:', res.message);
            return;
          }
          console.log(res.message || 'Book added successfully.');
          this.loadBooks();
        },
        error: (error) => {
          console.error(
            'Failed to add book:',
            error.message || 'Unknown error'
          );
        },
      });
    }
  }

  openDeleteModal(bookId: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '350px',
      data: bookId,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.confirmDelete(bookId);
      }
    });
  }

  confirmDelete(bookId: number): void {
    this.bookService.deleteBook(bookId).subscribe({
      next: (res) => {
        if (!res.result) {
          console.error('Failed to delete book:', res.message);
          return;
        }
        console.log('Book deleted successfully.');
        this.loadBooks(); // reload list
      },
      error: (err) => console.error('Failed to delete book:', err),
    });
  }

  toggleAvailability(book: any) {
    book.isavailable = !book.isavailable;

    this.bookService
      .updateBookAvailability(book.id, book.isavailable)
      .subscribe({
        next: (res) => {
          if (!res.result) {
            console.error('Failed to update availability:', res.message);
            book.isavailable = !book.isavailable;
            return;
          }

          console.log(
            `Book ${book.id} availability updated to ${book.isavailable}`
          );
        },
        error: (err) => {
          console.error(
            'Failed to update availability:',
            err?.error?.message || err
          );
          book.isavailable = !book.isavailable;
        },
      });
  }
}

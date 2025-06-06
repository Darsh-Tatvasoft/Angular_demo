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

declare var bootstrap: any;

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './books.html',
  styleUrls: ['./books.css'],
})
export class Books implements OnInit {
  books: Book[] = [];
  bookForm: FormGroup;
  bookToEditId: number | null = null;
  bookToDeleteId: number | null = null;

  bookFields = [
    { key: 'title', label: 'Title', type: 'text', error: 'Title is required.' },
    {
      key: 'author',
      label: 'Author',
      type: 'text',
      error: 'Author is required.',
    },
    { key: 'isbn', label: 'ISBN', type: 'text', error: 'ISBN is required.' },
    { key: 'genre', label: 'Genre', type: 'text', error: 'Genre is required.' },
    {
      key: 'language',
      label: 'Language',
      type: 'text',
      error: 'Language is required.',
    },
    {
      key: 'publisher',
      label: 'Publisher',
      type: 'text',
      error: 'Publisher is required.',
    },
    {
      key: 'price',
      label: 'Price',
      type: 'number',
      error: 'Price must be greater than 0.',
    },
    {
      key: 'pagecount',
      label: 'Page Count',
      type: 'number',
      error: 'Page count is required.',
    },
    {
      key: 'stockquantity',
      label: 'Stock Quantity',
      type: 'number',
      error: 'Stock quantity is required.',
    },
  ];

  constructor(
    private bookService: BookService,
    private cookieService: CookieService,
    private fb: FormBuilder
  ) {
    this.bookForm = this.fb.group({
      id: [0], // NEW: ID field
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
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getAllBooks().subscribe({
      next: (response: Book[]) => (this.books = response ?? []),
      error: (error) => console.error('Failed to load books:', error),
    });
  }

  openAddModal(): void {
    this.bookToEditId = null;
    this.bookForm.reset({
      id: 0, // NEW: Always 0 for add
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
    });

    const modalElement = document.getElementById('bookModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  openEditModal(bookId: number): void {
    this.bookToEditId = bookId;

    this.bookService.getBookData(bookId).subscribe({
      next: (response: Book) => {
        this.bookForm.patchValue({
          id: response.id, // NEW: include ID
          title: response.title,
          author: response.author,
          isbn: response.isbn,
          genre: response.genre,
          language: response.language,
          publisher: response.publisher,
          price: response.price,
          pagecount: response.pagecount,
          stockquantity: response.stockquantity,
          publisheddate: response.publisheddate.split('T')[0],
          isavailable: response.isavailable,
        });

        const modalElement = document.getElementById('bookModal');
        if (modalElement) {
          const modal = new bootstrap.Modal(modalElement);
          modal.show();
        }
      },
      error: (error) =>
        console.error('Failed to load book data for edit:', error),
    });
  }

  submitBook(): void {
    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      return;
    }

    const bookData = this.bookForm.value;

    if (bookData.id && bookData.id > 0) {
      // Edit
      this.bookService.updateBook(bookData).subscribe({
        next: () => {
          console.log('Book updated successfully.');
          this.closeModal();
          this.loadBooks();
        },
        error: (error) => console.error('Failed to update book:', error),
      });
    } else {
      // Add
      this.bookService.addBook({ ...bookData, id: 0 }).subscribe({
        next: () => {
          console.log('Book added successfully.');
          this.closeModal();
          this.loadBooks();
        },
        error: (error) => console.error('Failed to add book:', error),
      });
    }
  }

  closeModal(): void {
    const modalElement = document.getElementById('bookModal');
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance?.hide();
    }
  }

  openDeleteModal(bookId: number): void {
    this.bookToDeleteId = bookId;
    const modalElement = document.getElementById('deleteBookModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  confirmDelete(): void {
    if (!this.bookToDeleteId) return;

    this.bookService.deleteBook(this.bookToDeleteId).subscribe({
      next: () => {
        console.log('Book deleted successfully.');
        this.loadBooks();
        this.bookToDeleteId = null;

        const modalElement = document.getElementById('deleteBookModal');
        if (modalElement) {
          const modalInstance = bootstrap.Modal.getInstance(modalElement);
          modalInstance?.hide();
        }
      },
      error: (error) => console.error('Failed to delete book:', error),
    });
  }

  toggleAvailability(book: any) {
    debugger;
    book.isavailable = !book.isavailable;

    this.bookService
      .updateBookAvailability(book.id, book.isavailable)
      .subscribe({
        next: () => {
          debugger;

          console.log(
            `Book ${book.id} availability updated to ${book.available}`
          );
        },
        error: (err) => {
          debugger;
          console.error('Failed to update availability:', err);
          book.isavailable = !book.isavailable;
        },
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book.model';
import { BookService } from '../services/book.service';
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
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './books.html',
  styleUrl: './books.css',
})
export class Books implements OnInit {
  books: Book[] = [];
  book: Book;
  bookForm!: FormGroup;
  dummyForm: FormGroup;

  constructor(private bookService: BookService, private fb: FormBuilder) {
    this.dummyForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.loadBooks();
    this.initForm();
  }

  initForm(): void {
    this.bookForm = this.fb.group({
      title: ['', Validators.required, Validators.maxLength(200)],
      author: ['', Validators.required, Validators.maxLength(100)],
      isbn: ['', Validators.required, Validators.maxLength(20)],
      genre: ['', Validators.required, Validators.maxLength(50)],
      language: ['', Validators.required, Validators.maxLength(50)],
      publisher: ['', Validators.required, Validators.maxLength(100)],
      price: [0, [Validators.required, Validators.min(0.01)]],
      pagecount: [0, [Validators.required, Validators.min(1)]],
      stockquantity: [0, [Validators.required, Validators.min(1)]],
      publisheddate: ['', Validators.required],
      isavailable: [true],
    });
  }

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

  loadBooks(): void {
    this.bookService.getAllBooks().subscribe({
      next: (response: Book[]) => (this.books = response ?? []),
      error: (error) => console.error('Failed to load books:', error),
    });
  }

  openAddModal(): void {
    this.bookForm.reset({
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

    const modalElement = document.getElementById('addBookModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  submitBook(): void {
    if (this.bookForm.valid) {
      const newBook: Book = this.bookForm.value;
      this.bookService.addBook(newBook).subscribe({
        next: () => {
          this.loadBooks();
          const modalInstance = bootstrap.Modal.getInstance(
            document.getElementById('addBookModal')
          );
          modalInstance?.hide();
        },
        error: (err) => console.error('Failed to add book:', err),
      });
    } else {
      this.bookForm.markAllAsTouched();
    }
  }

  bookToDeleteId: number | null = null;

  openDeleteModal(bookId: number): void {
    this.bookToDeleteId = bookId;
    const modal = new bootstrap.Modal(
      document.getElementById('deleteBookModal')
    );
    modal.show();
  }

  confirmDelete(): void {
    if (!this.bookToDeleteId) return;

    this.bookService.deleteBook(this.bookToDeleteId).subscribe({
      next: () => {
        this.loadBooks();
        this.bookToDeleteId = null;
        bootstrap.Modal.getInstance(
          document.getElementById('deleteBookModal')
        )?.hide();
      },
      error: (err) => {
        console.error('Failed to delete book:', err);
      },
    });
  }

  bookToEditId: number | null = null;

  openEditModal(bookId: number): void {
    this.bookToDeleteId = bookId;
    this.bookService.getBookData(bookId).subscribe({
      next: (response: Book) => (this.book = response),
      error: (error) => console.error('Failed to load edit book data:', error),
    });
    const modal = new bootstrap.Modal(
      document.getElementById('editBookModal')
    );
    modal.show();
  }
}

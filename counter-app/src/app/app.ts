import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { increment, decrement, reset, setValue } from './counter.actions';
// import { AsyncPipe } from '@angular/common'; // Add this import
// import { TodoComponent } from './todo/todo';
import { HighlightDirective, TimesDirective } from './app.directives';
import { FilterPipe, HighlightPipe, ReversePipe, TruncatePipe } from './app.pipe';
import { CommonModule } from '@angular/common';
// import { HighlightDirective } from './app.directives';

@Component({
  selector: 'app-root',
  standalone: true, // Add this if using standalone component
  imports: [
    // AsyncPipe,
    // TodoComponent,
    TimesDirective,
    HighlightDirective,
    FilterPipe,
    TruncatePipe,
    ReversePipe,
    CommonModule,
    HighlightPipe,
  ], // Add AsyncPipe to imports
  templateUrl: `./app.html`,
})
export class App {
  counter$; // Declare counter$ without initialization
  birthday = new Date(1990, 0, 1); // Example birthday date
  constructor(private store: Store<{ counter: number }>) {
    this.counter$ = this.store.select('counter'); // Initialize counter$ in the constructor
  }
  increment() {
    this.store.dispatch(increment());
  }
  decrement() {
    this.store.dispatch(decrement());
  }
  reset() {
    this.store.dispatch(reset());
  }
  setValue(value: string) {
    this.store.dispatch(setValue({ value: +value }));
  }
}

import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { increment, decrement, reset, setValue } from './counter.actions';
import { AsyncPipe } from '@angular/common'; // Add this import
import { TodoComponent } from './todo';

@Component({
  selector: 'app-root',
  standalone: true, // Add this if using standalone component
  imports: [AsyncPipe,TodoComponent], // Add AsyncPipe to imports
  templateUrl: `./app.html`,
})
export class App {
  counter$; // Declare counter$ without initialization

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

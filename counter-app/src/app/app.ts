import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { increment, decrement, reset, setValue } from './counter.actions';
import { AsyncPipe } from '@angular/common'; // Add this import
import { TodoComponent } from './todo/todo';
import { HighlightDirective, TimesDirective } from './app.directives';
import {
  FilterPipe,
  HighlightPipe,
  ReversePipe,
  TruncatePipe,
} from './app.pipe';
import { CommonModule } from '@angular/common';
import { FadeComponent } from './app.animation';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Child } from './child/child';
import { Parent } from './parent/parent';
import { Parent2 } from './parent-2/parent-2';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AsyncPipe,
    TodoComponent,
    TimesDirective,
    HighlightDirective,
    FilterPipe,
    TruncatePipe,
    ReversePipe,
    CommonModule,
    HighlightPipe,
    FadeComponent,
    RouterOutlet,
    RouterModule,
    Parent,
    Parent2,
  ],
  templateUrl: `./app.html`,
  styleUrls: ['./app.css'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
          }),
        ]),
        query(':enter', [style({ left: '-100%' })]),
        group([
          query(':leave', [animate('300ms ease-out', style({ left: '100%' }))]),
          query(':enter', [animate('300ms ease-out', style({ left: '0%' }))]),
        ]),
      ]),
    ]),
  ],
})
export class App {
  counter$; // Declare counter$ without initialization
  birthday = new Date(1990, 0, 1); // Example birthday date
  constructor(
    private store: Store<{ counter: number }>,
    public router: Router
  ) {
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

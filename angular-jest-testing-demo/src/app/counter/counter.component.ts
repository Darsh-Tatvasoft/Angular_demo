import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
    <h1>{{ count }}</h1>
    <button (click)="increment()">Increment</button>
  `,
})
export class CounterComponent {
  count = 0;
  increment() {
    this.count++;
  }
}
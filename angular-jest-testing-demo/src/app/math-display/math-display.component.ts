import { Component } from '@angular/core';
import { MathService } from './math.service';

@Component({
  selector: 'app-math-display',
  standalone: true,
  template: `
    <p>Add Result: {{ addResult }}</p>
    <p>Subtract Result: {{ subtractResult }}</p>
    <button (click)="calculate()">Calculate</button>
  `,
})
export class MathDisplayComponent {
  addResult!: number;
  subtractResult!: number;

  constructor(private mathService: MathService) {}

  calculate() {
    this.addResult = this.mathService.add(5, 3);
    this.subtractResult = this.mathService.subtract(5, 3);
  }
}

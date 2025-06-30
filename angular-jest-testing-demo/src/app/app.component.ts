import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { CapitalizeDisplayComponent } from './capitalize-display/capitalize-display.component';
import { UserDisplayComponent } from './user-display/user-display.component';
import { MathDisplayComponent } from './math-display/math-display.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CounterComponent,CapitalizeDisplayComponent,UserDisplayComponent,MathDisplayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-jest-testing-demo';
}

import { Component } from '@angular/core';
import { CapitalizePipe } from './capitalize.pipe';

@Component({
  selector: 'app-capitalize-display',
  standalone: true,
  imports: [CapitalizePipe],
  template: `<p>{{ text | capitalize }}</p>`,
})
export class CapitalizeDisplayComponent {
  text = 'angular jest testing';
}

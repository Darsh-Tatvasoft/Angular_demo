import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
} from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-fade',
  template: `
    <button (click)="toggle()">Toggle</button>
    <div [@fadeInOut]="isVisible ? 'show' : 'hide'">Content that fades</div>
    <!-- Changed to match animation states -->
    <div [@slideInOut]="isVisible ? 'out' : 'in'">Content that slides</div>
    <div [@pulse]="animationState" (click)="pulse()">Pulse Me!</div>
  `,
  animations: [
    trigger('fadeInOut', [
      state('show', style({ opacity: 1 })),
      state('hide', style({ opacity: 0 })),
      transition('show <=> hide', animate('300ms ease-in-out')),
    ]),
    trigger('slideInOut', [
      state('in', style({ transform: 'translateX(0)' })), // Visible position
      state('out', style({ transform: 'translateX(-100%)' })), // Hidden to the left
      transition('out => in', animate('300ms ease-out')), // Slide in (out to in)
      transition('in => out', animate('300ms ease-in')), // Slide out (in to out)
    ]),
    trigger('pulse', [
      state('normal', style({ transform: 'scale(1)' })),
      transition('* => *', [
        animate(
          '1000ms',
          keyframes([
            style({ transform: 'scale(1)', offset: 0 }),
            style({ transform: 'scale(1.2)', offset: 0.5 }),
            style({ transform: 'scale(1)', offset: 1 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class FadeComponent {
  isVisible = true;
  animationState = 'normal';

  toggle() {
    this.isVisible = !this.isVisible;
  }

  pulse() {
    this.animationState =
      this.animationState === 'normal' ? 'active' : 'normal';
  }
}

import { Component } from '@angular/core';
import { Child } from '../child/child';

@Component({
  selector: 'app-parent',
  template: `
    <h2>Parent Component</h2>
    <p>Message to Child: {{ parentMessage }}</p>

    <h3>Communication from Child</h3>
    <p>
      Click the button in the Child component to send a message back to Parent.
    </p>
    <p>Message from Child: {{ childMessage }}</p>
    <app-child (messageEvent)="receiveMessage($event)"></app-child>
    <app-child [messageFromParent]="parentMessage"></app-child>
  `,
  imports: [Child],
})
export class Parent {
  parentMessage = 'Hello from Parent!';

  childMessage!: string;

  receiveMessage(message: string) {
    this.childMessage = message;
  }
}
